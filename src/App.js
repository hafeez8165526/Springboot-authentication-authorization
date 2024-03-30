import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Register from './components/Register';
import { useSnackbar } from 'notistack';

function App() {
  const [user, setuser] = useState({ id: "1", username: "", password: "", loginStatus: "" })
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate()
  const handleClickVariant = (options) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(options.message, { variant: options.variant });
  };
  const handleUserData = (user) => {
    setuser(user)
    console.log(user)
    if (user.loginStatus) {
      nav("/dashboard")
      handleClickVariant({ variant: 'success', message: 'Login Successfull!!!' })
    }
    else {
      nav("register")
      handleClickVariant({ variant: 'error', message: "Login Failed!!", })
      handleClickVariant({ message: "Please register your self", variant: "info" })
    }


  }
  const handleDashboard = (status) => {
    if (status.loginStatus) {
      nav("/dashboard")

      handleClickVariant({ message: "Login  Successfull!!", variant: "success" })


    }
    else {
      nav("/register")
      handleClickVariant({ message: "Login Failed!!", variant: "error" })
      handleClickVariant({ message: "Invalid Credntials..Please register", variant: "info" })
    }
  }

  const handleUserRegister = (user) => {
    setuser(user)
    console.log(user)
    nav("/login")
    if(user.loginStatus)  handleClickVariant({message:"Registration Successfull!!!", variant:"success"})
    else  handleClickVariant({message:"User already exists.. Please login", variant:"info"})

  }

  return (
    <div className="App">
      <div className="login-top-bar shadow-sm bg-base-300 bg-slate-100"></div>
      <Routes>
        <Route path={`/`} element={<Login handleUser={handleUserData} />} />
        <Route path="/login" element={<Login handleUser={handleDashboard} />} />
        <Route path="/dashboard" element={<Dashboard loggedInUser={user} />} />
        <Route path="/register" element={<Register handleUserRegister={handleUserRegister} />} />
      </Routes>


    </div>
  );
}

export default App;
