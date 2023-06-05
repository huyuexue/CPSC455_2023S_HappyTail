import AddNewPet from "./addNewPet/AddNewPet";
import PetsBrief from "./pets/PetsBrief";
import PetDetail from "./petDetail/PetDetail";
import {useSelector} from "react-redux";
import {detailViewStatus} from "./petDetail/petDetailSlice";

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