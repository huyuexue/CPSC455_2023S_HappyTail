import {closeUpdateView} from "../../redux/userPets/reducer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {openDetailView} from "../../redux/detail/reducer";
import BasicInfo from "../forms/addPetForm/BasicInfo";
import {capitalizeEachWord} from "../../utils";
import ExtraInfo from "../forms/addPetForm/ExtraInfo";
import ContactInfo from "../forms/addPetForm/ContactInfo";
import {updateDetailAsync} from "../../redux/userPets/thunks";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getDetailAsync} from "../../redux/detail/thunks";

export default function UpdateForm(){
    const dispatch = useDispatch();
    const  pet = useSelector(state => state.user.selectItem);

    const auth = getAuth();
    const[token, setToken]=useState("");

    const getToken=async (user)=>{
        const token= await user.getIdToken()
        setToken(token)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getToken(user)
            } else {
                // alert("login please")
            }
        });
    }, []);

    const [updateData, setUpdateData] = useState({
        ...pet,
        breed: capitalizeEachWord(pet.breed),
        ageYear: Math.floor(pet.age / 12),
        ageMonth: pet.age % 12,
        houseTrained: pet.houseTrained ? "yes" : "no",
    });




    const handleChange = (e, updatedFormData) => {
        if (e === "setPetPersonality") {
            setUpdateData((prevData) => ({
                ...prevData,
                petPersonality: updatedFormData.petPersonality,
            }));
        } else if (e === "setHouseTrained") {
            setUpdateData((prevData) => ({
                ...prevData,
                houseTrained: updatedFormData.houseTrained,
            }));
        }else if (e === "setPhoto") {
            setUpdateData((prevData) => ({
                ...prevData,
                picture: updatedFormData.picture,
            }));
        }
        else {
            const { name, value } = e.target;
            setUpdateData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleClickUpdate = async () => {
        const newData = {
            ...updateData,
            age: parseInt(updateData.ageYear, 10) * 12 + parseInt(updateData.ageMonth, 10),
            houseTrained: updateData.houseTrained === 'yes'? true: false,
        }
        try {
            await dispatch(updateDetailAsync({ pet: newData, token }));
            dispatch(getDetailAsync(pet._id));
            dispatch(closeUpdateView());
            dispatch(openDetailView());

        } catch (error) {
            console.error("Error updating pet details:", error);
        }
    };

    return (
        <aside className="popupWindow">
            <div className="detail">
                {currentPage === 1 && <BasicInfo formData = {updateData} handleChange = {handleChange} update = {true} />}
                {currentPage === 2 && (
                    <>
                        <ExtraInfo formData = {updateData} handleChange = {handleChange} />
                        <ContactInfo formData = {updateData} handleChange = {handleChange} />
                    </>
                    )}
                <div className='btn-container'>
                    {currentPage > 1 && (
                        <button className="prevButton" onClick={prevPage}>
                            Previous
                        </button>
                    )}
                    {currentPage < 2 && (
                        <button className="nextButton" onClick={nextPage}>
                            Next
                        </button>
                    )}
                    {(
                        <button
                            className="updateButton"
                            onClick={handleClickUpdate}
                        >
                            Update
                        </button>
                    )}
                    <button
                        className="cancelButton"
                        onClick={() => {
                            dispatch(closeUpdateView());
                            dispatch(openDetailView());
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </aside>
    )
}