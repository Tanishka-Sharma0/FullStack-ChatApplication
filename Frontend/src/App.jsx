import React from "react";
import './App.css'
import MainContainers from './Components/MAinContainers'
import Login from "./Components/Login"
import { Route, Routes } from 'react-router'
import Welcome from './Components/Welcome'
import ChatArea from './Components/ChatArea'
import User from './Components/User'
import Groups from './Components/Groups'
import CreateGroup from './Components/CreateGroup'
import {useDispatch,useSelector} from "react-redux";
function App() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state)=>state.themeKey);
  return (
    <div className={"App" +(lightTheme ? "" :"-dark")}>
      {/* <MainContainers></MainContainers> */}
      {/* <Login></Login> */}
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='app' element={<MainContainers/>}>
            <Route path='welcome' element={<Welcome/>}></Route>
            <Route path='chat/:_id' element={<ChatArea/>}></Route>
            <Route path='users' element={<User/>}></Route>
            <Route path='groups' element={<Groups/>}></Route>
            <Route path='create-groups' element={<CreateGroup/>}></Route>
        </Route>
      </Routes>
      </div>
  )
}

export default App
