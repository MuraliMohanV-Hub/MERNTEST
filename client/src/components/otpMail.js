import { useState } from 'react'
//import './App.css'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'




function OtpMail() {
    const [semail,setsemail] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(semail)
        const data = {
            semail
        }
        await axios.post("http://localhost:8500/api/sendotp",data)
        .then(result =>{
            console.log("OTP Sent Succesfully")
            console.log(result)
        })
        .catch(error=>{
            console.log(error)
        })
        navigate(`/verifyotp?email=${semail}`)
    }


  return (
    <div className='sendotp'>
        <div className="container mt-4">
            <div className='form-control'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className='form-label'>Enter Email:</label>
                <input type='email' value={semail} className='form-control' placeholder='Enter Email' onChange={(e)=>setsemail(e.target.value)}/>
                </div>
                <div align="center">
                
                     <button className="btn btn-secondary mt-3" type='submit'>Verify OTP</button>
                </div>
            </form>
            </div>
        </div>
      
    </div>
  )
}

export default OtpMail