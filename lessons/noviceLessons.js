// lessons/noviceLessons.js

export const noviceLessons = [
  {
    title: "Lesson 1: Introduction to Crypto Trading",
    content: `
Crypto trading is the process of buying and selling cryptocurrencies to make profits.  
As a novice, your focus is on **understanding what crypto is, how exchanges work, and basic safety practices**.  

Key Points:
- Crypto = digital assets like Bitcoin, Ethereum, etc.
- Exchanges: Platforms like Binance, Coinbase, Bybit where trades happen.
- Custody: You can hold crypto in wallets (hot wallets for quick access, cold wallets for security).
- Market types: Spot (simple buy/sell) vs. Derivatives (advanced trading).

📌 Exercise:
- Open a free account on a crypto exchange.
- Explore how to buy/sell a small test amount with demo or real funds.
    `
  },
  {
    title: "Lesson 2: Understanding Market Basics",
    content: `
Markets move due to **supply and demand**.  
Your role is to understand how **price, volume, and time** interact.  

Key Points:
- Price charts show how markets move.
- Candlesticks reveal open, high, low, and close of prices.
- Volume shows strength of moves.
- Trend: Markets can go up (bullish), down (bearish), or sideways (consolidation).

📌 Exercise:
- Open a BTC/USDT chart on TradingView.
- Identify whether the market is trending or ranging.
    `
  },
  {
    title: "Lesson 3: Basic Trading Terminology",
    content: `
Professional traders use terms you must learn early:  

- **Long**: Buying an asset expecting price to rise.  
- **Short**: Selling/borrowing an asset expecting price to fall.  
- **Pips/Ticks**: Smallest price movement units.  
- **Leverage**: Borrowed funds that amplify both gains and losses.  
- **Stop-Loss (SL)**: Protects your capital when trade goes wrong.  
- **Take-Profit (TP)**: Locks in profits at your target.

📌 Exercise:
- Write down each term in your journal with an example sentence.
    `
  },
  {
    title: "Lesson 4: Spot vs Futures Trading",
    content: `
There are two main ways to trade:  

1. **Spot Trading**: Buying and holding assets directly.  
   - Safer for beginners.  
   - Example: Buy 0.01 BTC and hold until price rises.  

2. **Futures Trading**: Speculating on future prices.  
   - Can trade with leverage.  
   - Higher risk, not for beginners.  

📌 Exercise:
- Compare a Spot BTC/USDT chart with a Futures BTC/USDT chart.
- Write down differences in your notes.
    `
  },
  {
    title: "Lesson 5: Basic Risk Management",
    content: `
Risk management is the **most important part of trading**.  

Key Rules:
- Never risk more than 1–2% of your account on a single trade.  
- Always set a stop-loss.  
- Use position sizing calculators.  
- Avoid revenge trading (don’t chase losses).  

📌 Exercise:
- Imagine you have $100.  
- How much should you risk per trade if you follow 2% rule? (Answer: $2).
    `
  },
  {
    title: "Lesson 6: Emotional Control",
    content: `
Trading is 80% psychology, 20% strategy.  

Main Emotions to Master:
- **Fear**: Causes early exits or missed trades.  
- **Greed**: Leads to over-leveraging or holding too long.  
- **FOMO**: Entering trades too late.  
- **Revenge Trading**: Trading after losses to "win back".  

📌 Exercise:
- Write down your emotional triggers in a trading journal.
    `
  },
  {
    title: "Lesson 7: First Steps to Build Consistency",
    content: `
Consistency is more important than quick profits.  

Rules:
- Stick to one strategy until you master it.  
- Trade demo or very small amounts first.  
- Track every trade in a journal.  
- Focus on process, not outcome.  

📌 Exercise:
- Create a trading journal with columns: Date, Pair, Entry, Exit, SL, TP, Notes.
    `
  }
];

export const noviceQuiz = {
  questions: [
    { q: "What does 'Long' mean?", options: ["Expecting price to rise", "Expecting price to fall", "Holding forever", "Trading sideways"], answer: 0 },
    { q: "How much should you risk per trade with $100 account at 2%?", options: ["$20", "$10", "$2", "$5"], answer: 2 },
    { q: "What is Spot Trading?", options: ["Borrowing crypto", "Buying and selling actual crypto assets", "Trading with leverage", "Scalping futures"], answer: 1 },
    { q: "What protects your account when trade goes wrong?", options: ["FOMO", "Stop-Loss", "Leverage", "Candlesticks"], answer: 1 },
    { q: "Which is more important for long-term success?", options: ["Quick profits", "Consistency and process", "High leverage", "Guessing tops"], answer: 1 }
  ],
  passingScore: 70
};
