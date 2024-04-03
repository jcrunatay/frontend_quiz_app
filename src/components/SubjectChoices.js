import React from "react";
import BoxOption from "./BoxOption";

const SubjectChoices = (props) => {
    const topics = props.topics.map((topic) => {
        return (
            <BoxOption
                key={topic}
                topic={topic}
                renderAsSubjectChoice={true}
                topicSelectionHandler={props.topicSelectionHandler}
            />
        );
    });

    return <div className="md:w-[45%] md:px-5 lg:px-[5%] ">{topics}</div>;
};

export default SubjectChoices;
