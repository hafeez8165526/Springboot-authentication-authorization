import React, { useState,useEffect } from 'react'
import "./Dashboard.css"
import "../App.css"
import "./Login.css"
import axios from 'axios'

function Dashboard({ loggedInUser }) {
    const [loginSuccess, setLoginSuccess] = useState(false)
    const handleRed=()=>{
        const res=axios({
            url:'http://localhost:9091/user/testWithoutToken',
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>setLoginSuccess(res.status))
        .catch((err)=>setLoginSuccess(false))
    }

    const handleGreen=()=>{
        console.log(window.sessionStorage.getItem("token"))
        const res=axios.get(    
            'http://localhost:9091/user/testWithToken',{
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+window.sessionStorage.getItem("token")
            }
        }
        ).then((res)=>setLoginSuccess(res.status))
        .catch((err)=>setLoginSuccess(false))
    }
    useEffect(() => {
    
      return () => {
        setLoginSuccess(false)
      }
    }, [])
    

    return (
        <div className='dashboard'>
            <div className="login-top-bar shadow-sm bg-base-300 bg-slate-100"></div>

            <div className="card bg-center items-center justify-center">
                <h1>Welcome {loggedInUser.username}!!</h1>
                <div className='container' >
                    <button className='col-span-1 red-box mt-10 mr-10 ' onClick={handleRed}>
                        I dont have token
                    </button>
                    <button className=' col-span-1 row blue-box mt-10 mr-10' onClick={handleGreen}>
                        I have the token
                    </button>
                </div>
                {loginSuccess && <h2 className='text-green-500 mt-5 font-semibold card  '>Login Success </h2>}
                {!loginSuccess && <h2 className='text-red-700 mt-5 font-semibold '>Login Failed</h2>}
            </div>
        </div>

    )
}

export default Dashboard