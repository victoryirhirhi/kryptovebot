// lessons/trading.js

// Import old content
import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

// Merge all lessons
export const tradingLessons = [
  ...noviceLessons,
  ...intermediateLessons,
  ...professionalLessons,
];

// Merge all quizzes into one
export const tradingQuiz = {
  questions: [
    ...noviceQuiz.questions,
    ...intermediateQuiz.questions,
    ...professionalQuiz.questions,
  ],
  passingScore: 70, // ✅ adjust this if you want
};
