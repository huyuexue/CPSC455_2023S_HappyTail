import {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import {addPet} from "../../pets/petsSlice";
import BasicSurvey from "./BasicSurvey";
import AboutYou from "./AboutYou";
import PetInfo from "./PetInfo";
import Preview from "./Preview";
import Stepper from "@mui/material/Stepper";
import InterestsForm from "../InterestsForm";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const steps = ['Basic Survey', 'About You', 'Pet Info', 'Preview'];


export default function AddNewPet(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        breed: '',
        gender: '',
        age: '',
        description: '',
/*        characteristics:'',
        facts:'',
        petLocation: '',
        petStory:'',
        relatedDocs:'',*/
    });

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const handleNext = () => {
        checkFill();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const checkFill = () => {
        if (activeStep === 0) {
            if(formData.extra === false ){
                if(formData.species === '') {
                    return;
                }
            }else {
                if( !formData.otherSpecies || formData.otherSpecies === 'Please specify'){
                    return;
                }
            };
            if(!formData.spayed || !formData.reason || !formData.length){
                return;
            }
        } else if (activeStep === 1) {
            if (!formData.email || !formData.firstName || !formData.lastName || !formData.phoneNumber ||
                !formData.postalCode || !formData.city || !formData.province) {
                return;
            }
        } else if (activeStep === 2) {
            if (!formData.petName || !formData.breed || !formData.gender || !formData.age ||
                !formData.description || !formData.photo) {
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

    const jumpToPage = (page) => {
        setActiveStep(page);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (Object.keys(completed).length !== 3) {
            return;
        }
        dispatch(addPet({
            spayed: formData.spayed,
            reason: formData.reason,
            length: formData.length,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            postalCode: formData.postalCode,
            city: formData.city,
            province: formData.province,
            name: formData.petName,
            species: (formData.extra === true) ? formData.otherSpecies : formData.species,
            breed: formData.breed,
            gender: formData.gender,
            age: formData.age,
            pictureUrl: formData.photo,
            description: formData.description,
        }));
        navigate('/');
    }

    const setExtra = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            ["extra"]: e,
        }));
        if (e === false) {
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

    const subForms = [
        <BasicSurvey formData={formData} handleChange={handleChange} setExtra={setExtra}
                     onOtherSpeciesFocus={onOtherSpeciesFocus}/>,
        <AboutYou formData={formData} handleChange={handleChange}/>,
        <PetInfo formData={formData} handleChange={handleChange} onPhotoChanged={onPhotoChanged}/>,
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
                        <Button disabled={activeStep !== 3} onClick={handleSubmit} sx={{mr: 1}}>
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