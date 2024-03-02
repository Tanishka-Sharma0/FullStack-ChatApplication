import "./mystyles.css"
import Sidebar from "./Sidebar"; 
import  React,{ useState ,createContext } from "react";
import {useDispatch,useSelector} from "react-redux";
import { Outlet } from "react-router-dom";

export const myContext = createContext();

const MainContainers = () => {
  const dispatch = useDispatch();
  const [refresh,setRefresh] = useState(true);
  const lightTheme = useSelector((state)=>state.themeKey);

  return (
    <div className={"maincontainer" + (lightTheme ? "" : "dark")}>
      <myContext.Provider value={{refresh:refresh ,setRefresh:setRefresh}}>
      <Sidebar/>
      <Outlet/>
      </myContext.Provider>
      {/* <ChatArea></ChatArea>  */}
      {/* <Welcome></Welcome> */}
      {/* <CreateGroup></CreateGroup> */}
       {/* <User></User> */}
       {/* <Groups></Groups> */}
    </div>
  );
}
export default MainContainers