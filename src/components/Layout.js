import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";
export default function Layout() {
    return (
        <div className="App">
            <NavBar />
            <Outlet/>
        </div>
    )
}