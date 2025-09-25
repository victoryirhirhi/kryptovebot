// lessons/trading.js

import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

// Format lessons
const formatLessons = (lessons) =>
  lessons.map((lesson) => ({ title: lesson.title, content: lesson.content }));

// Format quizzes
const formatQuiz = (quiz) =>
  quiz.questions.map((q, index) => ({
    question: q.q,
    options: q.options,
    answer: q.answer,
  }));

export const tradingLessons = [
  ...formatLessons(noviceLessons),
  ...formatLessons(intermediateLessons),
  ...formatLessons(professionalLessons),
];

export const tradingQuiz = [
  ...formatQuiz(noviceQuiz),
  ...formatQuiz(intermediateQuiz),
  ...formatQuiz(professionalQuiz),
];
