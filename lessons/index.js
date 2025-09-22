const { noviceLessons, noviceQuiz } = require("./noviceLessons");
const { intermediateLessons, intermediateQuiz } = require("./intermediateLessons");
const { professionalLessons, professionalQuiz } = require("./professionalLessons");

const lessons = {
  novice: noviceLessons,
  noviceQuiz,
  intermediate: intermediateLessons,
  intermediateQuiz,
  professional: professionalLessons,
  professionalQuiz
};

module.exports = lessons;