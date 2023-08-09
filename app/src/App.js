import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import About from "./pages/About";
import Layout from "./components/Layout";
import BrowsePage from "./pages/BrowsePage";
import AccountDetailsPage from "./pages/AccountDetails";
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import AddNewPet from "./pages/AddNewPet";
import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {GlobalTheme} from "./style/theme";
import UpdatePet from "./pages/UpdatePet";
import Profile from './pages/Profile';
import PetInfo from "./components/pets/PetInfo";


function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={GlobalTheme}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path="about" element={<About />}/>
                        <Route path="browse" element={<BrowsePage />}/>
                        <Route path="addNewPet" element={<AddNewPet />}/>
                        <Route path="account/details" element={<AccountDetailsPage />}/>
                        <Route path="login" element={<LoginPage />}/>
                        <Route path="signup" element={<SignUpPage />}/>
                        <Route path="dashboard" element={<Dashboard />}/>
                        <Route path="profile" element={<Profile />}/>
                        <Route path="updatePet" element={<UpdatePet />}/>
                        <Route path="pets/:id" element={<PetInfo />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
