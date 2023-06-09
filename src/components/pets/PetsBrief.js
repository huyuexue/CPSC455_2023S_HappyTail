import {useDispatch, useSelector} from "react-redux";
import {petsState} from "./petsSlice";
import PetCard from "./PetCard";

export default function PetsBrief() {
    const petsCurState = useSelector(petsState);
    const pets = petsCurState.list;

    return(
        <div>
            <h2>Pets Looking for A Forever Home</h2>
            <div className="petList" >
                {pets.map((pet) => (
                    <PetCard pet={pet}></PetCard>
                ))}
            </div>


        </div>
    )
}