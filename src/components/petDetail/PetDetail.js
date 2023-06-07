import {selectedPet, closeDetailView} from "./petDetailSlice";
import {useDispatch, useSelector} from "react-redux";

export default function PetDetail(){
    const dispatch = useDispatch();
    const selected = useSelector(selectedPet)
    return (
            <aside className="popupWindow">
            <div className="detail">
                <img src={selected.pictureUrl} alt="Not available"/>
                <h3>{selected.name}</h3>
                <h4>Breed: {selected.breed}</h4>
                <h4>Gender: {selected.gender}</h4>
                <h4>Age: {selected.age}</h4>
                <h4>Description:</h4>
                <p>{selected.description}</p>
                <div className='btn-container'>
                    <button
                        className="close"
                        onClick={ () => {
                            dispatch(closeDetailView());
                        } }>
                        Return
                    </button>

                </div>
            </div>
        </aside>

    )
}