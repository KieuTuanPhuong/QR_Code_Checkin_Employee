import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './App.css';
import Login from "./views/Login/Login";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();
  const { location } = useLocation();
  
  if (!auth.role) {
    return <Login />
  }

  return (
    <Routes>
      <Route path="login" element={ <Login /> }/>
      <Route path="/" />
    </Routes>
  );
}

export default App;
