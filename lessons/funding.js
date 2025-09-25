// lessons/funding.js

// Example content (replace with your real lessons & quizzes)
const fundingLessons = [
  {
    title: "Lesson 1: Introduction to Funding",
    content: `
Funding in crypto means raising capital for projects or traders.
It can be done via venture capital, launchpads, or crowdfunding.

Key Points:
- Seed funding: Early investors
- VC funding: Big money
- Community funding: Launchpads, ICOs
- Grants: From protocols or DAOs

📌 Exercise:
- Research 2 crypto launchpads (e.g., Binance Launchpad, Polkastarter).
    `,
  },
];

const fundingQuiz = {
  questions: [
    {
      q: "What is seed funding?",
      options: [
        "Funding by early investors",
        "Government loan",
        "Exchange listing fee",
        "Free airdrop",
      ],
      answer: 0,
    },
  ],
  passingScore: 70,
};

// --- Formatters ---
const formatLessons = (lessons) =>
  lessons.map((lesson) => `*${lesson.title}*\n\n${lesson.content}`);

const formatQuiz = (quiz) =>
  quiz.questions.map((q, index) => ({
    text: `*Quiz ${index + 1}:* ${q.q}`,
    options: q.options,
    answer: q.answer,
  }));

// --- Export ---
export const FUNDING = {
  lessons: formatLessons(fundingLessons),
  quizzes: formatQuiz(fundingQuiz),
};
