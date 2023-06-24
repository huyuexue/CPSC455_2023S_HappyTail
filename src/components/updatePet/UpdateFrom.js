import {editItem, closeUpdateView, openUpdateView} from "./updateFormSlice";
import {useDispatch, useSelector} from "react-redux";

import { updatePet} from "../pets/petsSlice";
import {afterUpdate, openDetailView, selectedPet} from "../petDetail/petDetailSlice";
import {useState} from "react";

export default function UpdateForm(){
    const dispatch = useDispatch();
    const update = useSelector(editItem)

    const [phone, setPhone] = useState(update.phoneNumber)
    const [email, setEmail] = useState(update.email)


    const onPhoneChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    return (
        <aside className="popupWindow">
            <div className="detail">
                <img src={update.pictureUrl}/>
                <h3>Contact Information</h3>
                <label>Phone:</label>
                <input type="text" value = {phone} onChange = {onPhoneChanged} /><br/>
                <label>Email:</label>
                <input type="text" value = {email} onChange = {onEmailChanged} /><br/>

                <div className='btn-container'>
                    <button
                        className="updateButton"
                        onClick={ () => {
                            dispatch(updatePet(update.id,  phone, email));
                            dispatch(afterUpdate(phone, email));
                            dispatch(closeUpdateView());
                            dispatch(openDetailView());
                        } }>
                        Update
                    </button>
                    <button
                        className="cancelButton"
                        onClick={ () => {
                            dispatch(closeUpdateView());
                            dispatch(openDetailView());
                        } }>
                        Cancel
                    </button>
                </div>
            </div>
        </aside>
    )
}