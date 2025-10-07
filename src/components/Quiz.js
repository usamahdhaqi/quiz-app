import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

const Quiz = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft === 0) nextQuestion();
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    setCurrent(prev => prev + 1);
    setTimeLeft(15);
  };

  const handleAnswer = (correct) => {
    if (correct) setScore(prev => prev + 1);
    nextQuestion();
  };

  if (!questions || questions.length === 0) {
    return (
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#e63946" viewBox="0 0 24 24" style={{ verticalAlign: "middle", marginRight: "6px" }}>
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/>
        </svg>
        Tidak ada soal ditemukan. Coba reload.
      </p>
    );
  }

  if (current >= questions.length) {
    return (
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#10b981" viewBox="0 0 24 24" style={{ verticalAlign: "middle", marginRight: "8px" }}>
          <path d="M12 0a12 12 0 1 0 12 12A12.014 12.014 0 0 0 12 0zm5 9-6 6-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9z"/>
        </svg>
        Quiz selesai! Skor kamu: {score}/{questions.length}
      </h2>
    );
  }

  return (
    <div>
      {/* Sticky Info Bar */}
      <div className="info-bar">
        <div className="timer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#effffa" viewBox="0 0 24 24" style={{ verticalAlign: "middle", marginRight: "6px" }}>
            <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9ZM13 7h-2v6l5.25 3.15L17 14.92l-4-2.42Z" />
          </svg>
          Waktu: {timeLeft}s
        </div>

        <div className="score">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 24 24" style={{ verticalAlign: "middle", marginRight: "6px" }}>
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.174L12 18.896l-7.335 3.87 1.401-8.174L.132 9.21l8.2-1.192z"/>
          </svg>
          Skor: {score}
        </div>
      </div>

      <ProgressBar current={current} total={questions.length} />
      <QuestionCard data={questions[current]} onAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;
