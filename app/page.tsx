"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import GardenQuiz from "./components/garden-quiz";
import Chat from "./components/chat";

const Home = () => {
  const [quizResults, setQuizResults] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <div className={styles.title}>Let's build your ideal garden!</div>

      {!quizResults ? (
        <GardenQuiz setQuizResults={setQuizResults} />
      ) : (
        <Chat initialPrompt={quizResults} />
      )}
    </main>
  );
};

export default Home;
