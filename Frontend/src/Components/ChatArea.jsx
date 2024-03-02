import { IconButton } from "@mui/material"
import React,{useState,useEffect,useContext,useRef} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send'; 
import MessageOther from "./MessageOther";
import Messageself from "./Messageself";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./MAinContainers";

const ChatArea = () => {
  const lightTheme = useSelector((state)=>state.themeKey);
  const [messagecontent,setMessagContent] = useState("");
  const messageEndRef = useRef(null);
  const dyParams = useParams();
  const[chat_id ,chat_user] = dyParams._id.split("&");
  console.log(chat_id ,chat_user);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const[AllMessage,setAlmessage] = useState([]);
  const {refresh,setRefresh} = useContext(myContext);
  const[loaded,setloaded] = useState(false);
  const sendMessage = ()=>{
    console.log("sendMessage Fired to :",chat_id._id);
    const config={
      headers:{
        Authorization:`Bearer ${userData.data.token}`,
      },
    };
    axios.post(
      "http://localhost:8000/users/messages/",
      {
        content: messagecontent,
        chatId: chat_id,
      },
      config
    )
    .then(({data})=>{
       console.log("Message Fired");
    });
  };

  useEffect(()=>{
    console.log("User Refreshed");
    const config={
      headers:{
        Authorization:`Bearer ${userData.data.token}`,
      },
    };
    axios.post(
      "http://localhost:8000/users/messages/" + chat_id,
      {
        content: messagecontent,
        chatId: chat_id,
      },
      config
    )
    .then(({data})=>{
      setAlmessage(data);
      setloaded(true);
    console.log("Data from Acess Chat API ", data);
   });
  },[refresh,chat_id,userData.data.token]);
  if(!loaded){
    return(
      <div
          style={{
            border:"20px",padding:"10px",
            width:"100%",display:"flex",
            flexDirection:"column",gap:"10px"
          }}
      >
    <Skeleton
    variant="rectangular"
    sx={{width:"100%", borderRadius:"10px"}}
    height={60}
    />
    <Skeleton
    variant="rectangular"
    sx={{width:"100%", borderRadius:"10px", flexGrow:"1"}}
    />
    <Skeleton
    variant="rectangular"
    sx={{width:"100%", borderRadius:"10px"}}
    height={60}
    />
      </div>
    );
  }else{
    return (
      <div className={"chatarea-container"+ (lightTheme ? "" : "dark")}>
          <div className={"chatarea-header"+ (lightTheme ? "" : "dark")}>
            <p className={"con-icon"+ (lightTheme ? "" : "dark")}>{chat_user[0]}</p>
            <div className={"header-text"+ (lightTheme ? "" : "dark")}>
            <p className={"con-title"+ (lightTheme ? "" : "dark")}>{chat_user.name}</p>
            {/* <p className={"con-timestamp"+ (lightTheme ? "" : "dark")}>{chat_user.timestamp}</p> */}
            </div>
            <IconButton className={"icon"+ (lightTheme ? "" : "dark")}>
              <DeleteOutlineIcon/>
            </IconButton>
          </div>
          <div className={"Messages-container" + (lightTheme ? "" : "dark")}>
            {AllMessage
            .slice(0)
            .reverse()
            .map((message,index)=>{
           const sender = message.sender;
           const selfId = userData.data._id;
           if(sender._id === selfId){
            console.log("I sent it");
            return <Messageself props={message} key={index}/>
           }
           else{
            console.log("someone sent it");
            return <MessageOther props={message} key={index}/>
           }
            })}
          </div>
          <div ref={messageEndRef} className="BOTTOM"/>
          <div className={"text-input-area" + (lightTheme ? "" : "dark")}>
          <input 
          placeholder="Type your Message" 
          className={"search-box" + (lightTheme ? "" :"dark")}
          value={messagecontent}
          onChange={(e)=>{
          setMessagContent(e.target.value);
          }}
          onKeyDown={(event)=>{
            if(event.code == "Enter"){
              console.log(event);
              sendMessage();
              setMessagContent("");
              setRefresh(!refresh);
            }
          }}
          />
          <IconButton
           className={"icon" + (lightTheme ? "" : "dark")}
           onClick={()=>{
            sendMessage();
            setRefresh(!refresh);
           }}>
            <SendIcon></SendIcon>
          </IconButton>
          </div>
      </div>
    )
  }
}

export default ChatArea