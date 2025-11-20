import Question from "./Question";
import React from "react";
import { ClipLoader } from 'react-spinners';

export default function Quiz({backHome}) {
    const [questionsArray, setQuestionsArray] = React.useState([]);
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [guessed, setGuessed] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);


    function checkAnswers() {
        const correctCount = questionsArray.filter(q => q.selected === q.correct_answer).length;
        setGuessed(correctCount);
        setIsGameOver(!isGameOver)
        console.log(correctCount);
    }

    function getQuestions() {
        return questionsArray.map((q, index) => <Question key={index}
        question={q.question} answers={q.answers} selectAnswer={selectAnswer} selected={q.selected} isGameOver={isGameOver} correctAnswer={q.correct_answer}
        />)
    }

    function selectAnswer(questionText, answer) {
        setQuestionsArray(prevState =>
            prevState.map(q =>
                q.question === questionText ? { ...q, selected: answer } : q
            )
        );
    }

    function handleArray(arrayOfQuestions) {
        return arrayOfQuestions.map(q => {
            const answers = [...q.incorrect_answers];
            const randomIndex = Math.floor(Math.random() * (answers.length + 1));
            answers.splice(randomIndex, 0, q.correct_answer);
            return {question: q.question,
                    correct_answer: q.correct_answer,
                    answers,
                    selected: ""
            }
        })
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => {
                setQuestionsArray(handleArray(data.results));
                setIsLoading(!isLoading);
            });
    }, [])

    return (
        <section className={`quiz-section ${isLoading ? "load" : ""}`}>
            {isLoading ? (
                <ClipLoader color="#4D5B9E" size={50} />
            ) : (
                <>
                    {getQuestions()}
                    <div className="meta-wrapper">
                        {isGameOver && (
                            <span className="result">{`You scored ${guessed}/5 correct answers`}</span>
                        )}
                        <button
                            className="status-btn"
                            onClick={() => (isGameOver ? backHome() : checkAnswers())}
                        >
                            {isGameOver ? "Play again" : "Check answers"}
                        </button>
                    </div>
                </>
            )}
        </section>

    );
}