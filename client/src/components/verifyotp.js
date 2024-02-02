import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//import './App.css'
import axios from 'axios'





function VerifyOtp() {
    const location = useLocation();
    const [email,setemail] = useState('')
    const [otp,setotp] = useState('')
    const [message, setMessage] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromOtpMail = queryParams.get('email');
        setemail(emailFromOtpMail);
    }, [location.search]);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = {
            otp,
            email,
        }
        console.log(data)
       
        try {
            const response = await axios.post("http://localhost:8500/api/verifyotp", data);
            console.log(response);

            if (response.data.success) {
                setMessage('OTP verification successful');
            } else {
                setMessage('Incorrect OTP');
            }
        } catch (err) {
            console.log(err);
            setMessage('An error occurred during OTP verification');
        }
    }

  return (
    <div className='sendotp'>
        <div className='container mt-4'>
            <div className='form-control'>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className='form-label'>Enter Email:</label>
                <input type='email' value={email} className='form-control' placeholder='Enter Email' onChange={(e)=>setemail(e.target.value)}  disabled/>
                </div>
                    <div className='mb-3'>
                        <label className='form-label'>Enter OTP:</label>
                        <input className='form-control' value={otp} type='text' onChange={(e)=>setotp(e.target.value)}></input>
                    </div>
                    <br></br>
                    <div align = "center">
                        <button className='btn btn-primary' type='submit'>
                            Submit OTP
                        </button>
                    </div>
                </form>
                <div className="mt-3" align="center">
                        {message && <p className={message.includes('successful') ? 'text-success' : 'text-danger'}>{message}</p>}
                    </div>

            </div>
        </div>
      
    </div>
  )
}

export default VerifyOtp