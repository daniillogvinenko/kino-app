import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./components/userContext/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserContextProvider>
    </React.StrictMode>
);
