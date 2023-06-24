import {Container,} from '@mui/material';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';



import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    GoogleAuthProvider
} from 'firebase/auth'

import{auth} from "../firebase/firebaseConfig"
import { useState } from 'react';
import { width } from '@mui/system';
const provider = new GoogleAuthProvider();

export default function LoginPage(){
    const handleSubmit = (event) => {
        console.log(email+password)
        loginWithFirebase()
    };

    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPsErr] = useState("");
  
    const loginWithFirebase = async () => {
            setEmailErr('')
            setPsErr('')
            const persistence = remember ? browserLocalPersistence : browserSessionPersistence

            setPersistence(auth, persistence)
                .then(() => {
                    signInWithEmailAndPassword(auth, email,password)
                        .then(() => {
                            console.log('firebase signin sucess')
                        })
                        .catch((error) => {
                            setEmailErr('Your email or password is incorrect')
                            setPsErr('Your email or password is incorrect')
                        })
                })
                .catch((error) => {})
        }



    return (
      <Container component="main" sx={{width:{sm:"100%", md:"100%", lg:"80%"}, marginX:"auto"}}>
        <Box
          sx={{
            mt: "150px",
          }}
        >
          <Grid container spacing={2} justifyContent="space-around">
            <CssBaseline />
            <Grid
              item
              sx={{
                backgroundImage: "url(https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display:{sm:"none", md:"block"},
                width:"50%"
              }}
            />
            <Grid
              item
              sx={{width:"50%"}}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  sx={{ mt: 1, width:"100%"}}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                  />
                <Typography sx={{color:"red", fontSize: "12px", marginBottom:"12px"}}>
                  {emailErr}
                </Typography>
                 <FormControl fullWidth onChange={e => setPassword(e.target.value)} >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>{setShowPassword(!showPassword)}}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                 </FormControl>
                 <Typography sx={{color:"red", fontSize: "12px", marginBottom:"12px"}}>
                  {passwordErr}
                </Typography>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container justifyContent="space-between" xs={16} >
                    <Grid item xs={5} textAlign="center">
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Link href="#" variant="body2" >
                        Don't have an account? <br/> Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-around" xs={12} mt={2} borderTop={1}>
                  <IconButton color="primary" >
                      <GoogleIcon />
                  </IconButton>
                  <IconButton color="primary">
                      <FacebookIcon />
                  </IconButton>
                  <IconButton color="primary">
                      <TwitterIcon />
                  </IconButton>
                  </Grid>
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }