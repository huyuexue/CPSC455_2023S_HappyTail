export default function Preview({formData, jumpToPage}){
    const species_d = formData.extra? formData.otherSpecies:(formData.species === "Please specify"? "" : formData.species);
    const species = (species_d === "")?species_d : ("a " + species_d+".");
    const spayed = formData.spayed.charAt(0).toUpperCase() + formData.spayed.slice(1);

    const reader = new FileReader();
    return (
        <div className="from">
            <div>
                <h2>Basic Survey</h2>
                <button type="button" onClick={() => jumpToPage(0)}>
                    Edit
                </button>
                <p>
                    1. I need to rehome {species}<br/>
                    2. Is the pet spayed or neutered? {spayed}<br/>
                    3. Why does the pet need to find a new home? {formData.reason}<br/>
                    4. How long have you  own it? {formData.length}<br/>
                </p>

            </div>
            <h2>About You</h2>
                <button type="button" onClick={() => jumpToPage(1)}>
                    Edit
                </button>
                <p>
                    Email: {formData.email}<br/>
                    First Name: {formData.firstName}<br/>
                    Last Name: {formData.lastName}<br/>
                    Phone Number: {formData.phoneNumber}<br/>
                </p>
            <h2>Location</h2>
                <button type="button" onClick={() => jumpToPage(1)}>
                    Edit
                </button>
                <p>
                    Postal Code: {formData.postalCode}<br/>
                    City: {formData.city}<br/>
                    Province: {formData.province}<br/>
                </p>
            <h2>Pet Information</h2>
                <button type="button" onClick={() => jumpToPage(2)}>
                    Edit
                </button>
            <p>
                Pet Name: {formData.petName}<br/>
                Photo: <br/>
                <img className="previewPhoto" src = {formData.photo} />
            </p>

        </div>
    )

}