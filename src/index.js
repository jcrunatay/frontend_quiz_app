import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Use conditional rendering based on the environment
if (process.env.NODE_ENV === "development") {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    root.render(<App />);
}
