import TelegramBot from "node-telegram-bot-api";
import { TRADING } from "../lessons/trading.js";
import { WEB3JOB } from "../lessons/web3job.js";
import { FUNDING } from "../lessons/funding.js";
import { GROUPS } from "../groups/groups.js";

const token = "YOUR_BOT_TOKEN"; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

const COURSES = { trading: TRADING, web3job: WEB3JOB, funding: FUNDING };
let userProgress = {}; // { chatId: { course, lessonIndex, quizIndex, score } }

// Start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "👋 Welcome to Kryptove Academy!\nChoose a course:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📈 Trading", callback_data: "course_trading" }],
        [{ text: "💼 Web3 Job", callback_data: "course_web3job" }],
        [{ text: "💰 Funding", callback_data: "course_funding" }],
        [{ text: GROUPS.free.buttonText, url: GROUPS.free.url }],
        [{ text: GROUPS.paid1.buttonText, url: GROUPS.paid1.url }],
        [{ text: GROUPS.paid2.buttonText, url: GROUPS.paid2.url }]
      ]
    }
  });
});

// Handle course selection
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data.startsWith("course_")) {
    const course = data.split("_")[1];
    userProgress[chatId] = { course, lessonIndex: 0, quizIndex: 0, score: 0 };
    sendLesson(chatId);
  }

  if (data.startsWith("nextlesson_")) {
    userProgress[chatId].lessonIndex++;
    sendLesson(chatId);
  }

  if (data.startsWith("quiz_")) {
    const [_, qIndex, selected] = data.split("_");
    checkAnswer(chatId, parseInt(qIndex), parseInt(selected));
  }
});

// Send lesson
function sendLesson(chatId) {
  const state = userProgress[chatId];
  const courseData = COURSES[state.course];
  if (state.lessonIndex < courseData.lessons.length) {
    const lesson = courseData.lessons[state.lessonIndex];
    bot.sendMessage(chatId, `📘 *${lesson.title}*\n\n${lesson.content}`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "👉 Next", callback_data: `nextlesson_${state.lessonIndex}` }]]
      }
    });
  } else {
    sendQuiz(chatId);
  }
}

// Send quiz
function sendQuiz(chatId) {
  const state = userProgress[chatId];
  const courseData = COURSES[state.course];
  if (state.quizIndex < courseData.quizzes.length) {
    const quiz = courseData.quizzes[state.quizIndex];
    const buttons = quiz.options.map((opt, i) => [{ text: opt, callback_data: `quiz_${state.quizIndex}_${i}` }]);
    bot.sendMessage(chatId, `📝 ${quiz.question}`, {
      reply_markup: { inline_keyboard: buttons }
    });
  } else {
    const scorePercent = (state.score / courseData.quizzes.length) * 100;
    if (scorePercent >= courseData.passingScore) {
      bot.sendMessage(chatId, `🎉 Congrats! You passed *${state.course}* with ${scorePercent.toFixed(0)}%.`, { parse_mode: "Markdown" });
    } else {
      bot.sendMessage(chatId, `❌ You scored ${scorePercent.toFixed(0)}%. Please retry.`, { parse_mode: "Markdown" });
    }
  }
}

// Check quiz answer
function checkAnswer(chatId, qIndex, selected) {
  const state = userProgress[chatId];
  const courseData = COURSES[state.course];
  const quiz = courseData.quizzes[qIndex];

  if (selected === quiz.answer) {
    state.score++;
    bot.sendMessage(chatId, "✅ Correct!");
  } else {
    bot.sendMessage(chatId, `❌ Wrong! Correct answer: *${quiz.options[quiz.answer]}*`, { parse_mode: "Markdown" });
  }

  state.quizIndex++;
  sendQuiz(chatId);
}
