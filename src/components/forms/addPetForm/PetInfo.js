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
            <label >Breed:<br/>
                <input type="text" name = "breed" value = {formData.breed}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Gender:<br/>
                <input type="text" name = "gender" value = {formData.gender}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Age:<br/>
                <input type="text" name = "age" value = {formData.age}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
            <label >Description:<br/>
                <input type="text" name = "description" value = {formData.description}
                       onChange = {handleChange}
                /><br/>
            </label> <br/>
        </div>
    )

}