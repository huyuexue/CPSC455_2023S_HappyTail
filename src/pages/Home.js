import PetsBrief from "../components/pets/PetsBrief";
import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import {detailViewStatus} from "../components/petDetail/petDetailSlice";
import ButtonBar from "../components/buttons/ButtonBar";
export default function Home({itemsList}){
    const detailViewIsOpen = useSelector(detailViewStatus)
    return (
        <div className="Home">

            <ButtonBar />
            <PetsBrief />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}