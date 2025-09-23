import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

export const LESSONS = {
  novice: { lessons: noviceLessons, quiz: noviceQuiz },
  intermediate: { lessons: intermediateLessons, quiz: intermediateQuiz },
  professional: { lessons: professionalLessons, quiz: professionalQuiz }
};
