import {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {addPetAsync, updateDetailAsync} from "../../redux/userPets/thunks";
import {useEffect} from "react";
import {Container} from "@mui/material";

const steps = ['Pet Info', 'Extra Info', 'Contact Info', 'Preview'];


export default function PetForm({originalData, update}) {
    const token = useSelector(state => state.login.token);
    const isLogin = useSelector(state => !state.login.value);
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate();

    const finishStatusLoading = useSelector(state => state.login.finishStatusLoading);
    const user = useSelector(state => state.login.user);

    useEffect(() => {
        if (finishStatusLoading) {
            if (!isLogin) {
                localStorage.setItem('prevURL', window.location.href);
                nav('/login');
            } else {
                setIsLoading(false);
            }
        }
    }, [isLogin, finishStatusLoading]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ... originalData
    });

    const [activeStep, setActiveStep] = useState(update? 3 : 0);
    const [completed, setCompleted] = useState(update? {0:true, 1:true, 2:true} : {});

    const generatePetInput = (formData) => {
        const petage = parseInt(formData.ageYear, 10) * 12 + parseInt(formData.ageMonth, 10);
        return {
            _id: formData._id, // Used only in the updatePet function
            petName: formData.petName,
            species: formData.species,
            breed: formData.breed,
            gender: formData.gender,
            age: petage,
            picture: formData.picture,
            description: formData.description,
            houseTrained: formData.houseTrained === 'yes' ? true : false,
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
            addInfo: formData.addInfo,
        };
    };
    const addPet = async () => {
        const input = generatePetInput(formData);
        dispatch(addPetAsync({ input, token }));
    };
    const updatePet = async () => {
        const input = generatePetInput(formData);
        await dispatch(updateDetailAsync({ pet: input, token }));
    };

    const checkFill = () => {
        if (activeStep === 0) {
            if (!formData.species || !formData.picture || !formData.petName || !formData.breed || !formData.gender ||
                !formData.ageYear || !formData.ageMonth || !formData.size || !formData.spayed || !formData.houseTrained) {
                handleNotComplete();
                return;
            }
        } else if (activeStep === 1) {
            if (!formData.furType || !formData.postCode) {
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
    const handleNext = () => {
        checkFill();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        } else if (e === "setPhoto") {
            setFormData((prevData) => ({
                ...prevData,
                picture: updatedFormData.picture,
            }));
        } else {
            const {name, value} = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        const values = Object.values(completed);
        const trueValues = values.filter((value) => value === true);
        if (trueValues.length === 3) {
            update? await updatePet() : await addPet();
            navigate('/dashboard');
        } else {
            alert('Please complete all required fields before submitting.');
        }
    };

    const onPostcodeFocus = () => {
        setFormData((prevData) => ({
            ...prevData,
            ["postcode"]: '',
        }));
    };

    const subForms = [
        <BasicInfo formData={formData} handleChange={handleChange} update={update}/>,
        <ExtraInfo formData={formData} handleChange={handleChange} onPostcodeFocus={onPostcodeFocus} update={update}/>,
        <ContactInfo formData={formData} handleChange={handleChange} update={update}/>,
        <Preview formData={formData} jumpToPage={jumpToPage} update={update}/>,
    ]

    return (
        isLoading ?
            <></> : (user.petOwner ?
                <Container>
                    <Box sx={{width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 5}}>
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
                                        <Button onClick={() => handleSubmit()} sx={{mr: 1}}>
                                            {activeStep === 3
                                                ? update? 'Update' : 'Submit'
                                                : ''}
                                        </Button>
                                        <Button onClick={() => nav('/dashboard')} sx={{mr: 1}}>
                                            {activeStep === 3 && update
                                                ?  'Cancel'
                                                : ''}
                                        </Button>
                                    </Box>
                                </Fragment>
                            </div>
                        </Box>
                    </Box>
                </Container> :
                <h2 className="account_warning">Please upgrade your account to access pet owner features!</h2>)
    );
}