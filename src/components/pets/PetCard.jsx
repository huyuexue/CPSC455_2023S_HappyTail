import {openDetailView, selectPet} from "../petDetail/petDetailSlice";
import {useDispatch} from "react-redux";

export default function PetCard(props) {
    const dispatch = useDispatch();

    return (
        <div className="pet" key={props.pet.id}
             onClick={() => {
                 dispatch(selectPet(props.pet));
                 dispatch(openDetailView());
             }}>
            <div className="imageContainer">
                <img src={props.pet.pictureUrl} alt="Not available"/>
            </div>
            <h3>{props.pet.name}</h3>
        </div>
    )
}