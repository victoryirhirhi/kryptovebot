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
    [Markup.button.callback(GROUPS.free.name, "group_free")],
    [Markup.button.callback(GROUPS.paid1.name, "group_paid1")],
    [Markup.button.callback(GROUPS.paid2.name, "group_paid2")]
  ]);
}

// show lesson
async function showLesson(ctx, level, index) {
  const lessonData = LESSONS[level];
  if (!lessonData?.lessons[index]) {
    return ctx.reply("❌ Lesson not found.");
  }

  const lesson = lessonData.lessons[index];
  const total = lessonData.lessons.length;

  const state = userState.get(ctx.from.id);

  // delete previous lesson if exists
  if (state?.lastMsgId) {
    try {
      await ctx.deleteMessage(state.lastMsgId);
    } catch (e) {
      console.log("Lesson message already deleted or cannot be deleted");
    }
  }

  // delete last group message if exists
  if (state?.lastGroupMsgId) {
    try {
      await ctx.deleteMessage(state.lastGroupMsgId);
    } catch (e) {
      console.log("Group message already deleted or cannot be deleted");
    }
  }

  // send new lesson
  const sentMsg = await ctx.replyWithMarkdown(
    `*${lesson.title}*\n\n${lesson.content}`,
    buildLessonKeyboard(level, index, total)
  );

  // update state
  userState.set(ctx.from.id, {
    ...state,
    level,
    index,
    lastMsgId: sentMsg.message_id
  });
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

// groups
async function showGroup(ctx, groupKey) {
  const g = GROUPS[groupKey];
  const sentMsg = await ctx.replyWithMarkdown(
    `*${g.name}*\n\n${g.description}`,
    Markup.inlineKeyboard([[Markup.button.url(g.buttonText, g.url)]])
  );

  // store last group message id
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
