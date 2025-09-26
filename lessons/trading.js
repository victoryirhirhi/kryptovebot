// lessons/trading.js

import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

export const tradingLessons = [
  ...noviceLessons,
  ...intermediateLessons,
  ...professionalLessons,
];

export const tradingQuiz = {
  questions: [
    ...noviceQuiz.questions,
    ...intermediateQuiz.questions,
    ...professionalQuiz.questions,
  ],
  passingScore: 70, // you can set this higher if needed
};
