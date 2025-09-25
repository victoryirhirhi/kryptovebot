// lessons/trading.js

// Import old content
import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

// Helper to format lessons
const formatLessons = (lessons) =>
  lessons.map((lesson) => `*${lesson.title}*\n\n${lesson.content}`);

// Helper to format quizzes
const formatQuiz = (quiz) =>
  quiz.questions.map((q, index) => ({
    text: `*Quiz ${index + 1}:* ${q.q}`,
    options: q.options,
    answer: q.answer,
  }));

export const TRADING = {
  lessons: [
    ...formatLessons(noviceLessons),
    ...formatLessons(intermediateLessons),
    ...formatLessons(professionalLessons),
  ],
  quizzes: [
    ...formatQuiz(noviceQuiz),
    ...formatQuiz(intermediateQuiz),
    ...formatQuiz(professionalQuiz),
  ],
};
