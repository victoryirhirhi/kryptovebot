// lessons/professionalLessons.js

export const professionalLessons = [
  {
    title: "Lesson 1: Advanced Risk Management",
    content: `
Learn how to manage large portfolios, hedge positions with derivatives, 
and apply advanced stop-loss/take-profit strategies.
    `
  },
  {
    title: "Lesson 2: On-Chain Analysis",
    content: `
Dive into blockchain data, track whale wallets, analyze token distribution, 
and use tools like Dune and Nansen for deep insights.
    `
  },
  {
    title: "Lesson 3: Algorithmic & Bot Trading",
    content: `
Understand how to build, backtest, and deploy trading bots using APIs. 
Explore strategies like grid trading, arbitrage, and market-making.
    `
  },
  {
    title: "Lesson 4: DeFi Yield Optimization",
    content: `
Master liquidity mining, yield farming, and cross-chain arbitrage. 
Learn how to maximize returns while managing impermanent loss.
    `
  },
  {
    title: "Lesson 5: Institutional & Prop Trading",
    content: `
Study how hedge funds, prop firms, and institutional investors trade. 
Learn about order flow, advanced indicators, and professional psychology.
    `
  }
];

export const professionalQuiz = {
  questions: [
    {
      q: "What is impermanent loss?",
      options: [
        "A temporary loss in DeFi liquidity pools due to price divergence",
        "A permanent loss when trading futures",
        "A loss from forgetting your wallet seed phrase",
        "Loss due to gas fees"
      ],
      answer: 0
    },
    {
      q: "Which tool can track whale wallet movements?",
      options: ["TradingView", "Nansen", "Photoshop", "CoinMarketCap"],
      answer: 1
    },
    {
      q: "What is backtesting in algorithmic trading?",
      options: [
        "Testing a strategy using historical data",
        "Running a bot on a demo account",
        "Reversing a losing trade",
        "Checking exchange downtime"
      ],
      answer: 0
    },
    {
      q: "What is the main risk when providing liquidity in DeFi?",
      options: ["Impermanent loss", "Exchange hacks", "Low volatility", "High gas fees"],
      answer: 0
    }
  ],
  passingScore: 70
};
