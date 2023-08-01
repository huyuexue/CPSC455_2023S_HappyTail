export default function Preview({formData, jumpToPage}){
    const species_d = formData.extra? formData.otherSpecies:(formData.species === "Please specify"? "" : formData.species);
    const species = (species_d === "")?species_d : ("a " + species_d+".");
    const spayed = formData.spayed.charAt(0).toUpperCase() + formData.spayed.slice(1);

    const reader = new FileReader();
    return (
        <div className="from">
            <div>
                <h2>Basic Information</h2>
                <button type="button" onClick={() => jumpToPage(0)}>
                    Edit
                </button>
                <p>
                    I need to rehome {species}<br/>
                    Photo: <br/>
                    {(formData.picture === '')?'' : <img className="previewPhoto" src = {formData.picture} />}<br/>
                    <span style={{ color: 'red' }}>*</span>Pet Name: {formData.petName}<br/>
                    Breed: {formData.breed}<br/>
                    Gender: {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}<br/>
                    Age: {formData.ageYear} Year {formData.ageMonth} Month <br/>
                    Size: {formData.size.charAt(0).toUpperCase() + formData.size.slice(1)} <br/>
                    Altered: {spayed}<br/>
                    House Trained: {formData.houseTrained.charAt(0).toUpperCase() + formData.houseTrained.slice(1)} <br/>
                </p>

            </div>
            <>
                <h2>Extra Information</h2>
                <button type="button" onClick={() => jumpToPage(1)}>
                    Edit
                </button>
                <p>
                    Location: {formData.postCode}<br/>
                    Fur Type: {formData.furType.charAt(0).toUpperCase() + formData.furType.slice(1)} <br/>
                    Pet Personality: {formData.petPersonality.join(", ").toUpperCase()}<br/>
                    Description: {formData.description}<br/>
                    Reason for rehoming: {formData.reason}<br/>
                    Length of ownership: {formData.length}<br/>
                </p>
            </>
            <h2>Contact Information</h2>
                <button type="button" onClick={() => jumpToPage(2)}>
                    Edit
                </button>
                <p>
                    Name: {formData.contactName}<br/>
                    Email: {formData.contactEmail}<br/>
                    Phone Number: {formData.contactNumber}<br/>
                </p>



        </div>
    )

}