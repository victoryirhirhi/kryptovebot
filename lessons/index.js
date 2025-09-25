// lessons/index.js

import * as Trading from "./trading.js";
import * as Web3Job from "./web3job.js";
import * as Funding from "./funding.js";

export const LESSONS = {
  trading: {
    lessons: Trading.tradingLessons || [],
    quiz: Trading.tradingQuiz || {}
  },
  web3job: {
    lessons: Web3Job.web3JobLessons || [],
    quiz: Web3Job.web3JobQuiz || {}
  },
  funding: {
    lessons: Funding.fundingLessons || [],
    quiz: Funding.fundingQuiz || {}
  }
};
