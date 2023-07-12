import {selectedPet, closeDetailView} from "./petDetailSlice";
import {useDispatch, useSelector} from "react-redux";
import {deletePet} from "../pets/petsSlice";
import {openUpdateView, update} from "../updatePet/updateFormSlice";

export default function PetDetail(){
    const dispatch = useDispatch();
    const selected = useSelector(selectedPet)
    return (
            <aside className="popupWindow">
            <div className="detail">
                <img src={selected.pictureUrl} alt="Not available"/>
                <h3>{selected.name}</h3>
                <p>Breed: {selected.breed}</p>
                <p>Gender: {selected.gender}</p>
                <p>Age: {selected.age}</p>
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
                            dispatch(deletePet(selected.id));
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