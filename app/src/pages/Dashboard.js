import PetDetail from "../components/pets/PetDetail";
import {useSelector} from "react-redux";
import PetsList from "../components/pets/PetsList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography,TextField, CircularProgress} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
export default function Dashboard({itemsList}){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    // const updateIsOpen = useSelector(updateStatus)
    const [userInfo, setUser]=useState("")
    const[refresh, setRefresh]=useState(false);
    const[loading, setLoading]=useState(false);
    const[inputOnly, setInputOnly]=useState(true);
    const[token, setToken]=useState("");
    const auth = getAuth();
    const nav = useNavigate();
    const dispatch = useDispatch()
    const token1 = useSelector(state => state.login.token);
    const isLogin = useSelector(state => state.login.value);

    const getToken=async (user)=>{
        const token= await user.getIdToken()
        console.log(token)
        setToken(token)
      }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            getToken(user)
          } else {
                nav("/")
          }
          });
      }, []);   
    

    useEffect(() => {
            getuserInfo()
            setRefresh(false)
      }, [token,refresh,loading]); 

    const getuserInfo=async (values)=>{
        if(token!=""){
        const res = await fetch("http://localhost:3001/users/info", {
          method: 'GET',
          headers: { 
                      'Content-Type': 'application/json',
                      authorization: token},
        });
        const data=await res.json();
        if(res.status!=200){
          console.log("fetch data failed") 
        }else{
          setUser(data.data)
          setLoading(true)
        }
        }
       }

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

        if(res.status!=200){
            console.log("update failed")
          
        }else{
          setInputOnly(true);
          setLoading(false);
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
      });



    return (
        <div className="Dashboard">
            <div>
                <Box sx={{maxWidth:"1200px", marginX:"auto", marginY:"50px"}}>
                    <h2>Profile</h2>
                    {
                        loading?(<>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={userInfo}
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
                                                <Box  sx={{width:"100%", display:"flex", justifyContent:"space-around"}}>
                                                    <Button type="submit" color="primary" variant="contained">
                                                        Update Profile
                                                    </Button>
                                                    <Button onClick={()=>{setInputOnly(true); setLoading(false) }} color="secondary" variant="contained">
                                                        Cancel Change
                                                    </Button>
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
            <PetsList />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}