import {useSelector} from "react-redux";
import {capitalizeEachWord} from "../utils";
import PetForm from "../components/petForm/PetForm";

export default function UpdatePet(){
    const  pet = useSelector(state => state.user.selectItem);
    const updateData= {
        ...pet,
        breed: capitalizeEachWord(pet.breed),
        ageYear: Math.floor(pet.age / 12),
        ageMonth: pet.age % 12,
        houseTrained: pet.houseTrained ? "yes" : "no",
    };
    return(
        <PetForm originalData = {updateData} update = {true}/>
    )
}