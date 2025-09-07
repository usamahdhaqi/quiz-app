import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

const Quiz = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setTimeLeft(15);
  };

  const handleAnswer = (correct) => {
    if (correct) setScore((prev) => prev + 1);
    nextQuestion();
  };

  // ✅ Cegah error ketika questions masih kosong
  if (!questions || questions.length === 0) {
    return <p>❌ Tidak ada soal ditemukan. Coba reload.</p>;
  }

  if (current >= questions.length) {
    return <h2>✅ Quiz selesai! Skor kamu: {score}/{questions.length}</h2>;
  }

  return (
    <div>
      <ProgressBar current={current} total={questions.length} />
      <p>⏱ Waktu tersisa: {timeLeft} detik</p>
      <QuestionCard data={questions[current]} onAnswer={handleAnswer} />
      <p>Skor: {score}</p>
    </div>
  );
};

export default Quiz;
