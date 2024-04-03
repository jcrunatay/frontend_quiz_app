import React from "react";

const BackgroundImg = (props) => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden -z-10 opacity-95">
            <img
                className="relative -z-20 md:hidden min-w-full min-h-screen"
                src={`./images/pattern-background-mobile-${
                    props.isDarkMode ? "dark" : "light"
                }.svg`}
                alt="pattern-background-mobile-light"
            />
            <img
                className="relative -z-20 md:block lg:hidden"
                src={`./images/pattern-background-tablet-${
                    props.isDarkMode ? "dark" : "light"
                }.svg`}
                alt="pattern-background-mobile-light"
            />
            <img
                className="relative -z-20 hidden lg:block min-w-full min-h-screen"
                src={`./images/pattern-background-desktop-${
                    props.isDarkMode ? "dark" : "light"
                }.svg`}
                alt="pattern-background-mobile-light"
            />
        </div>
    );
};

export default BackgroundImg;
