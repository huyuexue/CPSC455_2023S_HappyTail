import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
    const navigate = useNavigate();

    const[searchArea, setSearchArea] = useState("Search By Postal Code");
    const onSearchFocus = () => {
        setSearchArea('');
    }

    const click = () => {
        setSearchArea('');
    }

    const onSearchChange = (e) =>{
        setSearchArea(e.target.value);
    }

    const handleBlur = (e) => {
        if (e.target.value.trim() === ''){
            setSearchArea("Search By Postal Code");
        }
    }

    const onSearchCLicked = () => {
        navigate('/result');
    }

    return (
        <div>
            <input
                type="text"
                name = "searchArea"
                value ={searchArea}
                onChange = {onSearchChange}
                onFocus = {onSearchFocus}
                onBlur={handleBlur}

            />
            <button name="searchButton" onClick={onSearchCLicked}>Search</button>
        </div>
    )
}