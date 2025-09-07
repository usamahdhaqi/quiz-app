import React, { useEffect, useState } from "react";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const QuestionCard = ({ data, onAnswer }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // shuffle hanya sekali ketika pertanyaan berubah
    setAnswers(shuffleArray([data.correct_answer, ...data.incorrect_answers]));
  }, [data]);

  return (
    <div className="question-card">
      <h3 dangerouslySetInnerHTML={{ __html: data.question }} />
      {answers.map((ans, idx) => (
        <button
          key={idx}
          onClick={() => onAnswer(ans === data.correct_answer)}
          dangerouslySetInnerHTML={{ __html: ans }}
        />
      ))}
    </div>
  );
};

export default QuestionCard;
