import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = () => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
        localStorage.setItem("quizQuestions", JSON.stringify(data.results)); // simpan ke cache
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const cached = localStorage.getItem("quizQuestions");
    if (cached && cached !== "undefined") {
      try {
        setQuestions(JSON.parse(cached));
        setLoading(false);
      } catch (err) {
        console.error("Cache rusak, ambil ulang soal:", err);
        fetchQuestions();
      }
    } else {
      fetchQuestions();
    }
  }, []);

  return (
    <div className="app">
      <h1>🧠 Genius Quiz</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          <Quiz questions={questions} />
          <button className="reload-btn" onClick={fetchQuestions}>
            🔄 Muat Ulang Soal
          </button>
        </>
      )}
    </div>
  );
}

export default App;
