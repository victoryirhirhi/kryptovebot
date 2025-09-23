import { Telegraf, Markup } from "telegraf";
import { BOT_TOKEN } from "../config.js";
import { LESSONS } from "../lessons/index.js";
import { GROUPS } from "../groups/groups.js";

const bot = new Telegraf(BOT_TOKEN);
const userState = new Map(); // simple session

// 🔹 Keyboard builder with lessons + group buttons
function buildLessonKeyboard(level, index, total) {
  const navButtons = [];

  if (index > 0) navButtons.push(Markup.button.callback("⬅️ Previous", `lesson_prev_${level}`));
  if (index < total - 1) navButtons.push(Markup.button.callback("Next ➡️", `lesson_next_${level}`));

  return Markup.inlineKeyboard([
    navButtons,
    [
      Markup.button.callback("📢 Kryptove Hub (Free)", "group_free"),
      Markup.button.callback("💎 Kryptove Signal", "group_paid1"),
      Markup.button.callback("🚀 Kryptove Meme Kartel", "group_paid2"),
    ],
  ]);
}

// 🔹 Show lesson
function showLesson(ctx, level, index) {
  const lessonData = LESSONS[level];
  if (!lessonData || !lessonData.lessons[index]) {
    return ctx.reply("❌ Lesson not found.");
  }

  const lesson = lessonData.lessons[index];
  const total = lessonData.lessons.length;

  userState.set(ctx.from.id, { level, index });

  return ctx.replyWithMarkdown(
    `*${lesson.title}*\n\n${lesson.content}`,
    buildLessonKeyboard(level, index, total)
  );
}

// 🔹 Start command
bot.start((ctx) => {
  userState.set(ctx.from.id, { level: "novice", index: 0 });
  return ctx.reply(
    "👋 Welcome to *Kryptove Academy Bot* 🚀\n\nStart your crypto journey step by step.",
    Markup.inlineKeyboard([
      [Markup.button.callback("📘 Start Novice Lessons", "lesson_start_novice")],
    ])
  );
});

// 🔹 Lesson navigation
bot.action(/lesson_start_(.+)/, (ctx) => {
  const level = ctx.match[1];
  userState.set(ctx.from.id, { level, index: 0 });
  return showLesson(ctx, level, 0);
});

bot.action(/lesson_next_(.+)/, (ctx) => {
  const level = ctx.match[1];
  const state = userState.get(ctx.from.id);
  if (!state || state.level !== level) return;
  return showLesson(ctx, level, state.index + 1);
});

bot.action(/lesson_prev_(.+)/, (ctx) => {
  const level = ctx.match[1];
  const state = userState.get(ctx.from.id);
  if (!state || state.level !== level) return;
  return showLesson(ctx, level, state.index - 1);
});

// 🔹 Group button handlers
bot.action("group_free", (ctx) => {
  const g = GROUPS.free;
  return ctx.reply(
    `*${g.title}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );
});

bot.action("group_paid1", (ctx) => {
  const g = GROUPS.paid1;
  return ctx.reply(
    `*${g.title}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );
});

bot.action("group_paid2", (ctx) => {
  const g = GROUPS.paid2;
  return ctx.reply(
    `*${g.title}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );
});

// 🔹 Vercel handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body, res);
    } catch (err) {
      console.error("Error handling update:", err);
      res.status(500).send("Error");
    }
  } else {
    res.status(200).send("✅ Kryptove Bot is running on Vercel!");
  }
}
