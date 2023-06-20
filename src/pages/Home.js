import AddNewPet from "../components/forms/addPetForm/AddNewPet";
import PetsBrief from "../components/pets/PetsBrief";
import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import {detailViewStatus} from "../components/petDetail/petDetailSlice";
import SearchBar from "../components/SerachBar";
import RehomeButton from "../components/RehomeButton";

export default function Home({itemsList}){
    const detailViewIsOpen = useSelector(detailViewStatus)
    return (
        <div className="Home">
            <SearchBar />
            <RehomeButton />
            <PetsBrief />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}