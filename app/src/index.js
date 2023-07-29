import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./components/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
function AppWithAuthProvider() {
    const [authLoaded, setAuthLoaded] = React.useState(false);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setAuthLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    return authLoaded ? (
        <AuthProvider>
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </Router>
            </Provider>
        </AuthProvider>
    ) : null;
}

root.render(
    <React.StrictMode>
        <AppWithAuthProvider />
    </React.StrictMode>
);
reportWebVitals();
