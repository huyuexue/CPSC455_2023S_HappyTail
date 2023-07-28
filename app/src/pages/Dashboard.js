import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";

import {updateStatus} from "../components/updatePet/updateFormSlice";
import UpdateForm from "../components/updatePet/UpdateFrom";
import PetsList from "../components/pets/PetsList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography,TextField} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect} from "react";
export default function Dashboard({itemsList}){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const updateIsOpen = useSelector(updateStatus)
    const [userInfo, setUser]=useState("")
    const[refresh, setRefresh]=useState(false);
    const[token, setToken]=useState("");
    const auth = getAuth();
    const nav = useNavigate();

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
      }, [token,refresh]); 

    const getuserInfo=async ()=>{
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
            console.log(data.data[0])
          setUser(data.data[0])
          console.log(userInfo)
        }
        }
       }



    const handleFormSubmit = (values) => {
        console.log(values);
      };
    const checkoutSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        contact: yup
          .string()
          .required("required"),
        address: yup.string().required("required"),
        city: yup.string().required("required"),
        postCode: yup.string().required("required"),
      });
      const initialValues = {
        firstName:  userInfo.firstName,
        lastName: userInfo.lastName,
      };


    return (
        <div className="Dashboard">
            <div>
            <Box sx={{maxWidth:"1200px", marginX:"auto", marginY:"50px"}}>
            <h2>Profile</h2>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    }) => (
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
                            value={userInfo.firstName}
                            InputLabelProps={{ shrink: true }}
                            name="firstName"
                            error={!!touched.firstName && !!errors.firstName}
                            sx={{ gridColumn: "span 2" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Last Name"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={userInfo.lastName}
                            name="lastName"
                            error={!!touched.lastName && !!errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Email"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={ userInfo.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            sx={{ gridColumn: "span 4" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Contact Number"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={ userInfo.number}
                            name="contact"
                            error={!!touched.contact && !!errors.contact}
                            sx={{ gridColumn: "span 4" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Address"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={ userInfo.address}
                            name="address"
                            error={!!touched.address && !!errors.address}
                            sx={{ gridColumn: "span 4" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="City"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={ userInfo.city}
                            name="City"
                            error={!!touched.city && !!errors.city}
                            sx={{ gridColumn: "span 2" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="postCode"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            value={ userInfo.postCode}
                            name="postCode"
                            error={!!touched.postCode && !!errors.postCode}
                            sx={{ gridColumn: "span 2" }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                        {/* <Button type="submit" color="secondary" variant="contained">
                            Create New User
                        </Button> */}
                        </Box>
                    </form>
                    )}
                </Formik>
            </Box>
            </div>
            <PetsList />
            {detailViewIsOpen && <PetDetail />}
            {updateIsOpen && <UpdateForm />}
        </div>
    );
}