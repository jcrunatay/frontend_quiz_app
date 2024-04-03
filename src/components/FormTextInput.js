import React, { useState } from "react";

const FormInput = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const errors = props?.errors;

    const handleFocus = (event) => {
        setIsExpanded(true);
    };

    const handleBlur = (event) => {
        if (event.target.value.trim() === "") {
            setIsExpanded(false);
        }
    };

    return (
        <div className="py-5 relative mb-1 text-xs sm:text-sm md:text-base flex flex-col">
            <label htmlFor={props.name} className="absolute top-0 left-0">
                {props.label}
            </label>
            {props?.formType === "loginForm" ? (
                <input
                    {...props.register(props.name, { required: `${props.label} is required` })}
                    type={props.type}
                    name={props.name}
                    className={`bg-transparent outline-none border-b-2 border-b-gray-400 mt-1 indent-[2px]`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            ) : (
                <input
                    {...props.register(props.name, props.validation)}
                    type={props.type}
                    name={props.name}
                    className={`bg-transparent outline-none border-b-2 border-b-gray-400 mt-1 indent-[2px]`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )}

            <div
                className={`h-[2px] -translate-y-[2px] self-center relative z-50 bg-purple transition-all duration-500 ease-in-out ${
                    isExpanded ? "w-full" : "w-0"
                }`}
            ></div>
            {errors && <p className="text-xs text-rose-600 text-left">{errors.message}</p>}
        </div>
    );
};

export default FormInput;
