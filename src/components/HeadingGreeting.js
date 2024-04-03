import React from "react";

const HeadingGreeting = () => {
    return (
        <div className="pb-10 mt-5 md:w-[55%] md:mt-0 relative md:pt-0">
            <h1 className="text-[40px] leading-none mb-[40px] sm:text-[65px] md:text-5xl lg:text-[65px]">
                Welcome to the <span className="font-medium block">Frontend Quiz!</span>
            </h1>
            <p className="text-grey-navy">
                <i>Pick a subject to get started</i>
            </p>
        </div>
    );
};

export default HeadingGreeting;
