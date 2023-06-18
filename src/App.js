import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import BrowsePage from "./pages/Browse";

import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {GlobalTheme} from "./style/theme";
import AccountDetailsPage from "./pages/AccountDetails";


function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={GlobalTheme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="browse" element={<BrowsePage/>}/>
                        <Route path="account/details" element={<AccountDetailsPage/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
