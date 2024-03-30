import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register({handleUserRegister}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginReturnMsg, setloginReturnMsg] = useState("")
    const [RegisterBtnMsg, setRegisterBtnMsg] = useState("Register")
    const [LoginBtnMsg, setLoginBtnMsg] = useState("Login")
    const nav=useNavigate()



    const register = async (e) => {
        e.preventDefault()
        setRegisterBtnMsg("Registering New User ....")
        const submitLogin = await axios.post("http://localhost:9091/user/register",{ id: "1", username, password }).then((res) => {
            console.log(res.data)
            setloginReturnMsg(res.data);
            setRegisterBtnMsg("Register")
            handleUserRegister({id:"1",username,password,loginStatus:res.data.status})
        })  
        console.log(loginReturnMsg)
    }
    return (
        <form className="login-form " onSubmit={register}>
            <h3 className='bg-green-400'>{loginReturnMsg.status && loginReturnMsg.msg}</h3>
            <h3 className='bg-red-400'>{!loginReturnMsg.status && loginReturnMsg.msg}</h3>
            <div className="card bg-base shadow-md w-1/3 max-w-full">
                <div className="card-body ">
                    <input type="text" className="input username  input-bordered input-secondary input-md w-full" placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <input type="password" className="input password input-bordered input-secondary input-md w-full" placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                     <input type="number" className="input  input-bordered input-secondary input-md w-full" placeholder="Age"
                       
                    />
                </div>
            </div>

            <button className="btn btn-success text-white font-mono  login-btn btn-circle max-w-sm" type="submit">{RegisterBtnMsg}</button>
            <a className="btn btn-info text-black font-mono  login-btn btn-circle max-w-sm bg-yellow-200" href='/login'>Go Back</a>

        </form>
    )
}

export default Register