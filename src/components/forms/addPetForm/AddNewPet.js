import {useState} from "react";
import {useDispatch} from "react-redux";
import {addPet} from "../../pets/petsSlice";
import BasicSurvey from "./BasicSurvey";
import AboutYou from "./AboutYou";
import PetInfo from "./PetInfo";
import Preview from "./Preview";

export default function AddNewPet(){
/*    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [breed, setBreed] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [pictureUrl, setPictureUrl] = useState(null);
    const [description, setDescription] = useState('')
    const [warning, setWarning] = useState('')

    const onNameChanged = e => setName(e.target.value)
    const onSpeciesChanged = e => setSpecies(e.target.value)
    const onBreedChanged = e => setBreed(e.target.value)
    const onGenderChanged = e => setGender(e.target.value)
    const onAgeChanged = e => setAge(e.target.value)

    const onDescriptionChanged = e => setDescription(e.target.value)

    const dispatch = useDispatch();

    const onAddButtonClicked = () => {
        if (name && species.includes('-') && breed && gender.includes('-') && age && pictureUrl) {
            dispatch(addPet(name, species, breed, gender, age, pictureUrl, description));
            setName('')
            setSpecies('')
            setBreed('')
            setGender('')
            setAge('')
            setPictureUrl(null)
            setDescription('')
        } else {
            setWarning("Please fill in all required(*) filed!")
        }
    }

    const onClearButtonClicked = () => {
        setName('')
        setSpecies('')
        setBreed('')
        setGender('')
        setAge('')
        setPictureUrl(null)
        setDescription('')
        setWarning('')
    }

    return (
        <div className="form">
            <h2>Add New Pet for Adoption</h2>
            <form id="addNewPetFrom">
                <label>Pet Name*:</label><br/>
                <input type="text" name="petName" value = {name} onChange = {onNameChanged} /><br/>
                <label>Species*:</label><br/>
                <select value = {species} onChange = {onSpeciesChanged}>
                    <option >Please select</option>
                    <option >-Cat</option>
                    <option >-Dog</option>
                </select><br/>
                <label>Breed*:</label><br/>
                <input type="text" name="breed" value = {breed} onChange = {onBreedChanged} /><br/>
                <label>Gender*:</label><br/>
                <select value = {gender} onChange = {onGenderChanged}>
                    <option >Please select</option>
                    <option >-Male</option>
                    <option >-Female</option>
                </select><br/>
                <label>Age*:</label><br/>
                <input type="number" min="0" step="1" name="age" value = {age} onChange = {onAgeChanged} />
                <br/>
                <label>Picture*:</label><br/>
                <input type="file" name="pictureUrl" onChange = {onPictureChanged} />
                <br/>
                <label>Description:</label><br/>
                <textarea type="text" name="description" value = {description} onChange = {onDescriptionChanged} /><br/>
                <br/>
                <input type= "button"  className="addButton"  value = "Add" onClick={onAddButtonClicked} />
                <input type= "button" className="clearFrom" value = "Clear Form" onClick={onClearButtonClicked} />
                <br/>
                <p id="warning">{warning}</p>
            </form>
        </div>

    )*/
    const[curPage, setCurPage] = useState(0);
    const[formData, setFormData] = useState({
        species:'',
        extra: false,
        otherSpecies: 'Please specify',
        spayed: '',
        reason:'',
        length:'',
        email:'',
        firstName:'',
        lastName:'',
        phoneNumber:'',
        postalCode:'',
        city:'',
        province:'',
        petName:'',
        photo: null,
        characteristics:'',
        facts:'',
        petLocation: '',
        petStory:'',
        relatedDocs:'',
    });

    const nextPage = () => {
        setCurPage(curPage + 1);
    };

    const previousPage = () => {
        setCurPage(curPage - 1);
    };

    const jumpToPage = (page) => {
        setCurPage(page);
    };

    const finalPage = () => {
        setCurPage(3);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic with formData
        console.log(formData);
    };

    const setExtra = (e) =>{
        setFormData((prevData) => ({
            ...prevData,
            ["extra"]: e,
        }));
        if(e === false) {
            setFormData((prevData) => ({
                ...prevData,
                ["otherSpecies"]: 'Please specify',
            }));
        }
    }
    const onOtherSpeciesFocus = () => {
        setFormData((prevData) => ({
            ...prevData,
            ["otherSpecies"]: '',
        }));

    };

    const onPhotoChanged = (e) => {

        const file = e.target.files[0];
        console.log(file.type)
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataURL = event.target.result;
                setFormData((prevData) => ({
                    ...prevData,
                    ["photo"]: imageDataURL,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const renderFormPage = () => {
        switch (curPage) {
            case 0:
                return <BasicSurvey formData={formData} handleChange={handleChange} setExtra={setExtra} onOtherSpeciesFocus={onOtherSpeciesFocus}/>;
            case 1:
                return <AboutYou formData={formData} handleChange={handleChange} />;
            case 2:
                return <PetInfo formData={formData} handleChange={handleChange} onPhotoChanged={onPhotoChanged} />;
            case 3:
                return <Preview formData={formData} jumpToPage={jumpToPage}/>;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {renderFormPage()}
            {curPage > 0 && curPage < 3 &&(
                <button type="button" onClick={previousPage}>
                    Previous
                </button>
            )}
            {curPage < 3 && (
                <button type="button" onClick={nextPage}>
                    Next
                </button>
            )}
            {curPage < 3 && (
                <button type="button" onClick={finalPage}>
                    Finish
                </button>
            )}
            {curPage === 3 && (
                <button type="submit">
                    Submit
                </button>
            )}
        </form>
    );

}