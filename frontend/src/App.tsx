import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {Alert} from "@mui/material";
import Home from "./containers/Home/Home";
import ImagesUser from "./containers/ImagesUser/ImagesUser";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='imagesUser/:id' element={<ImagesUser/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='/*' element={<Alert severity='info'>Такой страницы нет !</Alert>}/>
    </Routes>
  );
}

export default App;
