import React, { useState, useEffect } from "react";

const AnswerContent = (props) => {
    const [choiceBg, setChoiceBg] = useState("bg-gray-300");

    useEffect(() => {
        if (props?.playerAnswer === props?.optionValue) {
            setChoiceBg("bg-purple text-white");
        } else {
            setChoiceBg("bg-gray-300 text-dark-navy ");
        }
    }, [props.playerAnswer, props.optionValue, props.isDarkMode]);

    return (
        <>
            <div className="w-max me-5 selection:backdrop:rounded-md">
                <div
                    className={`flex items-center p-1 justify-center rounded-md sm:h-[50px] sm:w-[50px] transition-all ease-out duration-300 ${choiceBg} `}
                >
                    <p className="text-lg min-h-[40px] min-w-[40px] flex items-center justify-center">
                        {props?.letterChoice}
                    </p>
                </div>
            </div>
            <p className="text-lg font-medium sm:text-[28px] ">{props?.optionValue}</p>
        </>
    );
};

export default AnswerContent;
