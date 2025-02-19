import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {

   const [emailId,setEmailId]= useState("");
   const [password,setPassword] = useState("");
   const [error,setError] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async () => {
       try {
         const res = await axios.post(BASE_URL+"/login",{
          emailId,
          password
         },{
          withCredentials:true
         }
        );

        dispatch(addUser(res.data));
        return navigate("/");
       }
       catch(err){
         setError(err?.response?.data || "Something went wrong");
        // console.log(err?.response?.data || "Something went wrong");
       }
   }

  return (
    <div className='flex justify-center mt-24'>
    <div className="card bg-base-content text-primary-content w-96">
    <div className="card-body">
      <h2 className='card-title justify-center text-white'>Login</h2>

      <label className="form-control w-full max-w-xs mt-2">
       <div className="label">
          <span className="label-text text-cyan-50">Email ID :</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={emailId} onChange={(e)=>{
            setEmailId(e.target.value);
          }}/>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-cyan-50">Password :</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs"  value={password} onChange={(e)=>{
            setPassword(e.target.value);
          }}/>
      </label>
      <p className='text-red-500'>{error}</p>
      <div className="card-actions justify-center my-4">
        <button className="btn bg-cyan-950 text-white hover:bg-slate-600" onClick={handleLogin}>Login</button>
      </div>
    </div>
  </div>   
  </div>
  )
}

export default Login