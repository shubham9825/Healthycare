import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import Routing from "./Routing.jsx";
import { Toaster } from "react-hot-toast";
import "../Assets/style.css";
import store, { persistor } from "./Redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const element = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Routing />
                <Toaster position="top-right" />
            </Router>
        </PersistGate>
    </Provider>
);

const root = createRoot(document.getElementById("root"));
root.render(element);
