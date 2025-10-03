// bot/bot.js
import { Telegraf, Markup } from "telegraf";
import { BOT_TOKEN } from "../config.js";
import { LESSONS } from "../lessons/index.js";
import { GROUPS } from "../groups/groups.js";

const bot = new Telegraf(BOT_TOKEN);
const userState = new Map();

function buildLessonKeyboard(category, index, total, hasQuiz, quizPassed) {
  const rows = [];

  if (index > 0) rows.push([Markup.button.callback("⬅️ Previous", `lesson_prev_${category}`)]);

  // Show quiz button only after the lesson
  if (hasQuiz && !quizPassed) {
    rows.push([Markup.button.callback("📝 Take Quiz", `quiz_${category}_${index}`)]);
  }

  if (index < total - 1) {
    rows.push([Markup.button.callback("Next ➡️", `lesson_next_${category}`)]);
  }

  rows.push([Markup.button.callback(GROUPS.free.name, "group_free")]);
  rows.push([Markup.button.callback(GROUPS.paid1.name, "group_paid1")]);
  rows.push([Markup.button.callback(GROUPS.paid2.name, "group_paid2")]);

  return Markup.inlineKeyboard(rows);
}

async function showLesson(ctx, category, index) {
  const data = LESSONS[category];
  if (!data) return ctx.reply(`❌ Lessons for category "${category}" not found.`);
  if (!data.lessons || !data.lessons[index]) return ctx.reply("❌ Lesson not found.");

  const lesson = data.lessons[index];
  const total = data.lessons.length;

  // Check if this lesson has a quiz
  const hasQuiz = !!data.quiz?.[index];
  const state = userState.get(ctx.from.id);
  const quizPassed = state?.quizProgress?.[`${category}_${index}`] || false;

  // Cleanup old message
  if (state?.lastMsgId) try { await ctx.deleteMessage(state.lastMsgId); } catch {}
  if (state?.lastGroupMsgId) try { await ctx.deleteMessage(state.lastGroupMsgId); } catch {}

  // Send new lesson
  const sentMsg = await ctx.replyWithMarkdown(
    `*${lesson.title}*\n\n${lesson.content}`,
    buildLessonKeyboard(category, index, total, hasQuiz, quizPassed)
  );

  userState.set(ctx.from.id, { ...state, category, index, lastMsgId: sentMsg.message_id });
}

async function showQuiz(ctx, category, index) {
  const quiz = LESSONS[category]?.quiz?.[index];
  if (!quiz) return ctx.reply("❌ No quiz for this lesson.");

  const buttons = quiz.options.map((opt, i) => [
    Markup.button.callback(opt, `quiz_answer_${category}_${index}_${i}`)
  ]);

  const state = userState.get(ctx.from.id);
  if (state?.lastMsgId) try { await ctx.deleteMessage(state.lastMsgId); } catch {}

  const sentMsg = await ctx.replyWithMarkdown(
    `📝 *Quiz Time!*\n\n${quiz.question}`,
    Markup.inlineKeyboard(buttons)
  );

  userState.set(ctx.from.id, {
    ...state,
    lastMsgId: sentMsg.message_id,
    currentQuiz: { category, index }
  });
}

// Quiz answer handler
bot.action(/quiz_answer_(.+)_(.+)_(.+)/, async (ctx) => {
  const [, category, indexStr, answerIndexStr] = ctx.match;
  const index = parseInt(indexStr, 10);
  const answerIndex = parseInt(answerIndexStr, 10);
  const quiz = LESSONS[category]?.quiz?.[index];
  if (!quiz) return;

  const correct = answerIndex === quiz.answer;

  if (correct) {
    await ctx.answerCbQuery("✅ Correct! Lesson unlocked.", { show_alert: true });

    const state = userState.get(ctx.from.id) || {};
    const quizProgress = state.quizProgress || {};
    quizProgress[`${category}_${index}`] = true;

    userState.set(ctx.from.id, { ...state, quizProgress });
    await showLesson(ctx, category, index);
  } else {
    await ctx.answerCbQuery("❌ Wrong! Try again.", { show_alert: true });
    await showQuiz(ctx, category, index);
  }
});

// Start command (updated welcome message)
bot.start((ctx) => {
  userState.set(ctx.from.id, { quizProgress: {} });
  return ctx.reply(
    "🌍 *Welcome to Kryptove Academy Bot!* 🚀\n\n" +
    "Your gateway to learning, earning & thriving in Web3:\n\n" +
    "📘 *Trading Lessons* – Strategies & market mastery\n" +
    "💼 *Web3 Job Lessons* – Build a blockchain career\n" +
    "💰 *Funding Lessons* – Learn about grants & capital\n" +
    "🧑‍💻 *Jobs Board* – Opportunities coming soon!\n\n" +
    "👉 Choose a path below to get started:",
    Markup.inlineKeyboard([
      [Markup.button.callback("📘 Trading Lessons", "lesson_start_trading")],
      [Markup.button.callback("💼 Web3 Job Lessons", "lesson_start_web3job")],
      [Markup.button.callback("💰 Funding Lessons", "lesson_start_funding")],
      [Markup.button.callback("🧑‍💻 Jobs Board", "jobs_board")]
    ])
  );
});

// Lesson navigation
bot.action(/lesson_start_(.+)/, async (ctx) => {
  const category = ctx.match[1];
  await showLesson(ctx, category, 0);
});

bot.action(/lesson_next_(.+)/, async (ctx) => {
  const { category, index } = userState.get(ctx.from.id) || {};
  if (!category) return;
  await showLesson(ctx, category, index + 1);
});

bot.action(/lesson_prev_(.+)/, async (ctx) => {
  const { category, index } = userState.get(ctx.from.id) || {};
  if (!category) return;
  await showLesson(ctx, category, index - 1);
});

// Quiz trigger
bot.action(/quiz_(.+)_(.+)/, async (ctx) => {
  const [, category, index] = ctx.match;
  await showQuiz(ctx, category, parseInt(index, 10));
});

// Jobs handler
bot.command("jobs", (ctx) => {
  ctx.reply("💼 *Jobs Board*\n\n🔔 No jobs available right now.\n👉 Stay tuned, opportunities coming soon!");
});

bot.action("jobs_board", (ctx) => {
  ctx.reply("💼 *Jobs Board*\n\n🔔 No jobs available right now.\n👉 Stay tuned, opportunities coming soon!");
});

// Groups
async function showGroup(ctx, groupKey) {
  const g = GROUPS[groupKey];
  const sentMsg = await ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );

  const state = userState.get(ctx.from.id) || {};
  userState.set(ctx.from.id, { ...state, lastGroupMsgId: sentMsg.message_id });
}

bot.action("group_free", (ctx) => showGroup(ctx, "free"));
bot.action("group_paid1", (ctx) => showGroup(ctx, "paid1"));
bot.action("group_paid2", (ctx) => showGroup(ctx, "paid2"));

export default bot;

