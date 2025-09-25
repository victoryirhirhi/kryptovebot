// lessons/trading.js

// Import old content
import { noviceLessons, noviceQuiz } from "./noviceLessons.js";
import { intermediateLessons, intermediateQuiz } from "./intermediateLessons.js";
import { professionalLessons, professionalQuiz } from "./professionalLessons.js";

export const TRADING = {
  lessons: [
    // Merge novice
    ...noviceLessons,
    // Merge intermediate
    ...intermediateLessons,
    // Merge professional
    ...professionalLessons,
  ],

  // Attach quizzes in lesson order
  quizzes: {
    // Novice quizzes (map each lesson index to quiz)
    0: {
      question: noviceQuiz.questions[0].q,
      options: noviceQuiz.questions[0].options,
      answer: noviceQuiz.questions[0].answer,
    },
    1: {
      question: noviceQuiz.questions[1].q,
      options: noviceQuiz.questions[1].options,
      answer: noviceQuiz.questions[1].answer,
    },
    2: {
      question: noviceQuiz.questions[2].q,
      options: noviceQuiz.questions[2].options,
      answer: noviceQuiz.questions[2].answer,
    },
    3: {
      question: noviceQuiz.questions[3].q,
      options: noviceQuiz.questions[3].options,
      answer: noviceQuiz.questions[3].answer,
    },
    4: {
      question: noviceQuiz.questions[4].q,
      options: noviceQuiz.questions[4].options,
      answer: noviceQuiz.questions[4].answer,
    },

    // Intermediate quizzes (continue indexing after novice)
    7: {
      question: intermediateQuiz.questions[0].q,
      options: intermediateQuiz.questions[0].options,
      answer: intermediateQuiz.questions[0].answer,
    },
    8: {
      question: intermediateQuiz.questions[1].q,
      options: intermediateQuiz.questions[1].options,
      answer: intermediateQuiz.questions[1].answer,
    },
    9: {
      question: intermediateQuiz.questions[2].q,
      options: intermediateQuiz.questions[2].options,
      answer: intermediateQuiz.questions[2].answer,
    },
    10: {
      question: intermediateQuiz.questions[3].q,
      options: intermediateQuiz.questions[3].options,
      answer: intermediateQuiz.questions[3].answer,
    },
    11: {
      question: intermediateQuiz.questions[4].q,
      options: intermediateQuiz.questions[4].options,
      answer: intermediateQuiz.questions[4].answer,
    },

    // Professional quizzes (continue indexing after intermediate)
    14: {
      question: professionalQuiz[0].question,
      options: professionalQuiz[0].options,
      answer: professionalQuiz[0].answer,
    },
    15: {
      question: professionalQuiz[1].question,
      options: professionalQuiz[1].options,
      answer: professionalQuiz[1].answer,
    },
    16: {
      question: professionalQuiz[2].question,
      options: professionalQuiz[2].options,
      answer: professionalQuiz[2].answer,
    },
    17: {
      question: professionalQuiz[3].question,
      options: professionalQuiz[3].options,
      answer: professionalQuiz[3].answer,
    },
  },
};
