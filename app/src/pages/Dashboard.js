import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";
import PetsList from "../components/pets/PetsList";

export default function Dashboard({}){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    return (
        <div className="Dashboard">
            <PetsList />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}