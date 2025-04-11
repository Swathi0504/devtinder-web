import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;  
    const dispatch = useDispatch();
    const handleSendRequest = async (status,_id) => {
        try {
            const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,
                {},
                {withCredentials:true}
            );
            dispatch(removeUserFromFeed(_id));
        }
        catch(err) {

        }
    }  
    return (
     <div className='flex justify-center mt-8'>
        <div className="card w-96 shadow-xl bg-slate-600 text-white">
        <figure>
            <img
            className='w-96'
            src={photoUrl}
            alt="img" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName +" "+ lastName}</h2>
            <p>{age+" "+gender}</p>
            <p>{about}</p>
            <div className="card-actions justify-end">
            <button className="btn bg-pink-400 text-white" onClick={()=>{handleSendRequest("ignored",_id)}}>Ignore</button>
            <button className="btn bg-violet-600 text-white" onClick={()=>{handleSendRequest("interested",_id)}}>Interested</button>
            </div>
        </div>
        </div>
     </div>
   
    
  )
}

export default UserCard