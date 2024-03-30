import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import bgVideo from "../images/login.mp4"
import ReactPlayer from 'react-player'

function Login({ handleUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginReturnMsg, setloginReturnMsg] = useState("")
    const [RegisterBtnMsg, setRegisterBtnMsg] = useState("Register")
    const [LoginBtnMsg, setLoginBtnMsg] = useState("Login")

    const { nav } = useNavigate()



    const login = async (e) => {
        e.preventDefault()
        setRegisterBtnMsg("Registering New User ....")
        const submitLogin = await axios.get("http://localhost:9091/user/get/" + username + "/" + password).then((res) => {
            console.log(res)
            window.sessionStorage.setItem("token",res.data.msg)
            console.log(window.sessionStorage.getItem("token"))
            setloginReturnMsg(username);
            setRegisterBtnMsg("Register")
            handleUser({ id: "1", username, password, loginStatus: res.data.status})

        })
        console.log(loginReturnMsg)
        console.log(submitLogin)
        console.log(loginReturnMsg.username)
    }

    return (

        <div    >



            <form className="login-form bg-white" onSubmit={login}>
                <h3 className='bg-green-400'>{loginReturnMsg.status && loginReturnMsg.msg}</h3>
                <h3 className='bg-red-400'>{!loginReturnMsg.status && loginReturnMsg.msg}</h3>
                <div className="card bg-base shadow-md w-1/3 max-w-full">
                    <div className="card-body ">
                        <input type="text" className="input username  input-bordered input-secondary input-md w-full " placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}  required/>
                        <br />
                        <input type="password" className="input password input-bordered input-secondary input-md w-full" placeholder="password"
                            onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>
                </div>

                <button className="btn btn-success text-white font-mono  login-btn " type="submit">{LoginBtnMsg}</button>

            </form>
        </div>
    )
}

export default Login