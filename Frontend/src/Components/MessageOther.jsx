import React from "react";
import "./mystyles.css";
import {useDispatch,useSelector} from "react-redux";
const MessageOther = ({props}) => {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state)=>state.themeKey);
  console.log("message others: ",props);
  return (
    <div className={"other-message-container" +(lightTheme ? "":"dark")}>
      <div className={"conversation-container"+(lightTheme ? "":"dark")}>
        <p className={"con-icon"+(lightTheme ? "":"dark")}>{props.Sender.name[0]}</p>
        <div className={"other-text-content" +(lightTheme ? "":"dark")}>
         <p className={"con-title"+(lightTheme ? "":"dark")}>{props.Sender.name}</p>
         <p className={"con-lastMessage"+(lightTheme ? "":"dark")}>{props.content}</p>
         {/* <p className="self-timestamp">12:00pm</p> */}
        </div>
      </div>
    </div>
  );
}
export default MessageOther;
