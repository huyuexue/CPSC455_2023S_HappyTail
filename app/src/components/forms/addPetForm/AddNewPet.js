import PetForm from "./PetForm";

export default function AddNewPet({}) {

    const formData= {
        // page 0
        species: '',
        picture: '',
        petName: '',
        breed: '',
        gender: '',
        ageYear: '',
        ageMonth: '',
        size: '',
        spayed: '',
        houseTrained: '',
        // page 1
        postCode: '',
        furType: '',
        petPersonality: [],
        description: '',
        reason: '',
        length: '',
        // page 2
        contactEmail: '',
        contactName: '',
        contactNumber: '',
        addInfo: '',
    };
    return (
        <PetForm originalData = {formData} update = {false}/>
    );
}