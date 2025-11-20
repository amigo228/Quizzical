import he from 'he';

export default function Question({ question, answers, selectAnswer, selected, isGameOver, correctAnswer }) {
    return (
        <div className="quiz-item">
            <h3 className="question">
                {he.decode(question)}
            </h3>
            <ul className="answers-list">
                {answers.map((a, index) => (
                    <li
                        key={index}
                        className={`answer 
                        ${selected === a ? "selected" : ""} 
                        ${isGameOver ? "disabled" : ""} 
                        ${isGameOver && a === correctAnswer ? "correct" : ""} 
                        ${isGameOver && selected === a && a !== correctAnswer ? "wrong" : ""}`
                        }
                        onClick={() => { if (!isGameOver) selectAnswer(question, a) }}
                    >
                        {he.decode(a)}
                    </li>

                ))}
            </ul>
        </div>
    );
}
