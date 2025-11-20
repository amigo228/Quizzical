import React from 'react'
import Home from "./components/Home";
import Quiz from "./components/Quiz.jsx"

export default function Quizzical() {

const [isQuizStarted, setIsQuizStarted] = React.useState(false);

function startQuiz() {
    setIsQuizStarted(!isQuizStarted)
}

  return (
      <>
          <div className={`left-corner-blob ${isQuizStarted ? "quiz-mode" : ""}`}></div>
          <div className={`right-corner-blob ${isQuizStarted ? "quiz-mode" : ""}`}></div>
        <main>
          {isQuizStarted ? <Quiz backHome={startQuiz}/> : <Home startQuiz={startQuiz}/>}
        </main>
      </>
  )
}


