// lessons/trading.js

import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

// Each lesson must keep { title, content } format
// Each quiz must keep { question, options[], answer } format

export const tradingLessons = [
  ...noviceLessons,
  ...intermediateLessons,
  ...professionalLessons,
];

export const tradingQuiz = [
  ...noviceQuiz,
  ...intermediateQuiz,
  ...professionalQuiz,
];
