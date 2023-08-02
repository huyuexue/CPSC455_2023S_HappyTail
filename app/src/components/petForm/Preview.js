import {capitalizeEachWord} from "../../utils";

export default function Preview({formData, jumpToPage, update}){
    const species_d = formData.extra? formData.otherSpecies:(formData.species === "Please specify"? "" : formData.species);
    const species = (species_d === "")?species_d : ("a " + species_d+".");
    const spayed = formData.spayed.charAt(0).toUpperCase() + formData.spayed.slice(1);
    return (
        <div className="from">
            <div>
                <h2>Basic Information</h2>
                <button type="button" onClick={() => jumpToPage(0)}>
                    Edit
                </button>
                <p>
                    <>
                        {update? '' :
                            <>
                                <span className="required-field" />I need to rehome {species}<br/>
                            </>
                        }
                    </>

                    <span className="required-field" />Photo: <br/>
                    {(formData.picture === '')?'' : <img className="previewPhoto" src = {formData.picture} />}<br/>
                    <span className="required-field" />Pet Name: {formData.petName}<br/>
                    <span className="required-field" />Breed: {formData.breed}<br/>
                    <span className="required-field" />Gender: {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}<br/>
                    <span className="required-field" />Age: {formData.ageYear} Year {formData.ageMonth} Month <br/>
                    <span className="required-field" />Size: {formData.size.charAt(0).toUpperCase() + formData.size.slice(1)} <br/>
                    <span className="required-field" />Altered: {spayed}<br/>
                    <span className="required-field" />House Trained: {formData.houseTrained.charAt(0).toUpperCase() + formData.houseTrained.slice(1)} <br/>
                </p>

            </div>
            <>
                <h2>Extra Information</h2>
                <button type="button" onClick={() => jumpToPage(1)}>
                    Edit
                </button>
                <p>
                    <span className="required-field" />Location: {formData.postCode}<br/>
                    <span className="required-field" />Fur Type: {formData.furType.charAt(0).toUpperCase() + formData.furType.slice(1)} <br/>
                    Pet Personality: {formData.petPersonality.length !== 0 ? formData.petPersonality.map(capitalizeEachWord).join(', ')  : 'N/A'}<br/>
                    Description: {formData.description? formData.description : 'N/A'}<br/>
                    Reason for rehoming: {formData.reason? formData.reason : 'N/A'}<br/>
                    Length of ownership: {formData.length? formData.length : 'N/A'}<br/>
                </p>
            </>
            <h2>Contact Information</h2>
                <button type="button" onClick={() => jumpToPage(2)}>
                    Edit
                </button>
                <p>
                    <span className="required-field" />Name: {formData.contactName}<br/>
                    <span className="required-field" />Email: {formData.contactEmail}<br/>
                    <span className="required-field" />Phone Number: {formData.contactNumber}<br/>
                    Additional Information: {formData.addInfo? formData.addInfo : 'N/A'}<br/>
                </p>
            <span className="required-field" style={{ fontStyle: 'italic', fontSize: '14px', color: 'grey' }}> Requires Fields.</span>
        </div>
    )

}