// lessons/web3job.js

// Example content (replace with your real lessons & quizzes)
const web3JobLessons = [
  {
    title: "Lesson 1: Introduction to Web3 Careers",
    content: `
Web3 jobs include developers, community managers, marketers, and traders.
Unlike Web2, Web3 jobs often pay in crypto and involve DAOs, protocols, and decentralized apps.

Key Points:
- Developers: Smart contracts, dApps
- Non-tech: Community, content, growth
- Hybrid: Trading analysts, tokenomics advisors
- Payments: Often in stablecoins or project tokens

📌 Exercise:
- Check a job board like CryptoJobs or Web3.career.
    `,
  },
];

const web3JobQuiz = {
  questions: [
    {
      q: "Which of these is a Web3 career?",
      options: [
        "Blockchain Developer",
        "Smart Contract Auditor",
        "Community Manager",
        "All of the above",
      ],
      answer: 3,
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
export const WEB3JOB = {
  lessons: formatLessons(web3JobLessons),
  quizzes: formatQuiz(web3JobQuiz),
};
