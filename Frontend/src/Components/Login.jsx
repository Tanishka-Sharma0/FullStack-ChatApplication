import { Button, TextField ,Backdrop,CircularProgress } from "@mui/material"
import logo from "../icon/bot.png"
import Toaster from "./Toaster";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import React ,{ useState } from "react";

const Login = () => {
  const[showLogin,setShowLogin] = useState(false);
  const[data,setData] = useState({name:"",email:"",password:""});
  const [loading , setLoading] = useState(false);

  const [logInStatus,setLoginstatus] = React.useState("");
  const [SignInStatus,setSignInstatus] =React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const LoginHandler = async(e)=>{
    setLoading(true);
    console.log(data);
    try{
       const config = {
        headers:{
       "Content-type": "application/json",
        },
       };
       const response = await axios.post(
        "http://localhost:8000/user/login/",
        data,
        config
       );
       console.log("Login: ",response);
       setLoginstatus({msg:"Success" ,key:Math.random()});
       setLoading(false);
       localStorage.setItem("userData",JSON.stringify(response));
       navigate("/app/welcome");
    }catch(error){
       setLoginstatus({
        msg:"Invalid userName or Password",
        key:Math.random()
       })
    }
    setLoading(false);
  };
  const signUpHandler = async(e)=>{
    setLoading(true);
    try{
       const config = {
        headers:{
       "Content-type": "application/json",
        },
       };
       const response = await axios.post(
        "http://localhost:8000/user/register/",
        data,
        config
       );
       console.log("Register: ",response);
       setSignInstatus({msg:"sucess" ,key:Math.random()});
       navigate("/app/welcome");
       localStorage.setItem("userData",JSON.stringify(response));
       setLoading(false);
    }catch(error){
      console.log(error);
      if(error.response.status === 405){
        setLoginstatus({
          msg:"User with this email ID already exists",
          key:Math.random(),
         });
      }
      if(error.response.status === 406){
        setLoginstatus({
          msg:"User Name already Taken, Please Take another Name",
          key:Math.random(),
         });
      }
      setLoading(false);
    } 
  };
  return (
    <>
    <Backdrop
    sx={{color:"#fff",zIndex:(theme)=> theme.zIndex.drawer+1}} open ={loading}>
      <CircularProgress color="secondary"></CircularProgress>
    </Backdrop>
    <div className="login-container">
        <div className="image-container">
        <img alt="logo" className="welcome-logo" src={logo}></img>
        </div>
        {showLogin && (
           <div className="login-box">
           <h2 className="login-text">Login to Your Account</h2>
           <TextField
           onChange={changeHandler}
            id="standard-basic1"
            variant="outlined"
            placeholder="Enter Your Name"
            color="secondary"
            name="name"
            onKeyDown={(event)=>{
              if(event.code == "Enter"){
                console.log(event);
                LoginHandler();
              }
            }}/>
           <TextField 
           onChange={changeHandler}
           id="outlined-password-input"
           placeholder="Password"
           type="password" 
           autoComplete="current-password"
           color="secondary"
            name="password"
            onKeyDown={(event)=>{
              if(event.code == "Enter"){
                console.log(event);
                LoginHandler();
              }
            }}/>
           <Button 
           variant="outlined"
           color="secondary"
           onClick={LoginHandler}
           isLoading
           >LOGIN</Button>
           <p>Don't have an Account?{" "}
             <span
             className="hyper"
             onClick={()=>{
              setShowLogin(false);
             }}
             >
             SIGNUP</span>
           </p>
           {logInStatus ?(
            <Toaster key={logInStatus.key} message={logInStatus.msg}/>
           ):null}
           </div>
        )}
        {!showLogin && (
           <div className="login-box">
           <h2 className="login-text">Create Your Account</h2>
           <TextField
           onChange={changeHandler}
            id="standard-basic"
            variant="outlined"
            placeholder="Enter Your Name"
            color="secondary"
            name="name"
            helperText=""
            onKeyDown={(event)=>{
              if(event.code == "Enter"){
                console.log(event);
                signUpHandler();
              }
            }}/>
            <TextField
           onChange={changeHandler}
            id="standard-basic2"
            variant="outlined"
            placeholder="Enter Your Email"
            color="secondary"
            name="name"
            onKeyDown={(event)=>{
              if(event.code == "Enter"){
                console.log(event);
                signUpHandler();
              }
            }}/>
           <TextField 
           onChange={changeHandler}
           id="outlined-password-input"
           placeholder="Password"
           type="password" 
           autoComplete="current-password"
           color="secondary"
            name="password"
            onKeyDown={(event)=>{
              if(event.code == "Enter"){
                console.log(event);
                LoginHandler();
              }
            }}/>
           <Button 
           variant="outlined"
           color="secondary"
           onClick={signUpHandler}
           isLoading
           >SIGNUP</Button>
           <p>Already have an Account?
             <span
             className="hyper"
             onClick={()=>{
              setShowLogin(true);
             }}
             >
            LOGIN</span>
           </p>
           {SignInStatus ?(
            <Toaster key={SignInStatus.key} message={SignInStatus.msg}/>
           ):null}
           </div>
        )}
    </div>
    </>
  );
}
export default Login