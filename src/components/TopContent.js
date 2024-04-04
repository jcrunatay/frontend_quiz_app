import React from "react";
import SubjectChoiceContent from "./SubjectChoiceContent";

const Header = (props) => {
    const toggleCaretMenuClick = () => {
        props.setIsCaretMenuOpen((prev) => !prev);
    };

    function extractDate(dateString) {
        const dateParts = dateString.split(" ");
        return dateParts[0];
    }

    return (
        <div className="py-3">
            <div className="flex items-center justify-end">
                <div className="mr-auto flex items-center ">
                    {props.isQuizStarted && <SubjectChoiceContent topic={props.selectedTopic} />}
                </div>
                <div
                    className={`flex items-center ${
                        props.isQuizStarted ? "md:me-5" : "md:me-[5%]"
                    }  relative`}
                >
                    <img
                        className="h-5"
                        src={`./images/icon-sun-${props.isDarkMode ? "light" : "dark"}.svg`}
                        alt="icon-sun-dark"
                    />
                    <button
                        onClick={props.toggleDarkMode}
                        className="theme-switcher mx-1 outline-none border-none z-20"
                    >
                        <div
                            className={`w-8 bg-purple h-5 rounded-xl relative before:absolute before:content-[''] before:w-3 before:h-3 before:z-10 before:bg-white before:rounded-full before:top-2/4 before:-translate-y-2/4 before:transition-all before:duration-300 before:ease-out ${
                                props.isDarkMode ? "before:left-4" : "before:left-1"
                            }`}
                        ></div>
                    </button>
                    <img
                        className="h-5 me-10"
                        src={`./images/icon-moon-${props.isDarkMode ? "light" : "dark"}.svg`}
                        alt="icon-moon-dark"
                    />
                    {props.isUserLoggedIn && (
                        <button
                            id="caret-menu-button"
                            className=" z-50"
                            onClick={toggleCaretMenuClick}
                        >
                            <svg
                                className="pointer-events-none"
                                fill="currentColor"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="currentColor"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <g id="SVGRepo_iconCarrier">
                                    <path d="m0 6.4 12 12 12-12z" />
                                </g>
                            </svg>
                        </button>
                    )}
                    {props.isCaretMenuOpen && (
                        <div
                            id="caret-menu"
                            ref={props.caretMenuRef}
                            className="border absolute -right-[0.5%] top-[120%] z-50 bg-white text-dark-navy rounded-md shadow-md"
                        >
                            <ul>
                                <li className="px-5 py-2  text-nowrap">
                                    {props.currentUser.username}
                                </li>
                                <li className="px-5 py-2  text-nowrap">
                                    member since: {extractDate(props.currentUser.created_at)}
                                </li>
                                <li className="text-nowrap">
                                    <button
                                        className="outline-none  w-full py-2 px-5 text-left hover:bg-gray-300"
                                        onClick={() => {
                                            props.setIsUserLoggedIn(false);
                                            props.setIsCaretMenuOpen(false);
                                        }}
                                    >
                                        sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
