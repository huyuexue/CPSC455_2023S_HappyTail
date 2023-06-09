import AddNewPet from "../components/forms/AddNewPet";
import PetsBrief from "../components/pets/PetsBrief";
import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import {detailViewStatus} from "../components/petDetail/petDetailSlice";

export default function Home({itemsList}){
    const detailViewIsOpen = useSelector(detailViewStatus)
    return (
        <div className="Home">
            <AddNewPet />
            <PetsBrief />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}