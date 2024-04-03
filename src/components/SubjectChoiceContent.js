import React from "react";

const SubjectChoiceContent = (props) => {
    let imgSrc = "";
    let bgColor = "";

    switch (props.topic) {
        case "HTML":
            imgSrc = "./images/icon-html.svg";
            bgColor = "bg-[#FFF1E9]";
            break;
        case "CSS":
            imgSrc = "./images/icon-css.svg";
            bgColor = "bg-[#E0FDEF]";
            break;
        case "JavaScript":
            imgSrc = "./images/icon-js.svg";
            bgColor = "bg-[#EBF0FF]";
            break;
        case "Accessibility":
            imgSrc = "./images/icon-accessibility.svg";
            bgColor = "bg-[#F6E7FF]";
            break;
        default:
            break;
    }

    return (
        <>
            <div className="w-max me-5 ">
                <div
                    className={`flex items-center p-1 justify-center rounded-md sm:h-[50px] sm:w-[50px] ${bgColor}`}
                >
                    <img src={`${imgSrc}`} alt="subject-icon" loading="lazy" />
                    {/* <p className="text-lg min-h-[40px] min-w-[40px] flex items-center justify-center">A</p> */}
                </div>
            </div>
            <p className="text-lg font-medium sm:text-[28px] ">{props.topic}</p>
        </>
    );
};

export default SubjectChoiceContent;
