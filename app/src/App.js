import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import About from "./pages/About";
import Layout from "./components/Layout";
import BrowsePage from "./pages/BrowsePage";
import AccountDetailsPage from "./pages/AccountDetails";
import LoginPage from './pages/LoginPage';
import AddNewPet from "./pages/AddNewPet";
import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {GlobalTheme} from "./style/theme";
import UpdatePet from "./pages/UpdatePet";


function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={GlobalTheme}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="browse" element={<BrowsePage/>}/>
                        <Route path="addNewPet" element={<AddNewPet/>}/>
                        <Route path="account/details" element={<AccountDetailsPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="updatePet" element={<UpdatePet/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
