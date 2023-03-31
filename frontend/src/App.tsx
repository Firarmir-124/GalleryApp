import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";

function App() {
  return (
    <Routes>
      <Route path='register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
