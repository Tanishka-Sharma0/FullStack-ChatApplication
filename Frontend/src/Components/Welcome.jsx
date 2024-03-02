import React from "react";
import logo from "../icon/bot.png"
import {useSelector} from "react-redux";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import "./mystyles.css";

const Welcome = () => {
  const lightTheme = useSelector((state)=>state.themeKey);
  const UserData = JSON.stringify(localStorage.getItem("UserData"));
  console.log(UserData);
  const nav = useNavigate();
   if(!UserData){
    console.log("User not Authenticated");
    nav("/");
   }
  return (
    <div className={"welcome-container" + (lightTheme ? "" : "dark")}>
      <motion.img
       drag 
       whileTap={{scale: 1.05 , rotate:360}}
        src={logo} 
        alt="logo"
         className="welcome-logo" />
          <b>Hi ,{UserData.data.name} 👋</b>
     <p>View and text directly to people present in the Chat Rooms</p>
    </div>
  )
}
export default Welcome