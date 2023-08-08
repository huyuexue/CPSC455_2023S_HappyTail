
import {useSelector} from "react-redux";
import { Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,TextField, CircularProgress} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, } from "react";


export default function Profile(){
    const[inputOnly, setInputOnly]=useState(true);
    const token = useSelector(state => state.login.token);
    const loading = useSelector(state => state.login.isLoading);
    const user = useSelector(state => state.login.user);

    const userupdate=async (values)=>{
        console.log( "input is ", values)

        const res = await fetch("http://localhost:3001/users/update/info", {
          method: 'POST',
          headers: { 
                      'Content-Type': 'application/json',
                      authorization: token},
          body: JSON.stringify(values)
        });
        const data=await res.json();
        console.log(data)

        if(res.status !== 200){
            console.log("update failed")
          
        }else{
          setInputOnly(true);
        //   setLoading(false);
        }
       }



    const handleFormSubmit = (values) => {
        console.log(values)
        userupdate(values)
      };
    const checkoutSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        number: yup
          .string()
          .required("required"),
        address: yup.string().required("required"),
        city: yup.string().required("required"),
        postCode: yup.string().required("required"),
        petfinder: yup.boolean()
      });



    return (
        <div className="Dashboard">
            <div>
                <Box sx={{maxWidth:"1200px", marginX:"auto", marginY:"50px"}}>
                    <h2>Profile</h2>
                    {
                        !loading?(<>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={user}
                                validationSchema={checkoutSchema}
                            >
                                {({values, errors, touched, handleChange, handleSubmit,}) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            display="grid"
                                            gap="30px"
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        >
                                            <TextField
                                                fullWidth
                                                id="outlined-read-only-input"
                                                type="text"
                                                label="First Name"
                                                onChange={handleChange}
                                                value={values.firstName}
                                                InputLabelProps={{ shrink: true }}
                                                name="firstName"
                                                error={!!touched.firstName && !!errors.firstName}
                                                sx={{ gridColumn: "span 2" }}
                                                InputProps={{readOnly: inputOnly,}}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="text"
                                                label="Last Name"
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                name="lastName"
                                                error={!!touched.lastName && !!errors.lastName}
                                                sx={{ gridColumn: "span 2" }}
                                                InputProps={{
                                                    readOnly: inputOnly,
                                                  }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="text"
                                                label="Contact Number"
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                value={values.number}
                                                name="number"
                                                error={!!touched.number && !!errors.number}
                                                sx={{ gridColumn: "span 4" }}
                                                InputProps={{
                                                    readOnly: inputOnly,
                                                  }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="text"
                                                label="Address"
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                value={ values.address}
                                                name="address"
                                                error={!!touched.address && !!errors.address}
                                                sx={{ gridColumn: "span 4" }}
                                                InputProps={{
                                                    readOnly: inputOnly,
                                                  }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="text"
                                                label="City"
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                value={ values.city}
                                                name="city"
                                                error={!!touched.city && !!errors.city}
                                                sx={{ gridColumn: "span 2" }}
                                                InputProps={{
                                                    readOnly: inputOnly,
                                                  }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="text"
                                                label="postCode"
                                                onChange={handleChange}
                                                InputLabelProps={{ shrink: true }}
                                                value={ values.postCode}
                                                name="postCode"
                                                error={!!touched.postCode && !!errors.postCode}
                                                sx={{ gridColumn: "span 2" }}
                                                InputProps={{
                                                    readOnly: inputOnly,
                                                  }}
                                            />
                                        </Box>

                                        <Box display="flex" justifyContent="end" mt="20px">
                                            {inputOnly?(<>
                                                <Button onClick={()=>setInputOnly(false)} color="primary" variant="contained">
                                                    Edit Profile
                                                </Button>
                                            </>):(
                                                <Box  sx={{width:"100%", display:"flex", justifyContent:"space-around", flexDirection:"column"}}>
                                                <FormControl sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginY:3}}>
                                                <FormLabel  sx={{fontSize:22, fontWeight:"500", marginY:3}} >Are you a pet finder or your pet looking for home?</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        name="petFinder"
                                                        value={values.petFinder}
                                                        onChange={handleChange}
                                                        sx={{ display:"flex", justifyContent:"space-around", alignItems:"center",  width:"100%"}}
                                                    >
                                                        <FormControlLabel value={false} control={<Radio />} label="my pet looking for a home"  />
                                                        <FormControlLabel value={true} control={<Radio />} label="I want to adopt a pet" />
                                                    </RadioGroup>
                                                </FormControl>                                                  

                                                <Box  sx={{width:"100%", display:"flex", justifyContent:"space-around"}}>
                                                    <Button type="submit" color="primary" variant="contained">
                                                        Update Profile
                                                    </Button>
                                                    <Button onClick={()=>{setInputOnly(true)}} color="secondary" variant="contained">
                                                        Cancel Change
                                                    </Button>
                                                </Box>
                                                </Box>
                                            )}
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </>):(<Box
                            sx={{width:"100%", display:"flex", justifyContent:"center"}}
                        ><CircularProgress /></Box>)
                    }
                </Box>
            </div>
        </div>
    );
}