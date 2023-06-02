import { Link } from "react-router-dom";
export default function NavBar(){
    return (
        <div className = "navBar">
            <ul className = "navLinks">
                <li><Link to="add">Add Item</Link></li>
                <li><Link to="/" id = "home">Home</Link></li>
                <li><Link to="about">About</Link></li>
            </ul>
        </div>
    );
}