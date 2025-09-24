// bot.js
import { Telegraf, Markup } from "telegraf";
import { BOT_TOKEN } from "../config.js";
import { LESSONS } from "../lessons/index.js";
import { GROUPS } from "../groups/groups.js";

const bot = new Telegraf(BOT_TOKEN);
const userState = new Map();

// build lesson keyboard
function buildLessonKeyboard(level, index, total, hasQuiz, quizPassed) {
  const rows = [];

  // Previous button
  if (index > 0) {
    rows.push([Markup.button.callback("⬅️ Previous", `lesson_prev_${level}`)]);
  }

  // Middle buttons
  if (index < total - 1) {
    rows.push([Markup.button.callback("Next ➡️", `lesson_next_${level}`)]);
  } else {
    // ✅ Last lesson of this level
    if (hasQuiz && !quizPassed) {
      rows.push([Markup.button.callback("📝 Take Final Quiz", `quiz_${level}`)]);
    } else {
      // Next level or finish
      const nextLevel =
        level === "novice"
          ? "intermediate"
          : level === "intermediate"
          ? "professional"
          : null;

      if (nextLevel) {
        rows.push([Markup.button.callback("🚀 Next Level ➡️", `lesson_start_${nextLevel}`)]);
      } else {
        rows.push([Markup.button.callback("🎉 Done! Explore Groups", "group_free")]);
      }
    }
  }

  // Group links
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
  const hasQuiz = !!lessonData.quiz;

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

  const quizPassed = state?.quizProgress?.[level] || false;

  const sentMsg = await ctx.replyWithMarkdown(
    `*${lesson.title}*\n\n${lesson.content}`,
    buildLessonKeyboard(level, index, total, hasQuiz, quizPassed)
  );

  userState.set(ctx.from.id, {
    ...state,
    level,
    index,
    lastMsgId: sentMsg.message_id
  });
}

// show quiz
async function showQuiz(ctx, level) {
  const quiz = LESSONS[level]?.quiz;
  if (!quiz) return ctx.reply("❌ No quiz for this level.");

  const state = userState.get(ctx.from.id);

  if (state?.lastMsgId) {
    try {
      await ctx.deleteMessage(state.lastMsgId);
    } catch {}
  }

  // Start quiz at question 0
  const qIndex = 0;
  const question = quiz.questions[qIndex];

  const buttons = question.options.map((opt, i) => [
    Markup.button.callback(opt, `quiz_answer_${level}_${qIndex}_${i}`)
  ]);

  const sentMsg = await ctx.replyWithMarkdown(
    `📝 *Quiz Time!*\n\n${question.q}`,
    Markup.inlineKeyboard(buttons)
  );

  userState.set(ctx.from.id, {
    ...state,
    lastMsgId: sentMsg.message_id,
    currentQuiz: { level, qIndex }
  });
}

// handle quiz answers
bot.action(/quiz_answer_(.+)_(.+)_(.+)/, async (ctx) => {
  const [, level, qIndex, answerIndex] = ctx.match;
  const quiz = LESSONS[level]?.quiz;
  if (!quiz) return;

  const question = quiz.questions[parseInt(qIndex, 10)];
  if (!question) return;

  const correct = parseInt(answerIndex, 10) === question.answer;

  if (correct) {
    const state = userState.get(ctx.from.id) || {};

    // Move to next question
    const nextQ = parseInt(qIndex, 10) + 1;

    if (nextQ < quiz.questions.length) {
      // More questions → show next
      const nextQuestion = quiz.questions[nextQ];
      const buttons = nextQuestion.options.map((opt, i) => [
        Markup.button.callback(opt, `quiz_answer_${level}_${nextQ}_${i}`)
      ]);

      if (state?.lastMsgId) {
        try {
          await ctx.deleteMessage(state.lastMsgId);
        } catch {}
      }

      const sentMsg = await ctx.replyWithMarkdown(
        `📝 *Quiz Time!*\n\n${nextQuestion.q}`,
        Markup.inlineKeyboard(buttons)
      );

      userState.set(ctx.from.id, {
        ...state,
        lastMsgId: sentMsg.message_id,
        currentQuiz: { level, qIndex: nextQ }
      });
    } else {
      // ✅ Quiz completed
      await ctx.answerCbQuery("✅ Correct! Quiz finished.", { show_alert: true });

      const quizProgress = { ...(state.quizProgress || {}), [level]: true };

      userState.set(ctx.from.id, {
        ...state,
        quizProgress
      });

      // Return to last lesson so "Next Level" button unlocks
      await showLesson(ctx, level, state.index);
    }
  } else {
    await ctx.answerCbQuery("❌ Wrong! Try again.", { show_alert: true });
  }
});

// start
bot.start((ctx) => {
  userState.set(ctx.from.id, { level: "novice", index: 0, quizProgress: {} });
  return ctx.reply(
    "👋 Welcome to *Kryptove Academy Bot* 🚀\n\nStart your crypto journey:",
    Markup.inlineKeyboard([
      [Markup.button.callback("📘 Start Novice Lessons", "lesson_start_novice")]
    ])
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
bot.action(/quiz_(.+)/, async (ctx) => {
  const [, level] = ctx.match;
  await showQuiz(ctx, level);
});

// groups
async function showGroup(ctx, groupKey) {
  const g = GROUPS[groupKey];
  const sentMsg = await ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]] )
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
