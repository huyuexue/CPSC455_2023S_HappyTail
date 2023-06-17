import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import BrowsePage from "./pages/Browse";

import {StyledEngineProvider} from "@mui/material";


function App() {
    return (
        <StyledEngineProvider injectFirst>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="browse" element={<BrowsePage/>}/>
                </Route>
            </Routes>
        </StyledEngineProvider>
    );
}

export default App;
