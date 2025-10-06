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
        localStorage.setItem("quizQuestions", JSON.stringify(data.results));
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
      {/* SVG Icon untuk Judul */}
      <div className="title-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#8a4fff"
          width="40px"
          height="40px"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 3.28 2.27 6.03 5.33 6.82V18h3.34v-2.18C16.73 15.03 19 12.28 19 9c0-3.87-3.13-7-7-7zm0 11.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 4.5 12 4.5 16.5 6.52 16.5 9 14.48 13.5 12 13.5z" />
        </svg>
      </div>

      <h1>Genius Quiz</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          <Quiz questions={questions} />
          <button className="reload-btn" onClick={fetchQuestions}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="18px"
              height="18px"
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            >
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.65-.67 3.15-1.76 4.24l1.42 1.42A7.963 7.963 0 0 0 20 12c0-4.42-3.58-8-8-8zm-6.66.76L3.92 6.18A7.963 7.963 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.65.67-3.15 1.76-4.24z" />
            </svg>
            Muat Ulang Soal
          </button>
        </>
      )}
    </div>
  );
}

export default App;
