import {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import ExtraInfo from "./ExtraInfo";
import Preview from "./Preview";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {addPetAsync} from "../../../redux/userPets/thunks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react";

const steps = ['Pet Info', 'Extra Info', 'Contact Info', 'Preview'];


export default function AddNewPet({}){
    const auth = getAuth();
    const nav = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (user) {

        } else {
               nav('/login')
        }
        });
    const dispatch = useDispatch();
    const navigate = useNavigate();
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



    const[formData, setFormData] = useState({
        // page 0
        species:'',
        picture: '',
        petName:'',
        breed: '',
        gender: '',
        ageYear: '',
        ageMonth: '',
        size: '',
        spayed: '',
        houseTrained: '',
        // page 1
        postCode: 'Please enter post code',
        furType: '',
        petPersonality: [],
        description: '',
        reason:'', //TODO: delete or add to schema?
        length:'', //TODO: delete or add to schema?
        // page 2
        contactEmail:'',
        contactName:'',
        contactNumber:'',
    });


    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const addPet = async () => {
        const petage = parseInt(formData.ageYear, 10) * 12 + parseInt(formData.ageMonth, 10);
        let input = {
            petName: formData.petName,
            species: formData.species,
            breed: formData.breed,
            gender: formData.gender,
            age: petage,
            picture: formData.picture,
            description: formData.description,
            houseTrained: true,
            furType: formData.furType,
            size: formData.size,
            petPersonality: formData.petPersonality,
            spayed: formData.spayed,
            postCode: formData.postCode,
            reason: formData.reason,
            length: formData.length,
            contactEmail: formData.contactEmail,
            contactName: formData.contactName,
            contactNumber: formData.contactNumber,
        }
        dispatch(addPetAsync({input, token}));
    };


    const handleNext = () => {
        checkFill();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const checkFill = () => {
        if (activeStep === 0) {
            if (!formData.species || !formData.picture || !formData.petName || !formData.breed || !formData.gender ||
                !formData.ageYear ||! formData.ageMonth || !formData.size || !formData.spayed || !formData.houseTrained){
                handleNotComplete();
                return;
            }
        } else if (activeStep === 1) {
            if (!formData.furType || !formData.reason || !formData.length || !formData.postCode ||
                !formData.description || formData.petPersonality.length === 0) {
                handleNotComplete();
                return;
            }
        } else if (activeStep === 2) {
            if (!formData.contactEmail || !formData.contactName || !formData.contactNumber) {
                handleNotComplete();
                return;
            }
        } else {
            return;
        }
        handleComplete();
    }

    const handleBack = () => {
        checkFill();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        checkFill();
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
    };

    const handleNotComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = false;
        setCompleted(newCompleted);
    };

    const jumpToPage = (page) => {
        setActiveStep(page);
    };

    const handleChange = (e, updatedFormData) => {
        if (e === "setPetPersonality") {
            setFormData((prevData) => ({
                ...prevData,
                petPersonality: updatedFormData.petPersonality,
            }));
        } else if (e === "setHouseTrained") {
            setFormData((prevData) => ({
                ...prevData,
                houseTrained: updatedFormData.houseTrained,
            }));
        }else if (e === "setPhoto") {
            setFormData((prevData) => ({
                ...prevData,
                picture: updatedFormData.picture,
            }));
        }
        else {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async() => {
        const values = Object.values(completed);
        const trueValues = values.filter((value) => value === true);
        if (trueValues.length === 3) {
            addPet();
            navigate('/dashboard');
        }
    };

    const onPostcodeFocus = () => {
        setFormData((prevData) => ({
            ...prevData,
            ["postcode"]: '',
        }));

    };

    const subForms = [
        <BasicInfo formData={formData} handleChange={handleChange} />,
        <ExtraInfo formData={formData} handleChange={handleChange} onPostcodeFocus={onPostcodeFocus}/>,
        <ContactInfo formData={formData} handleChange={handleChange}/>,
        <Preview formData={formData} jumpToPage={jumpToPage}/>,
    ]

    return (
        <Box sx={{width: '100%'}}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Fragment>
                    {subForms[activeStep]}
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}>
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button disabled={activeStep === 3} onClick={handleNext} sx={{mr: 1}}>
                            Next
                        </Button>

                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button  onClick={()=>handleSubmit()} sx={{mr: 1}}>
                            {activeStep === 3
                                ? 'Submit'
                                : ''}
                        </Button>
                    </Box>
                </Fragment>
            </div>
        </Box>
    );
}