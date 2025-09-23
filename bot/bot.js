import { Telegraf, Markup } from "telegraf";
import { BOT_TOKEN } from "../config.js";
import { LESSONS } from "../lessons/index.js";
import { GROUPS } from "../groups/groups.js";

const bot = new Telegraf(BOT_TOKEN);
const userState = new Map();

// build lesson keyboard
function buildLessonKeyboard(level, index, total) {
  const navButtons = [];
  if (index > 0) navButtons.push(Markup.button.callback("⬅️ Previous", `lesson_prev_${level}`));
  if (index < total - 1) navButtons.push(Markup.button.callback("Next ➡️", `lesson_next_${level}`));

  return Markup.inlineKeyboard([
    navButtons,
    [
      Markup.button.callback(GROUPS.free.name, "group_free"),
      Markup.button.callback(GROUPS.paid1.name, "group_paid1"),
      Markup.button.callback(GROUPS.paid2.name, "group_paid2")
    ]
  ]);
}

// show lesson
function showLesson(ctx, level, index) {
  const lessonData = LESSONS[level];
  if (!lessonData?.lessons[index]) {
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

// start
bot.start((ctx) => {
  userState.set(ctx.from.id, { level: "novice", index: 0 });
  return ctx.reply(
    "👋 Welcome to *Kryptove Academy Bot* 🚀\n\nStart your crypto journey:",
    Markup.inlineKeyboard([[Markup.button.callback("📘 Start Novice Lessons", "lesson_start_novice")]])
  );
});

// navigation
bot.action(/lesson_start_(.+)/, (ctx) => {
  const level = ctx.match[1];
  return showLesson(ctx, level, 0);
});
bot.action(/lesson_next_(.+)/, (ctx) => {
  const { level, index } = userState.get(ctx.from.id) || {};
  if (!level) return;
  return showLesson(ctx, level, index + 1);
});
bot.action(/lesson_prev_(.+)/, (ctx) => {
  const { level, index } = userState.get(ctx.from.id) || {};
  if (!level) return;
  return showLesson(ctx, level, index - 1);
});

// groups
bot.action("group_free", (ctx) => {
  const g = GROUPS.free;
  return ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );
});
bot.action("group_paid1", (ctx) => {
  const g = GROUPS.paid1;
  return ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );
});
bot.action("group_paid2", (ctx) => {
  const g = GROUPS.paid2;
  return ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );
});

export default bot;
