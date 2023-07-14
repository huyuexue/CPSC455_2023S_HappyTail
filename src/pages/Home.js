import PetsBrief from "../components/pets/PetsBrief";
import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import {detailViewStatus} from "../components/petDetail/petDetailSlice";
import ButtonBar from "../components/elements/buttons/ButtonBar";
import {updateStatus} from "../components/updatePet/updateFormSlice";
import UpdateForm from "../components/updatePet/UpdateFrom";
export default function Home({itemsList}){
    const detailViewIsOpen = useSelector(detailViewStatus)
    const updateIsOpen = useSelector(updateStatus)
    return (
        <div className="Home">

            <ButtonBar />
            <PetsBrief />
            {detailViewIsOpen && <PetDetail />}
            {updateIsOpen && <UpdateForm />}
        </div>
    );
}