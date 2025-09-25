import { tradingLessons, tradingQuiz } from "./trading.js";
import { web3JobLessons, web3JobQuiz } from "./web3job.js";
import { fundingLessons, fundingQuiz } from "./funding.js";

export const LESSONS = {
  trading: { lessons: tradingLessons, quiz: tradingQuiz },
  web3job: { lessons: web3JobLessons, quiz: web3JobQuiz },
  funding: { lessons: fundingLessons, quiz: fundingQuiz }
};
