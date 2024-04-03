import React from "react";

const Question = (props) => {
    //number of questions
    const numberOfQuestions = props?.category?.questions.length;
    const currentQuestion = props?.currentQuestionNumber + 1;

    //get the percentage to use for tracker
    let percentage = (currentQuestion / numberOfQuestions) * 100;

    return (
        <div className="mt-8 md:w-[45%] md:mt-0 relative">
            <p className="text-light-bluish text-sm mb-2 sm:text-base">
                <i>
                    Question {props.currentQuestionNumber + 1} of {props.category?.questions.length}
                </i>
            </p>
            <p className="text-xl font-medium mb-6 sm:text-2xl">
                {props.category?.questions[props.currentQuestionNumber].question}
            </p>
            <div className="mb-8 border border-blue-300 bg-white w-full h-3 relative rounded-lg flex items-center px-[2px] md:absolute md:bottom-0 ">
                <div className="bg-purple h-2 rounded-lg" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default Question;
