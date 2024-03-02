import "./mystyles.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import  React ,{ useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItems from "./conversationItems";
import LightModeIcon from '@mui/icons-material/LightMode';
import {toggleTheme} from "../Features/themeslice"
import { IconButton } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate } from "react-router";
import { useContext,useEffect } from "react";
import {refreshSidebarFun} from "../Features/refreshsidebar"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {myContext} from "./MAinContainers"

const Sidebar = () => {


 const navigate = useNavigate();
 const dispatch = useDispatch();
 const lightTheme = useSelector((state)=> state.themeKey)
 const {refresh, setRefresh} = useContext(myContext)
 console.log("Context API : refresh :",refresh);
 const[conversations ,setconversation] = useState([]);
 console.log("conversation of sidebar: ",conversations);
 const userData = JSON.parse(localStorage.getItem("userData"));
 console.log("Data from LocalStorage : ", userData);
const nav = useNavigate();


  return (
    <div className="sidebar">
      <div className={"sb-header"+(lightTheme ? "" : "dark")}>
        <div className="other-icons">
        <IconButton onClick={()=>{
          nav("/app/welcome");
        }}>
          <AccountCircleIcon className={"icon"+(lightTheme ? "" : "dark")}/></IconButton>
        </div>
        <div>
        <IconButton onClick={()=>{
         navigate("users");
        }}>
          <PersonAddIcon className={"icon"+(lightTheme ? "" : "dark")}/>
        </IconButton>
        <IconButton onClick={()=>{
          navigate("groups")
        }}>
          <GroupAddIcon className={"icon"+(lightTheme ? "" : "dark")}/>
          </IconButton>
        <IconButton onClick={()=>{
          navigate("create-groups");
        }}>
          <AddCircleIcon className={"icon"+(lightTheme ? "" : "dark")}/>
        </IconButton>

        <IconButton onClick={()=>{
          dispatch(toggleTheme());
        }}>
          {lightTheme && (<NightlightIcon className={"icon" + (lightTheme ? "" : "dark")}/>)}
          {!lightTheme && (<LightModeIcon className={"icon" + (lightTheme ? "" : "dark")}/>)}
          </IconButton>
          <IconButton onClick={()=>{
            localStorage.removeItem("userData");
            nav("/");
          }}>
        <ExitToAppIcon className={"icon" + (lightTheme ? "" : "dark")}/>
          </IconButton>
        </div>
      </div>
      <div className={"sb-search" + (lightTheme ? "" : "dark")}>
      <IconButton className={"icon" + (lightTheme ? "" : "dark")}><SearchIcon/></IconButton>
       <input placeholder="search" className={"search-box"+ (lightTheme ? "" :"dark")}></input>
      </div>
      <div className={"sb-conversation" + (lightTheme ? "" :"dark")}>
        {conversations.map((conversation,index)=>{
        console.log("current convo : ", conversation);
        if(conversation.users.length ===1){
          return <div key={index}/>
        }
        if(conversation.lastMessage === undefined){
        console.log("No Latest Message with ", conversation.users[1]);
        return(
          <>
          <div
          key={index}
          onClick={()=>{
            console.log("Refresh fired from sidebar");
            setRefresh(!refresh);
          }}>
         <div
         key={index}
         className="conversation-container"
         onClick={()=>{
          navigate("chat/"+conversation._id + "&"+ conversation.users[1].name);
         }}>
          <p className={"con-icon" + (lightTheme ? "" : "dark")}>{conversation.users[1].name[0]}</p>
          <p className={"con-title" + (lightTheme ? "" : "dark")}>{conversation.users[1].name}</p>
          <p className={"con-lastMessage" + (lightTheme ? "" : "dark")}>No Previouss message click here to starat a new chat</p>
         </div>
          </div>
          </>
        );
        }
        else{
          return(
            <>
         <div
         key={index}
         className="conversation-container"
         onClick={()=>{
          navigate("chat/"+conversation._id + "&"+ conversation.users[1].name);
         }}>
          <p className={"con-icon" + (lightTheme ? "" : "dark")}>{conversation.users[1].name[0]}</p>
          <p className={"con-title" + (lightTheme ? "" : "dark")}>{conversation.users[1].name}</p>
          <p className={"con-lastMessage" + (lightTheme ? "" : "dark")}>{conversation.lastMessage.content}</p>
         </div>
          </>
          );
        }
        })}
      </div>
    </div>
  );
}

export default Sidebar