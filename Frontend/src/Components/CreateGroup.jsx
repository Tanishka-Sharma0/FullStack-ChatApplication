import React ,{useState} from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton,Button,DialogActions,Dialog,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import {useDispatch,useSelector} from "react-redux";
import axios from "axios";
// import { create } from "@mui/material/styles/createTransitions";
import {useNavigate} from "react-router-dom";

const CreateGroup = () => {
  const [open, setOpen] = React.useState(false);
  const [groupName,setGroupName] = useState(" ")
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("Data from Localstorage: ",userData);
  const lightTheme = useSelector((state)=>state.themeKey);
  const nav = useNavigate();

  if(!userData){
    console.log("user Not Authenticated");
    nav("/");
  }
  const user = userData.data;
  const handleClose = ()=>{
    setOpen(false);
  }
  console.log("user data from create group:  ",userData);
  
  const create_group = ()=>{
    const config = {
      headers:{
        Athorization:`Bearer ${user.token}`,
      },
    };
    axios.post("http://localhost:8000/users/create-groups",
    {
      name:[groupName],
      users:'[""]',
    },
    config);
    nav("/app/groups");
  };
  const handleClickOpen = ()=>{
      setOpen(true);
  }
  return (
    <>
    <div>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Create Group Named" +groupName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         This will create a Create Group in which you will be the admin and other will be able to join this group.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button 
        onClick={()=>{
          create_group();
          handleClose();
        }}
        autoFocus
        >
          Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
    
    <div className={'createGroups-container' + (lightTheme ? " " : "dark")}>
  <input placeholder="Enter Group Name"
   className= {"search-box" + (lightTheme ? " " : "dark")}
   onChange={(e)=>{
        setGroupName(e.target.value);
   }}></input>

  <IconButton 
  className={'icon'+ (lightTheme ? " " : "dark")}
  onClick={()=>{
    handleClickOpen();
  }}
  >
    <DoneOutlineIcon></DoneOutlineIcon>
  </IconButton>
    </div>
    </>
  )
}

export default CreateGroup