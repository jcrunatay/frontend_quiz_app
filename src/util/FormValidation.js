// validationSchema.js
export const formValidation = {
    username: {
        required: "Username is required",
        minLength: {
            value: 8,
            message: "Username must be at least 8 characters long",
        },
        maxLength: {
            value: 50,
            message: "Username must not be longer than 50 characters",
        },
        pattern: {
            value: /^(?!.*\s)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]*$/,
            message: "Username must contain at least 1 special character and 1 number, No spaces!",
        },
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
        },
        maxLength: {
            value: 50,
            message: "Password must not be longer than 50 characters",
        },
        pattern: {
            value: /^(?=.*[!-~])(?=.*[0-9])[ -~]{6,}$/,
            message: "Password must contain at least 1 special character and 1 number",
        },
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
        },
    },
    confirmPassword: {
        required: "Please confirm your password",
        validate: (value, allValues) => value === allValues.password || "Passwords do not match",
    },
};
