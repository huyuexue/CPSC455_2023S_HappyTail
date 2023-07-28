export default function ContactInfo({ formData, handleChange}){
    return (
        <div className="from">
            <h2>Contact Information</h2>
            <label >Name:<br/>
                <input type="text" name = "contactName" value = {formData.contactName}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Email:<br/>
                <input type="text" name = "contactEmail" value = {formData.contactEmail}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Phone Number:<br/>
                <input type="text" name = "contactNumber" value = {formData.contactNumber}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
        </div>
    )
}