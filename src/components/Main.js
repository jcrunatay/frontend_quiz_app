import React, { useState } from "react";
import HeadingGreeting from "./HeadingGreeting";
import SubjectChoices from "./SubjectChoices";
import QuestionAnswersChoices from "./QuestionAnswersChoices";
import Question from "./Question";
import Result from "./Result";

const MainContent = (props) => {
    const [currentScore, setCurrentScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const topicSelectionHandler = (selectedTopicValue) => {
        props.setSelectedTopic(selectedTopicValue);

        //set startQuiz to true
        props.startQuiz();
    };

    const submitAnswerHandler = () => {
        let answerForCurrentQuestion =
            props.category?.questions[props.currentQuestionNumber].answer;

        setCorrectAnswer(answerForCurrentQuestion);

        if (answerForCurrentQuestion === props.playerAnswer) {
            setCurrentScore((prev) => prev + 1);
        }

        props.setIsCurrentQuestionAnswerSubmitted(true);
        props.setShowAnswer(true);
    };

    return (
        <main>
            {!props.showResult ? (
                <div className="flex flex-col md:flex-row mt-4 md:mt-[10%] mx-auto">
                    {!props.isQuizStarted ? (
                        <>
                            <HeadingGreeting />
                            <SubjectChoices
                                topics={props.topics}
                                topicSelectionHandler={topicSelectionHandler}
                            />
                        </>
                    ) : (
                        <>
                            <Question
                                category={props.category}
                                currentQuestionNumber={props.currentQuestionNumber}
                            />
                            <QuestionAnswersChoices
                                submitAnswerHandler={submitAnswerHandler}
                                category={props.category}
                                currentQuestionNumber={props.currentQuestionNumber}
                                playerAnswer={props.playerAnswer}
                                setPlayerAnswer={props.setPlayerAnswer}
                                goNextQuestion={props.goNextQuestion}
                                isCurrentQuestionAnswerSubmitted={
                                    props.isCurrentQuestionAnswerSubmitted
                                }
                                showAnswer={props.showAnswer}
                                correctAnswer={correctAnswer}
                                isDarkMode={props.isDarkMode}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div>
                    <Result
                        topic={props.selectedTopic}
                        currentScore={currentScore}
                        category={props.category}
                        playAgainClickHandler={props.playAgainClickHandler}
                        currentQuestionNumber={props.currentQuestionNumber}
                    />
                </div>
            )}
        </main>
    );
};

export default MainContent;
