export default function PetInfo({formData, handleChange, onPhotoChanged}){
    return (
        <div className="from">
            <h2>Pet Information</h2>
            <label >Pet Name:<br/>
                <input type="text" name = "petName" value = {formData.petName}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Photo:<br/>
                <input type="file" name="photo" onChange = {onPhotoChanged} /><br/>
            </label> <br/>
        </div>
    )

}