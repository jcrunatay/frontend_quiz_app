import React, { useState } from "react";
import FormInput from "./FormTextInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formValidation } from "../util/FormValidation";

const SignUpForm = () => {
    const [successfulRegistrationMsg, setsuccessfulRegistrationMsg] = useState("");
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        action: "addUser",
    });

    //input types that is going to be send as props
    const inputTypes = ["text", "password", "password", "text"];
    const inputLabels = ["Username", "Password", "Confirm Password", "Email"];

    //validation that is going to be send according to order
    const validations = [
        formValidation.username,
        formValidation.password,
        formValidation.confirmPassword,
        formValidation.email,
    ];

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
                validation={validations[a]}
                register={register ?? register}
                errors={errors[input]}
            />
        );
    });

    const onSubmit = async (data) => {
        const newFormInput = {
            ...data,
            action: "addUser",
        };

        // Make POST request using axios
        try {
            const response = await axios.post("http://localhost/react/quiz_app/", newFormInput);
            if (response.data.username_duplicate) {
                setError("username", {
                    type: "manual",
                    message: response.data.message.username_err_msg,
                });
            }

            if (response.data.email_duplicate) {
                setError("email", {
                    type: "manual",
                    message: response.data.message.email_err_msg,
                });
                return;
            }
            // Update inputValues state with the form data
            setInputValues((prev) => ({
                ...prev,
                ...data,
            }));

            setsuccessfulRegistrationMsg(response.data.message.successful_msg);

            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        //absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
        <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden flex items-center justify-center flex-col gap-5 md:p-2 md:flex-row">
            <h1 className="text-[40px] leading-none mb-[40px] sm:text-[65px] md:text-5xl lg:text-[65px] hidden md:block ">
                Welcome to the <span className="font-medium lg:block">Frontend Quiz!</span>
            </h1>
            <div className="md:border border-navy w-screen h-screen px-5 py-10 min-w-80 flex flex-col justify-center md:max-w-lg sm:h-auto sm:py-20 sm:rounded transition-all duration-500 ease-in-out dark:border-white">
                <h1 className="text-[40px] leading-none mb-[40px] sm:text-[65px] md:text-5xl lg:text-[65px] block md:hidden text-center">
                    Welcome to the <span className="font-medium block">Frontend Quiz!</span>
                </h1>
                <h2 className="text-center text-3xl mb-[10%]">Sign Up </h2>
                <form className="text-center px-5" onSubmit={handleSubmit(onSubmit)}>
                    {formInputs}
                    {successfulRegistrationMsg && (
                        <p className="py-2 mb-5 w-full border text-xs sm:text-sm md:text-base bg-lime-700 text-white rounded-md">
                            {successfulRegistrationMsg}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="bg-purple w-full py-4 rounded-lg mb-5 text-white md:text-xl"
                    >
                        Submit
                    </button>
                    <p className="text-start">
                        Already have an account ?
                        <Link to="/login" className="text-purple ms-2 underline">
                            Login Now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
