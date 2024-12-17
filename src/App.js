import React, { useEffect, useState, useRef } from "react";
import TopContent from "./components/TopContent";
import MainContent from "./components/Main";
import BackgroundImg from "./components/BackgroundImage";
import data from "./data.json";
import SignUpForm from "./components/SignUp";
import LoginForm from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const topics = data.quizzes.map((topic) => topic.title);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [category, setCategory] = useState({});
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isCurrentQuestionAnswerSubmitted, setIsCurrentQuestionAnswerSubmitted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [playerAnswer, setPlayerAnswer] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isCaretMenuOpen, setIsCaretMenuOpen] = useState(false);
    const caretMenuRef = useRef(null);

    const handleDocumentClick = (event) => {
        const caretMenuButton = document.getElementById("caret-menu-button");
        const caretMenu = document.getElementById("caret-menu");
        if (
            caretMenu &&
            caretMenuButton &&
            event.target !== caretMenuButton &&
            !caretMenu.contains(event.target)
        ) {
            setIsCaretMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [isCaretMenuOpen]);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    useEffect(() => {
        const getQuestionAndAnswerOptions = () => {
            const selectedCategory = data.quizzes.filter(
                (category) => category.title === selectedTopic
            );

            //put index 0 to remove the outer array [[a:b]] to make it just an array since i use filter
            setCategory(selectedCategory[0]);
        };
        getQuestionAndAnswerOptions();
    }, [selectedTopic]);

    // Click event handler to increment the count
    const goNextQuestion = () => {
        setCurrentQuestionNumber((prevCount) =>
            prevCount + 1 < category.questions.length ? prevCount + 1 : 0
        );

        //if it reaches the last question then set display result to true
        if (currentQuestionNumber + 1 === category.questions.length) {
            setShowResult(true);
        }

        setIsCurrentQuestionAnswerSubmitted(false);
        setShowAnswer(false);
        setPlayerAnswer("");
    };

    const startQuiz = () => {
        setIsQuizStarted(true);
    };

    const playAgainClickHandler = () => {
        setIsQuizStarted(false);
        setIsCurrentQuestionAnswerSubmitted(false);
        setShowAnswer(false);
        setPlayerAnswer("");
        setCurrentQuestionNumber(0);
        setSelectedTopic("");
        setCategory({});
        setShowResult(false);
    };

    return (
        <div className="px-6 font-rubik text-dark-navy  relative dark:text-white dark:bg-dark-navy min-h-screen">
            <div className="max-w-xl mx-auto md:max-w-none xl:max-w-7xl">
                <BackgroundImg isDarkMode={isDarkMode} />
                <TopContent
                    isQuizStarted={isQuizStarted}
                    setIsQuizStarted={setIsQuizStarted}
                    selectedTopic={selectedTopic}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    currentUser={currentUser}
                    setIsUserLoggedIn={setIsUserLoggedIn}
                    isUserLoggedIn={isUserLoggedIn}
                    isCaretMenuOpen={isCaretMenuOpen}
                    setIsCaretMenuOpen={setIsCaretMenuOpen}
                    caretMenuRef={caretMenuRef}
                />

                {isUserLoggedIn ? (
                    <MainContent
                        topics={topics}
                        startQuiz={startQuiz}
                        isQuizStarted={isQuizStarted}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                        category={category}
                        goNextQuestion={goNextQuestion}
                        currentQuestionNumber={currentQuestionNumber}
                        showResult={showResult}
                        setIsCurrentQuestionAnswerSubmitted={setIsCurrentQuestionAnswerSubmitted}
                        isCurrentQuestionAnswerSubmitted={isCurrentQuestionAnswerSubmitted}
                        playerAnswer={playerAnswer}
                        setPlayerAnswer={setPlayerAnswer}
                        showAnswer={showAnswer}
                        setShowAnswer={setShowAnswer}
                        playAgainClickHandler={playAgainClickHandler}
                        isDarkMode={isDarkMode}
                    />
                ) : (
                    <Router basename="/frontend_quiz_app">
                        <Routes>
                            <Route path="/signup" element={<SignUpForm />}></Route>
                            <Route
                                path="/login"
                                element={
                                    <LoginForm
                                        setIsUserLoggedIn={setIsUserLoggedIn}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/"
                                element={
                                    <LoginForm
                                        setIsUserLoggedIn={setIsUserLoggedIn}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            ></Route>
                        </Routes>
                    </Router>
                )}
            </div>
        </div>
    );
}

export default App;
