import React from "react";

const Messageself = ({props}) => {
  console.log("Message self props: ",props);
  return (
    <div className="self-message-container">
       <div className="messageBox">
         <p style={{color:"black"}}>{props.content}</p>
         {/* <p className="self-timestamp">12:00pm</p> */}
       </div>
    </div>
  );
}

export default Messageself