import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import React,{useContext,useState,useEffect} from 'react';
import { IconButton } from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import axios from "axios";
import {AnimatePresence,motion} from "framer-motion";
import {useNavigate} from 'react-router-dom';
import {refreshSidebarFun} from "../Features/refreshsidebar";
import {myContext} from "./MAinContainers";
import logo from "../icon/9828867.mp4";
import './mystyles.css';

const User = () => {
  const {refresh,setrefresh} = useContext(myContext);

  const lightTheme = useSelector((state)=>state.themeKey);
  const [users,setUsers] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
     console.log("Local storage data: ",userData);

    const nav = useNavigate();
    const dispatch = useDispatch();

    if(!userData){
      console.log("User not Authenticated");
      nav(-1);
    }
    useEffect(()=>{
      console.log("User Refreshed");
      const config = {
        headers:{
          Authorization:`Bearer ${userData.data.token}`,
        },
      };
      axios.get("http://localhost:8000/users/fetchUsers",config).then((data)=>{
        console.log("Data Refreshed in User Panel");
        setUsers(data.data);
        // setrefresh(!refresh);
      });
    },[refresh]);
  return (
    <AnimatePresence>
      <motion.div
      initial ={{opacity:0,scale:1}}
      animate = {{opacity:1 , scale: 1}}
      exit={{opacity:0 , scale: 0}}
      transition={{duration :"0.3"}}
      className="list-container">

      <div className={'ug-header'+ (lightTheme ? "" :"dark")}>
      <video
      src={logo}
       style={{height:"6rem", width:"6rem", marginLeft:"10px"}}
       />
      <p className={'ug-title' + (lightTheme ? "" :"dark")}>
        Online Users
        </p>
      <IconButton
       className={'icon'+ (lightTheme ? "" :"dark")}
        onClick={()=>{setrefresh(!refresh)}}
        >
        <RefreshIcon/>
      </IconButton>
      </div>

      <div className= {"sb-search" + (lightTheme ? "" :"dark")}>
      <IconButton className={'icon'+ (lightTheme ? "" :"dark")} >
        <SearchIcon/>
        </IconButton>
       <input 
       placeholder="search" 
       className={"search-box" + (lightTheme ? "" :"dark")}>
       </input>
      </div>

      <div className='ug-list'>
        {users.map((user,index)=>{
          return(
       <motion.div 
       whileHover={{scale:1.01}}
       whileTap={{scale:0.98}}
       className={'list-item' + (lightTheme ? " " :"dark")}
       key={index}
       onClick={()=>{
        console.log("Creating Chat with ",user.name);
        const config = {
          headers:{
            Authorization:`Bearer ${userData.data.token}`,
          },
        };
        axios.post(
          "http://localhost:8000/chat/",
          {
            userId :user._id,
          },
          config
        );
        dispatch(refreshSidebarFun());
       }}
       >
       <p className={'con-icon'+ (lightTheme ? " " :"dark") }>T</p>
       <p className={'con-title' + (lightTheme ? " " :"dark")}>{user.name}</p>
       </motion.div>
          );
        })}
      </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default User