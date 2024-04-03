import React from "react";
import SubjectChoiceContent from "./SubjectChoiceContent";
import AnswerContent from "./AnswerContent";

const BoxOption = (props) => {
    const correctBorder =
        props.correctAnswer === props.optionValue
            ? "border border-emerald-500"
            : "border border-rose-500";

    return (
        <button
            onClick={function () {
                props.topicSelectionHandler?.(props.topic);
                props.setPlayerAnswer?.(props.optionValue);
            }}
            className={`group cursor-pointer bg-white flex p-3 items-center justify-start mb-4 rounded-3xl outline-none w-full h-[80px] sm:h-[100px] lg:hover:scale-105  transition-all ease-out duration-300 ${
                props.showAnswer ? "pointer-events-none" : ""
            } ${props.showAnswer ? correctBorder : ""} dark:bg-navy`}
            style={{ boxShadow: "0 0 25px 1px rgba(0,0,0,0.2)" }}
        >
            {props.renderAsSubjectChoice ? (
                <SubjectChoiceContent topic={props.topic} />
            ) : (
                <AnswerContent
                    optionValue={props.optionValue}
                    letterChoice={props.letterChoice}
                    playerAnswer={props.playerAnswer}
                />
            )}
        </button>
    );
};
export default BoxOption;
