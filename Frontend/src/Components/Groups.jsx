import React,{useState,useContext,useEffect} from 'react';
import './mystyles.css';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import logo from "../icon/9828867.mp4";
import {useDispatch,useSelector} from 'react-redux';
import axios from "axios";
import {AnimatePresence,motion} from "framer-motion";
import {useNavigate} from 'react-router-dom';
import {refreshSidebarFun} from "../Features/refreshsidebar";
import {myContext} from "./MAinContainers";

const Groups = () => {
    const lightTheme = useSelector((state)=>{state.themeKey});
    const {refresh,setrefresh} = useContext(myContext);
    const [groups,SetGroup] = useState([]);
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("Data from LocalStorage : ", userData);
    const nav = useNavigate();

    if(!userData){
      console.log("User not Authenticated");
      nav("/");
    }
    const user = userData.data;
    useEffect(()=>{
      console.log("User Refreshed: ",user.token);
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };
      axios.get("http://localhost:8000/users/fetchGroups",config).then((response)=>{
        console.log("Group Data from API",response.data);
        SetGroup(response.data);
        // setrefresh(!refresh);
      });
    },[refresh]);
  return (
    <AnimatePresence>
      <motion.div
      initial={{opacity:0,scale:0}}
      animate={{opacity:1,scale:1}}
      exit={{opacity:0,scale:0}}
      transition={{
        ease:"anticipate",
        duration:"0.3",
      }}
      className="list-container"
      >
        <div className={'ug-header'+ (lightTheme ? "" :"dark")}>
        <video
      src={logo}
       style={{height:"2rem", width:"2rem", marginLeft:"10px"}}
       />
       <p className={'ug-title' + (lightTheme ? "" :"dark")}>
        Availale Groups
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
        {groups.map((group,index)=>{
          return(
            <motion.div
              whileHover={{scale:1.01}}
              whileTap={{scale:0.98}}
              className={'list-item' + (lightTheme ? " " :"dark")}
              key={index}
              onClick={()=>{
                console.log("Creating Chat with ",group.name);
                const dispatch = useDispatch();
                dispatch(refreshSidebarFun());
              }} 
            >
      <p className={'con-icon'+ (lightTheme ? " " :"dark") }>T</p>
       <p className={'con-title' + (lightTheme ? " " :"dark")}>{group.chatName}</p>
            </motion.div>
          );
        })}
      </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Groups