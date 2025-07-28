import { useState, useEffect } from "react";

const App = () => {
    // Quiz state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Carousel state
    const [currentImage, setCurrentImage] = useState(0);

    // API data state
    const [joke, setJoke] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Quiz questions
    const quizQuestions = [
        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Computer Style System",
                "Colorful Style Syntax",
                "Creative Style Sheets"
            ],
            correctAnswer: 0
        },
        {
            question: "Which property is used to change the background color?",
            options: [
                "color",
                "bgcolor",
                "background-color",
                "background"
            ],
            correctAnswer: 2
        },
        {
            question: "What is the correct HTML for referring to an external style sheet?",
            options: [
                "<style src='mystyle.css'>",
                "<stylesheet>mystyle.css</stylesheet>",
                "<link rel='stylesheet' type='text/css' href='mystyle.css'>",
                "<script src='mystyle.css'>"
            ],
            correctAnswer: 2
        },
        {
            question: "How do you select an element with id 'demo' in CSS?",
            options: [
                ".demo",
                "#demo",
                "demo",
                "*demo"
            ],
            correctAnswer: 1
        },
        {
            question: "Which JavaScript method is used to write HTML to a web page?",
            options: [
                "document.write()",
                "console.log()",
                "document.innerHTML()",
                "document.output()"
            ],
            correctAnswer: 0
        }
    ];

    // Carousel images
    const carouselImages = [
        "https://placehold.co/800x400/3b82f6/ffffff?text=Web+Design",
        "https://placehold.co/800x400/10b981/ffffff?text=Responsive+Design",
        "https://placehold.co/800x400/f59e0b/ffffff?text=Interactive+Elements",
        "https://placehold.co/800x400/ef4444/ffffff?text=Modern+Web+Tech"
    ];

    // Handle quiz answer selection
    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    // Handle quiz submission
    const handleNextQuestion = () => {
        if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
        } else {
            setShowScore(true);
        }
    };

    // Handle quiz restart
    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
    };

    // Handle carousel navigation
    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Fetch joke from API
    const fetchJoke = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            const data = await response.json();
            setJoke(`${data.setup} - ${data.punchline}`);
        } catch (err) {
            setError('Failed to load joke. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Initial joke fetch
    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white shadow-lg border-b-4 border-blue-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-4xl font-bold text-center text-gray-800">
                        Advanced Web Development
                    </h1>
                    <p className="text-center text-lg text-gray-600 mt-2">
                        Responsive Design, Interactive Elements & API Integration
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Responsive Design Section */}
                <section className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Responsive Design
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">📱 Mobile</h3>
                            <p className="text-blue-700">Fully responsive layout that adapts to all screen sizes using CSS media queries and Tailwind's responsive classes.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h3 className="text-xl font-semibold text-green-800 mb-3">💻 Tablet</h3>
                            <p className="text-green-700">Optimized touch interactions and layout adjustments for tablet devices with improved readability.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                            <h3 className="text-xl font-semibold text-purple-800 mb-3">🖥️ Desktop</h3>
                            <p className="text-purple-700">Enhanced desktop experience with larger layouts, hover effects, and advanced styling features.</p>
                        </div>
                    </div>
                </section>

                {/* Image Carousel Section */}
                <section className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-8 h-8 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Interactive Image Carousel
                    </h2>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src={carouselImages[currentImage]}
                                alt={`Slide ${currentImage + 1}`}
                                className="w-full h-96 object-cover transition-all duration-500 ease-in-out"
                            />
                        </div>

                        {/* Carousel Controls */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {carouselImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                        index === currentImage ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Auto-advancing carousel with manual navigation controls • Slide {currentImage + 1} of {carouselImages.length}
                        </p>
                    </div>
                </section>

                {/* Interactive Quiz Section */}
                <section className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-8 h-8 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Interactive Quiz
                    </h2>

                    {!showScore ? (
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-700">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Score: {score}/{quizQuestions.length}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                                        {quizQuestions[currentQuestion].question}
                                    </h3>

                                    <div className="space-y-3">
                                        {quizQuestions[currentQuestion].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerClick(index)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                                    selectedAnswer === index
                                                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                                                }`}
                                            >
                        <span className="font-medium mr-3">
                          {String.fromCharCode(65 + index)}.
                        </span>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={selectedAnswer === null}
                                    className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                                        selectedAnswer !== null
                                            ? 'bg-green-500 hover:bg-green-600 transform hover:scale-105'
                                            : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                >
                                    {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-4 border-green-200">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h3>
                                <p className="text-2xl text-green-700 mb-2">
                                    Your Score: {score} out of {quizQuestions.length}
                                </p>
                                <p className="text-lg text-gray-600 mb-6">
                                    Accuracy: {Math.round((score / quizQuestions.length) * 100)}%
                                </p>

                                <div className="bg-white rounded-xl p-4 mb-6">
                                    {score === quizQuestions.length ? (
                                        <p className="text-green-600 font-semibold">Perfect score! Excellent work! 🏆</p>
                                    ) : score >= quizQuestions.length * 0.7 ? (
                                        <p className="text-blue-600 font-semibold">Great job! Keep learning! 🌟</p>
                                    ) : (
                                        <p className="text-orange-600 font-semibold">Good effort! Review and try again! 💪</p>
                                    )}
                                </div>

                                <button
                                    onClick={handleRestartQuiz}
                                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    Restart Quiz
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* API Integration Section */}
                <section className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-8 h-8 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        API Integration
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Random Programming Joke</h3>

                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                                    <span className="ml-3 text-gray-600">Loading joke...</span>
                                </div>
                            ) : error ? (
                                <div className="text-red-600 p-4 bg-red-100 rounded-lg mb-4">
                                    {error}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-6 shadow-md mb-6">
                                    <p className="text-lg text-gray-800 leading-relaxed">{joke}</p>
                                </div>
                            )}

                            <button
                                onClick={fetchJoke}
                                disabled={loading}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                            >
                                {loading ? 'Loading...' : 'Get Another Joke'}
                            </button>

                            <div className="mt-6 text-sm text-gray-500">
                                <p>Data fetched from Official Joke API • Real-time integration demonstration</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Advanced Web Development Skills</h3>
                        <p className="text-gray-300">
                            Responsive Design • Interactive JavaScript • API Integration
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-700 text-gray-400">
                            <p>© 2024 Web Development Demo • Built with React and Tailwind CSS</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;