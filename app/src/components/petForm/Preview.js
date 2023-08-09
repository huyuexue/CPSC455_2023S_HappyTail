import {capitalizeEachWord} from "../../utils";

export default function Preview({formData, jumpToPage, update}){
    const species_d = formData.extra? formData.otherSpecies:(formData.species === "Please specify"? "" : formData.species);
    const species = (species_d === "")?species_d : ("a " + species_d+".");
    const spayed = formData.spayed.charAt(0).toUpperCase() + formData.spayed.slice(1);
    return (
        <div className="from" style={{ border: "1px solid black", marginTop: '30px', marginBottom: '20px', paddingLeft: 100, borderRadius: '25px', borderColor: '#597133'}}>
            <div>
                <h2>Basic Information</h2>
                <button type="button" style={{borderRadius: 5, backgroundColor: '#bc6c25', padding: '10px', color: 'white'}} onClick={() => jumpToPage(0)}>
                    Edit
                </button>
                <p>
                    <>
                        {update? '' :
                            <>
                                <span className="required-field" style={{fontWeight: 'bold'}}>I need to rehome</span> &nbsp; {species}<br/>
                            </>
                        }
                    </>

                    <span className="required-field" style={{fontWeight: 'bold'}}>Photo</span> <br/>
                    {(formData.picture === '')?'' : <img className="previewPhoto" src = {formData.picture} />}<br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>Pet Name:</span> &nbsp; {formData.petName}<br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>Breed:</span> &nbsp; {formData.breed}<br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>Gender:</span> &nbsp; {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}<br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>Age:</span> &nbsp; {formData.ageYear} Year {formData.ageMonth} Month <br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>Size:</span> &nbsp; {formData.size.charAt(0).toUpperCase() + formData.size.slice(1)} <br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>Altered:</span> &nbsp; {spayed}<br/>
                    <span className="required-field" style={{fontWeight: 'bold'}}>House Trained:</span> &nbsp; {formData.houseTrained.charAt(0).toUpperCase() + formData.houseTrained.slice(1)} <br/>
                </p>

            </div>
            <>
                <h2>Extra Information</h2>
                <button type="button" style={{borderRadius: 5, backgroundColor: '#bc6c25', padding: '10px', color: 'white'}} onClick={() => jumpToPage(1)} >
                    Edit
                </button>
                <p>
                <span className="required-field" style={{fontWeight: 'bold'}}>Location:</span> &nbsp; {formData.postCode}<br/>
                <span className="required-field" style={{fontWeight: 'bold'}}>Fur Type:</span> &nbsp; {formData.furType.charAt(0).toUpperCase() + formData.furType.slice(1)} <br/>
                    <span style={{fontWeight: 'bold'}}>Pet Personality: </span> &nbsp; {formData.petPersonality.length !== 0 ? formData.petPersonality.map(capitalizeEachWord).join(', ')  : 'N/A'}<br/>
                    <span style={{fontWeight: 'bold'}}>Description:</span> &nbsp; {formData.description? formData.description : 'N/A'}<br/>
                    <span style={{fontWeight: 'bold'}}>Reason for rehoming:</span> &nbsp; {formData.reason? formData.reason : 'N/A'}<br/>
                    <span style={{fontWeight: 'bold'}}>Length of ownership:</span> &nbsp; {formData.length? formData.length : 'N/A'}<br/>
                </p>
            </>
            <h2>Contact Information</h2>
                <button type="button" style={{borderRadius: 5, backgroundColor: '#bc6c25', padding: '10px', color: 'white'}} onClick={() => jumpToPage(2)}>
                    Edit
                </button>
                <p>
                <span className="required-field" style={{fontWeight: 'bold'}}>Name: </span> &nbsp;{formData.contactName}<br/>
                <span className="required-field" style={{fontWeight: 'bold'}}>Email: </span> &nbsp;{formData.contactEmail}<br/>
                <span className="required-field" style={{fontWeight: 'bold'}}>Phone Number: </span> &nbsp;{formData.contactNumber}<br/>
                <span style={{fontWeight: 'bold'}}>Additional Information: </span> &nbsp;{formData.addInfo? formData.addInfo : 'N/A'}<br/>
                </p>
            <span className="required-field" style={{ fontStyle: 'italic', fontSize: '14px', color: 'grey' }}> Requires Fields.</span>
        </div>
    )

}