import React from "react";
import SubjectChoiceContent from "./SubjectChoiceContent";

const Result = (props) => {
    return (
        <div className="py-5 flex flex-col md:flex-row md:mt-[10%]">
            <div className="md:w-1/2">
                <h2 className="font-extralight text-[40px] leading-none mb-10 sm:text-[65px] md:text-[50px]">
                    Quiz completed <span className="font-medium block">You Scored...</span>
                </h2>
            </div>
            <div className="md:w-1/2">
                <div
                    className="bg-white flex flex-col items-center justify-center py-10 rounded-xl mb-5 dark:bg-navy "
                    style={{ boxShadow: "0 0 25px 1px rgba(0,0,0,0.2)" }}
                >
                    <div className="flex items-center justify-center">
                        <SubjectChoiceContent topic={props?.topic} category={props.category} />
                    </div>
                    <p className="text-center">
                        <span className="font-bold text-[80px] sm:text-[140px]">
                            {props.currentScore}
                        </span>
                        <span className="text-grey-navy block dark:text-white">out of 10</span>
                    </p>
                </div>
                <button
                    onClick={props.playAgainClickHandler}
                    className="h-[70px] bg-purple rounded-xl text-white text-lg  sm:text-xl w-full"
                    type="button"
                >
                    {" "}
                    Play Again{" "}
                </button>
            </div>
        </div>
    );
};

export default Result;
