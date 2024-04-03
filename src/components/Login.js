import React, { useState } from "react";
import FormInput from "./FormTextInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const LogInForm = (props) => {
    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
        action: "getUserByUsername",
    });

    //input types that is going to be send as props
    const inputTypes = ["text", "password"];
    const inputLabels = ["Username", "Password"];
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    //Gather all form inputs
    let a = -1;
    const objKeys_withoutAction = Object.keys(inputValues).slice(0, -1);
    const formInputs = objKeys_withoutAction.map((input) => {
        ++a;
        return (
            <FormInput
                key={input}
                label={inputLabels[a]}
                type={inputTypes[a]}
                name={input}
                inputValues={inputValues}
                register={register ?? register}
                formType="loginForm"
                errors={errors[input]}
            />
        );
    });

    const onSubmit = async (data) => {
        const newFormInput = {
            ...data,
            action: "getUserByUsername",
        };

        const response = await axios.post("http://localhost/react/quiz_app/", newFormInput);

        if (response.data.status !== "success") {
            //set error that will be displayed if no user found

            setError("username", {
                type: "manual",
                message: response.data.message.username_message,
            });

            setError("password", {
                type: "manual",
                message: response.data.message.password_message,
            });

            return;
        }

        // Update inputValues state with the form data
        setInputValues((prev) => ({
            ...prev,
            ...data,
        }));

        props.setIsUserLoggedIn(true);
        props.setCurrentUser(response.data.user);
    };

    return (
        //absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
        <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden flex items-center justify-center flex-col gap-5 md:p-2 md:flex-row">
            <h1 className="text-[40px] leading-none mb-[40px] sm:text-[65px] md:text-5xl lg:text-[65px] hidden md:block ">
                Welcome to the <span className="font-medium lg:block">Frontend Quiz!</span>
            </h1>
            <div className="md:border border-navy w-screen h-screen px-5 py-10 min-w-80 flex flex-col justify-center md:max-w-lg sm:h-auto sm:py-20 sm:rounded  transition-all duration-500 ease-in-out dark:border-white">
                <h1 className="text-[40px] leading-none mb-[40px] sm:text-[65px] md:text-5xl lg:text-[65px] block md:hidden text-center">
                    Welcome to the <span className="font-medium block">Frontend Quiz!</span>
                </h1>
                <h2 className="text-center text-3xl mb-[10%]">Log In</h2>
                <form className="text-center px-5" onSubmit={handleSubmit(onSubmit)} method="GET">
                    {formInputs}
                    <button
                        type="submit"
                        className="bg-purple w-full py-4 rounded-lg mb-5 text-white md:text-xl"
                    >
                        Login
                    </button>
                    <p className="text-start">
                        Register to take the quiz.
                        <Link to="/signup" className="text-purple ms-2 underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogInForm;
