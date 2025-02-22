import React, { useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName); 
  const [age,setAge] = useState(user.age);
  const [gender,setGender] = useState(user.gender);
  const [about,setAbout] = useState(user.about);
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowtoast] = useState("");
  const dispatch = useDispatch();

  const handlesaveprofile = async () => {
    try{
      const res = await axios.patch(
        BASE_URL+"/profile/edit",
        {
           firstName,
           lastName,
           age,
           gender,
           about,
           photoUrl
        },
        {
          withCredentials: true,
        }
      )
      dispatch(addUser(res?.data));
      setShowtoast(true);
      setTimeout(()=>{
        setShowtoast(false);
      },3000)
    }
    catch(err) {
       console.log(err);
    }
  }
  return (
    <>
    <div className='flex justify-center space-x-8'>
    <div>
        <div className='flex justify-center mt-8'>
    <div className="card bg-base-content text-primary-content h-[523px] w-96">
    <div className="card-body">
      <h2 className='card-title justify-center text-white'>Edit Profile</h2>

      <label className="form-control h-[58px] w-full max-w-xs">
       <div className="label">
          <span className="label-text text-cyan-50">First Name:</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={firstName} onChange={(e)=>{
             setFirstName(e.target.value);
        }}/>
      </label>
      <label className="form-control h-[58px] w-full max-w-xs">
       <div className="label">
          <span className="label-text text-cyan-50">Last Name:</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={lastName} onChange={(e)=>{
             setLastName(e.target.value);
        }}/>
      </label>
      <label className="form-control h-[58px] w-full max-w-xs">
       <div className="label">
          <span className="label-text text-cyan-50">Age:</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={age} onChange={(e)=>{
             setAge(e.target.value);
        }}/>
      </label>
      <label className="form-control h-[58px] w-full max-w-xs">
       <div className="label">
          <span className="label-text text-cyan-50">Gender:</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={gender} onChange={(e)=>{
             setGender(e.target.value);
        }}/>
      </label>
      <label className="form-control h-[58px] w-full max-w-xs">
       <div className="label">
          <span className="label-text text-cyan-50">About:</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={about} onChange={(e)=>{
             setAbout(e.target.value);
        }}/>
      </label>
      <label className="form-control h-[58px] w-full max-w-xs">
       <div className="label">
          <span className="label-text text-cyan-50">PhotoUrl:</span>
        </div>
        <input type="text" className="text-black input input-bordered w-full max-w-xs" value={photoUrl} onChange={(e)=>{
             setPhotoUrl(e.target.value);
        }}/>
      </label>
      <div className="card-actions justify-center my-1">
        <button className="btn bg-cyan-950 text-white w-28 hover:bg-slate-600" onClick={handlesaveprofile}>Save</button>
      </div>
    </div>
  </div>   
  </div>
    </div>
    <div className='mt-10'>
        <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
    </div>
    </div>
    {showToast && (<div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile updated successfully.</span>
        </div>
    </div>)}
     </> 
  )
}

export default EditProfile