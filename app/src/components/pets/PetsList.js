import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import PetCard from "./PetCard";
import '../../style/PetsBrief.css';
import { Box, Card } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react";
import {getPetsAsync} from "../../redux/pets/thunks";

export default function PetsList() {
  const[token, setToken]=useState("");
  const[refresh, setRefresh]=useState(false);
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();
 
  const auth = getAuth();
  const navigate = useNavigate();
    //keep track of index in the list of pets, and function to change it

    //does same but backwards

  useEffect(() => {
    if (token !=""){
      getPets()
    }
    setRefresh(false)
  }, [token, refresh]); 

  const getPets=async ()=>{
    const res = await fetch("http://localhost:3001/pets/byuser", {
      method: 'GET',
      headers: { 
                  'Content-Type': 'application/json',
                  authorization: token},
    });
    const data=await res.json();
    if(res.status!=200){
      console.log("fetch data failed") 
      setPets([])
    }else{
      setPets(data)
    }
   }

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
            navigate("/")
      }
      });
  }, []);   



      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box sx={{height:'100%', marginX:"auto", width:'80%' , maxWidth:"1200px"}}>
            <h2>Pets Looking for A Forever Home</h2>
            <div className="slideshow-container">
              <Grid container spacing={1} alignItems="center" sx={{width:'100%', rowGap:'50px' }}>


                  {pets.map((pet, index) => (
                    <Grid item xs={4} 
                      key={index}
                      display="flex" justifyContent="center" alignItems="center"
                    >
                      { <PetCard pet={pet} setRefresh={setRefresh} token={token} />}
                    </Grid>
                  ))}

                  <Grid item xs={4} 

                      display="flex" justifyContent="center" alignItems="center"
                    >
              
                    <AddCircleOutlineRoundedIcon fontSize="large" color="primary" onClick={()=>navigate('/addNewPet')}/>
    
                    
                  </Grid>

              </Grid>
            </div>
          </Box>
        </Box>
      );
      
}