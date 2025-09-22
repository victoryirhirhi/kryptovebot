const intermediateLessons = [
    {
      title: "Lesson 1: Introduction to Technical Analysis",
      content: `
  **What is Technical Analysis (TA)?**
  Technical Analysis is the study of market data, mainly price and volume, to forecast future price movements.  
  Unlike Fundamental Analysis (which looks at project value), TA focuses on patterns, indicators, and market psychology.
  
  **Key Principles**
  - Market action discounts everything (price reflects all info).
  - Prices move in trends (up, down, sideways).
  - History repeats itself (human behavior is predictable in markets).
  
  **Common Tools**
  - Candlestick charts
  - Support and resistance levels
  - Trendlines
  
  📌 **Exercise**
  - Open TradingView.
  - Draw trendlines on BTC/USDT daily chart.
  `
    },
    {
      title: "Lesson 2: Candlestick Patterns",
      content: `
  **What are Candlesticks?**
  Candlesticks show the open, high, low, and close prices of a given time period.  
  
  **Basic Patterns**
  - **Doji**: Market indecision.
  - **Hammer**: Bullish reversal signal after downtrend.
  - **Engulfing**: Strong reversal pattern (bullish or bearish).
  - **Shooting Star**: Bearish reversal signal after uptrend.
  
  **Why Patterns Matter**
  They reveal trader psychology and market momentum.
  
  📌 **Exercise**
  - Identify 3 bullish and 3 bearish candlestick patterns on ETH/USDT chart.
  `
    },
    {
      title: "Lesson 3: Support and Resistance",
      content: `
  **Support**
  A price level where demand is strong enough to prevent further decline.  
  
  **Resistance**
  A price level where selling pressure prevents further rise.  
  
  **Key Insights**
  - Once broken, support becomes resistance and vice versa.
  - Stronger when tested multiple times.
  
  📌 **Exercise**
  - Draw at least 2 support and 2 resistance zones on BTC/USDT 4h chart.
  `
    },
    {
      title: "Lesson 4: Indicators and Oscillators",
      content: `
  Indicators help confirm or reject trading ideas.  
  
  **Popular Indicators**
  - **Moving Averages (MA)**: Show trend direction.
  - **Relative Strength Index (RSI)**: Measures overbought/oversold.
  - **MACD**: Momentum and trend strength.
  - **Volume**: Confirms trend strength.
  
  **Rule**
  Use 2–3 indicators together, not too many.
  
  📌 **Exercise**
  - Add RSI and 50/200 MA to a chart.
  - Check if RSI confirms the MA trend.
  `
    },
    {
      title: "Lesson 5: Chart Patterns",
      content: `
  **Common Patterns**
  - **Head and Shoulders**: Reversal pattern.
  - **Double Top/Bottom**: Indicates reversal.
  - **Triangles**: Show consolidation before breakout.
  - **Flags/Pennants**: Continuation patterns.
  
  **Why They Work**
  They represent collective trader behavior.
  
  📌 **Exercise**
  - Identify 1 reversal and 1 continuation pattern on any crypto chart.
  `
    },
    {
      title: "Lesson 6: Risk Management Advanced",
      content: `
  At this stage, you must refine your risk rules.  
  
  **Position Sizing**
  - Formula: Risk Amount ÷ (Entry – Stop Loss).  
  - Example: With $1,000, risk = 2% = $20. If SL is $10 away, trade size = 2 units.
  
  **Diversification**
  - Don’t put all capital in one trade.
  - Balance between BTC, ETH, altcoins, and stablecoins.
  
  **Risk-to-Reward (R:R)**
  - Aim for at least 1:2 ratio.
  
  📌 **Exercise**
  - Calculate position size for a $500 account with 1.5% risk per trade.
  `
    },
    {
      title: "Lesson 7: Trading Psychology (Intermediate)",
      content: `
  Now that you know more, psychology becomes harder.  
  
  **Key Psychological Traps**
  - **Overconfidence**: Winning streaks create carelessness.
  - **Analysis Paralysis**: Too many indicators, no action.
  - **Confirmation Bias**: Only believing info that supports your trade.
  
  **How to Overcome**
  - Stick to written plan.
  - Limit daily trades.
  - Journal your mistakes.
  
  📌 **Exercise**
  - Write down your top 2 psychological weaknesses in trading.
  `
    }
  ];
  
  const intermediateQuiz = {
    questions: [
      { q: "Which chart pattern suggests a reversal?", options: ["Flag", "Head and Shoulders", "Triangle", "Pennant"], answer: 1 },
      { q: "RSI above 70 usually means:", options: ["Oversold", "Neutral", "Overbought", "No signal"], answer: 2 },
      { q: "Support is best defined as:", options: ["A level where price often rises", "A guaranteed profit zone", "A government-backed price", "A news event"], answer: 0 },
      { q: "Best risk-to-reward ratio for trades:", options: ["1:1", "1:2 or higher", "2:1", "1:0.5"], answer: 1 },
      { q: "What’s a psychological trap for intermediate traders?", options: ["Overconfidence", "Patience", "Proper journaling", "Using stop losses"], answer: 0 }
    ],
    passingScore: 70
  };
  
  module.exports = { intermediateLessons, intermediateQuiz };
  