export default function Home({startQuiz}) {
    return (
        <section className="home-section">
            <h1 className="hero-title">Quizzical</h1>
            <p className="hero-description">Some description if needed</p>
            <button className="start" onClick={startQuiz}>Start quiz</button>
        </section>
    )
}