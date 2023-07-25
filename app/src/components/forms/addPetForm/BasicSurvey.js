export default function BasicSurvey({ formData, handleChange, setExtra, onOtherSpeciesFocus}){

    const onSpeciesChanged = (e) => {
        handleChange(e);
        const selectSpecies = e.target.value;
        if (selectSpecies === "others") {
            setExtra(true);
        } else {
            setExtra(false);
        }
    }

    return (
        <div className="from">
            <h2>Basic Survey</h2>
            <label >1. I need to rehome
                <select name="species" value = {formData.species} onChange = {onSpeciesChanged}>
                    <option value = ''>-Please select-</option>
                    <option value = "cat">Cat</option>
                    <option value = "dog">Dog</option>
                    <option value = "others">Others</option>
                </select>
                {formData.extra && (
                    <input type="text" name = "otherSpecies" value = {formData.otherSpecies}
                           onChange = {handleChange}
                           onFocus = {onOtherSpeciesFocus}
                    />
                )}<br/>
            </label> <br/>

            <label>2. Is the pet altered?
                <select name="spayed" value = {formData.spayed} onChange = {handleChange}>
                    <option value = ''>-Please select-</option>
                    <option value = "yes">Yes</option>
                    <option value = "no">No</option>
                    <option value = "not_sure">Not Sure</option>
                </select><br/>
            </label><br/>

            <label>3. Why does the pet need to find a new home?<br/>
                <textarea type="text" name="reason"
                          value = {formData.reason} onChange = {handleChange} /><br/>
            </label><br/>

            <label>4. How long have you  own it?<br/>
                <input type="text" name="length"
                          value = {formData.length} onChange = {handleChange} /><br/>
            </label><br/>
        </div>
    )
}