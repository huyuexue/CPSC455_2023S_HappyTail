
import {useDispatch, useSelector} from "react-redux";
import {openUpdateView, update} from "../updatePet/updateFormSlice";
import {deletePetAsync} from "../../redux/pets/thunks";
import {closeDetailView} from "../../redux/detail/reducer";

export default function PetDetail(){
    const dispatch = useDispatch();
    const selected = useSelector(state => state.petDetail.selectItem)
    return (
            <aside className="popupWindow">
            <div className="detail">
                <img src={selected.picture} alt="Not available"/>
                <h3>{selected.petName}</h3>
                <p>Breed: {selected.breed}</p>
                <p>Gender: {selected.gender}</p>
                <p>Age: {Math.floor(selected.age/12) + " Year " + selected.age%12 + " Month"}</p>
                <p>Description:{selected.description}</p>
                <div className="horizontalLine"></div>
                <h3>Contact Information</h3>
                <p>Name: {selected.firstName}</p>
                <p>Phone Number: {selected.phoneNumber}</p>
                <p>Email: {selected.email}</p>
                <div className='btn-container'>
                    <button
                        className="updateItemButton"
                        onClick={ () => {
                            dispatch(update(selected));
                            dispatch(openUpdateView());
                            dispatch(closeDetailView());
                        } }>
                        Update
                    </button>
                    <button
                        className="deleteItemButton"
                        onClick={ () => {
                            dispatch(deletePetAsync(selected._id));
                            dispatch(closeDetailView());
                        } }>
                        Delete
                    </button>
                    <button
                        className="close"
                        onClick={ () => {
                            dispatch(closeDetailView());
                        } }>
                        Close
                    </button>

                </div>
            </div>
        </aside>

    )
}