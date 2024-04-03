import BoxOption from "./BoxOption";

const QuestionAnswersChoices = (props) => {
    let a = 0;

    const options = props.category?.questions[props?.currentQuestionNumber].options.map(
        (option) => {
            const letterChoices = ["A", "B", "C", "D"];
            let index = a;
            ++a;
            return (
                <BoxOption
                    playerAnswer={props.playerAnswer}
                    setPlayerAnswer={props.setPlayerAnswer}
                    key={option}
                    renderAsSubjectChoice={false}
                    optionValue={option}
                    letterChoice={letterChoices[index]}
                    showAnswer={props.showAnswer}
                    correctAnswer={props.correctAnswer}
                    isDarkMode={props.isDarkMode}
                />
            );
        }
    );

    return (
        <div className="md:w-[55%] md:px-5">
            {options}

            {!props.isCurrentQuestionAnswerSubmitted ? (
                <button
                    onClick={props.submitAnswerHandler}
                    className="h-[70px] bg-purple rounded-xl text-white text-lg  sm:text-xl w-full my-5 cursor-pointer"
                    type="button"
                    disabled={props.playerAnswer === ""}
                >
                    Submit Answer
                </button>
            ) : (
                <button
                    onClick={props.goNextQuestion}
                    className="h-[70px] bg-purple rounded-xl text-white text-lg  sm:text-xl w-full my-5 cursor-pointer"
                    type="button"
                >
                    {`${props.currentQuestionNumber === 9 ? "Submit Quiz" : "Next Question"}`}
                </button>
            )}
        </div>
    );
};

export default QuestionAnswersChoices;
