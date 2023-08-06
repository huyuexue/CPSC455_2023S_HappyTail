import PetDetail from "../components/pets/PetDetail";
import {useSelector} from "react-redux";
import PetsList from "../components/pets/PetsList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AppBar, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,TextField, CircularProgress} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../redux/login/thunks";

export default function Dashboard({itemsList}){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    // const updateIsOpen = useSelector(updateStatus)
    const [userInfo, setUser]=useState("")
    const[refresh, setRefresh]=useState(false);
    // const[loading, setLoading]=useState(false);
    const[inputOnly, setInputOnly]=useState(true);
    // const[token, setToken]=useState("");
    const auth = getAuth();
    const nav = useNavigate();
    const token = useSelector(state => state.login.token);
    const isLogin = useSelector(state => state.login.value);

    // const getToken=async (user)=>{
    //     const token= await user.getIdToken()
    //     console.log(token)
    //     setToken(token)
    //   }
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //       if (user) {
    //         getToken(user)
    //       } else {
    //             nav("/")
    //       }
    //       });
    //   }, []);   
    

    useEffect(() => {
        if (!isLogin) {
            setRefresh(false)
        }else{
            nav("/login")
        }
            
      }, [token, refresh, isLogin ]); 

    // const getuserInfo=async (values)=>{
    //     if(token!=""){
    //     const res = await fetch("http://localhost:3001/users/info", {
    //       method: 'GET',
    //       headers: { 
    //                   'Content-Type': 'application/json',
    //                   authorization: token},
    //     });
    //     const data=await res.json();
    //     if(res.status!=200){
    //       console.log("fetch data failed") 
    //     }else{
    //       setUser(data.data)
    //       setLoading(true)
    //     }
    //     }
    //    }








    return (
        <div className="Dashboard">

            <PetsList />
            {detailViewIsOpen && <PetDetail />}
        </div>
    );
}