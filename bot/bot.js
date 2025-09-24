import { Telegraf, Markup } from "telegraf";
import { BOT_TOKEN } from "../config.js";
import { LESSONS } from "../lessons/index.js";
import { GROUPS } from "../groups/groups.js";

const bot = new Telegraf(BOT_TOKEN);
const userState = new Map();

// build lesson keyboard
function buildLessonKeyboard(level, index, total, hasQuiz) {
  const rows = [];

  const navButtons = [];
  if (index > 0) navButtons.push(Markup.button.callback("⬅️ Previous", `lesson_prev_${level}`));
  if (index < total - 1) navButtons.push(Markup.button.callback("Next ➡️", `lesson_next_${level}`));
  if (navButtons.length) rows.push(navButtons);

  if (hasQuiz) {
    rows.push([Markup.button.callback("📝 Take Quiz", `quiz_${level}_${index}`)]);
  }

  rows.push([Markup.button.callback(GROUPS.free.name, "group_free")]);
  rows.push([Markup.button.callback(GROUPS.paid1.name, "group_paid1")]);
  rows.push([Markup.button.callback(GROUPS.paid2.name, "group_paid2")]);

  return Markup.inlineKeyboard(rows);
}

// show lesson
async function showLesson(ctx, level, index) {
  const lessonData = LESSONS[level];
  if (!lessonData?.lessons[index]) {
    return ctx.reply("❌ Lesson not found.");
  }

  const lesson = lessonData.lessons[index];
  const total = lessonData.lessons.length;
  const hasQuiz = !!lessonData.quizzes?.[index];

  const state = userState.get(ctx.from.id);

  // delete old lesson
  if (state?.lastMsgId) {
    try {
      await ctx.deleteMessage(state.lastMsgId);
    } catch {}
  }

  // delete old group msg
  if (state?.lastGroupMsgId) {
    try {
      await ctx.deleteMessage(state.lastGroupMsgId);
    } catch {}
  }

  const sentMsg = await ctx.replyWithMarkdown(
    `*${lesson.title}*\n\n${lesson.content}`,
    buildLessonKeyboard(level, index, total, hasQuiz)
  );

  userState.set(ctx.from.id, {
    ...state,
    level,
    index,
    lastMsgId: sentMsg.message_id
  });
}

// show quiz
async function showQuiz(ctx, level, index) {
  const quiz = LESSONS[level]?.quizzes?.[index];
  if (!quiz) return ctx.reply("❌ No quiz for this lesson.");

  const buttons = quiz.options.map((opt, i) =>
    [Markup.button.callback(opt, `quiz_answer_${level}_${index}_${i}`)]
  );

  const state = userState.get(ctx.from.id);

  if (state?.lastMsgId) {
    try {
      await ctx.deleteMessage(state.lastMsgId);
    } catch {}
  }

  const sentMsg = await ctx.replyWithMarkdown(
    `📝 *Quiz Time!*\n\n${quiz.question}`,
    Markup.inlineKeyboard(buttons)
  );

  userState.set(ctx.from.id, {
    ...state,
    lastMsgId: sentMsg.message_id,
    currentQuiz: { level, index }
  });
}

// handle quiz answers
bot.action(/quiz_answer_(.+)_(.+)_(.+)/, async (ctx) => {
  const [, level, index, answerIndex] = ctx.match;
  const quiz = LESSONS[level]?.quizzes?.[index];
  if (!quiz) return;

  const correct = parseInt(answerIndex, 10) === quiz.answer;
  await ctx.answerCbQuery(correct ? "✅ Correct!" : "❌ Wrong!", { show_alert: true });

  // after answer, return to lesson with "Next" option
  await showLesson(ctx, level, parseInt(index, 10));
});

// start
bot.start((ctx) => {
  userState.set(ctx.from.id, { level: "novice", index: 0 });
  return ctx.reply(
    "👋 Welcome to *Kryptove Academy Bot* 🚀\n\nStart your crypto journey:",
    Markup.inlineKeyboard([[Markup.button.callback("📘 Start Novice Lessons", "lesson_start_novice")]])
  );
});

// navigation
bot.action(/lesson_start_(.+)/, async (ctx) => {
  const level = ctx.match[1];
  await showLesson(ctx, level, 0);
});
bot.action(/lesson_next_(.+)/, async (ctx) => {
  const { level, index } = userState.get(ctx.from.id) || {};
  if (!level) return;
  await showLesson(ctx, level, index + 1);
});
bot.action(/lesson_prev_(.+)/, async (ctx) => {
  const { level, index } = userState.get(ctx.from.id) || {};
  if (!level) return;
  await showLesson(ctx, level, index - 1);
});

// quiz trigger
bot.action(/quiz_(.+)_(.+)/, async (ctx) => {
  const [, level, index] = ctx.match;
  await showQuiz(ctx, level, parseInt(index, 10));
});

// groups
async function showGroup(ctx, groupKey) {
  const g = GROUPS[groupKey];
  const sentMsg = await ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );

  const state = userState.get(ctx.from.id) || {};
  userState.set(ctx.from.id, {
    ...state,
    lastGroupMsgId: sentMsg.message_id
  });
}

bot.action("group_free", (ctx) => showGroup(ctx, "free"));
bot.action("group_paid1", (ctx) => showGroup(ctx, "paid1"));
bot.action("group_paid2", (ctx) => showGroup(ctx, "paid2"));

export default bot;
