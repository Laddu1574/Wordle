import React, { useState, useEffect } from "react";
import "./Styles.css";
import { motion } from "framer-motion";

const WORDS = ["apple", "table", "chair", "grape", "brick", "flame"];
const MAX_ATTEMPTS = 6;

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const Wordle = () => {
  const [word, setWord] = useState(getRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (guesses.includes(word)) {
      setGameStatus("won");
    } else if (guesses.length >= MAX_ATTEMPTS) {
      setGameStatus("lost");
    }
  }, [guesses, word]);

  const handleGuess = () => {
    if (currentGuess.length === 5 && !guesses.includes(currentGuess)) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");
    }
  };

  const getFeedback = (guess) => {
    return guess.split("").map((char, idx) => {
      if (char === word[idx]) return "green";
      if (word.includes(char)) return "yellow";
      return "gray";
    });
  };

  return (
    <div className={`game-container ${darkMode ? "dark" : ""}`}>
      <h1>Wordle Clone</h1>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-dark">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="board">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: 5 }).map((_, j) => {
              const guess = guesses[i] || "";
              const feedback = guess[j] ? getFeedback(guess)[j] : "";
              return (
                <motion.div
                  key={j}
                  className={`cell ${feedback}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: j * 0.1 }}
                >
                  {guess[j] || ""}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      {gameStatus === "playing" ? (
        <div>
          <input
            type="text"
            value={currentGuess}
            maxLength="5"
            onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
          />
          <button onClick={handleGuess}>Submit</button>
        </div>
      ) : (
        <div className="message">
          <h2>
            {gameStatus === "won"
              ? "🎉 You Won!"
              : `😞 You Lost! Word: ${word}`}
          </h2>
          <button
            onClick={() => {
              setWord(getRandomWord());
              setGuesses([]);
              setCurrentGuess("");
              setGameStatus("playing");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Wordle;
