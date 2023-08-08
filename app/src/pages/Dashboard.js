import PetDetail from "../components/pets/PetDetail";
import {useSelector} from "react-redux";
import PetsList from "../components/pets/PetsList";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";

export default function Dashboard(){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const nav = useNavigate();
    const isLogin = useSelector(state => !state.login.value);
    const finishStatusLoading = useSelector(state => state.login.finishStatusLoading);

    useEffect(() => {
        if (finishStatusLoading) {
            if (!isLogin) {
                nav("/login");
            }
        }
      }, [isLogin, finishStatusLoading, nav]);

    return (
        <div className="Dashboard">
            <PetsList />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}