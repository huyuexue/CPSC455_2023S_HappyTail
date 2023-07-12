import {useNavigate} from "react-router-dom";

export default function RehomeButton(){
    const navigate = useNavigate();
    const onRehomeClicked = () => {
        navigate('/addNewPet');
    }
    return (
        <div id ="rehome" onClick={onRehomeClicked}>
            {/*<h3>I need to rehome my pet</h3>*/}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNrnjrIw6at92tYPeoB3Fn_fUj6PNniE_3w&usqp=CAU" alt="Not available"/>
        </div>
    )
}