import {useDispatch, useSelector} from "react-redux";
import {petsState} from "./petsSlice";
import {openDetailView, selectPet} from "../petDetail/petDetailSlice";

export default function PetsBrief() {
    const petsCurState = useSelector(petsState);
    const pets = petsCurState.list;
    const dispatch = useDispatch();

    return(
        <div>
            <h2>Pets Looking for A Forever Home</h2>
            <div className="petList" >
                {pets.map((pet) => (
                    <div className="pet" key={pet.id}
                         onClick={() => {
                             dispatch(selectPet(pet));
                             dispatch(openDetailView());
                         }}>
                        <div className="imageContainer">
                            <img src={pet.pictureUrl} alt="Not available" />
                        </div>
                        <h3>{pet.name}</h3>
                    </div>
                ))}
            </div>


        </div>
    )
}