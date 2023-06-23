export default function AboutYou({ formData, handleChange}){
    return (
        <div className="from">
            <h2>About You</h2>
            <label >Email:<br/>
                <input type="text" name = "email" value = {formData.email}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>

            <label >First Name:<br/>
                <input type="text" name = "firstName" value = {formData.firstName}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Last Name:<br/>
                <input type="text" name = "lastName" value = {formData.lastName}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Phone Number:<br/>
                <input type="text" name = "phoneNumber" value = {formData.phoneNumber}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>

            <h2>Location</h2>
            <label >Postal Code:<br/>
                <input type="text" name = "postalCode" value = {formData.postalCode}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>

            <label >City:<br/>
                <input type="text" name = "city" value = {formData.city}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Province:<br/>
                <input type="text" name = "province" value = {formData.province}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
        </div>
    )
}