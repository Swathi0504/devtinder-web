import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {

  const dispatch =useDispatch();
  const requests =useSelector((store)=>store.requests)  
  const fetchRequests = async () => {
     try {
        const res = await axios.get(BASE_URL+"/user/requests/received",{
            withCredentials:true
        })
        dispatch(addRequests(res?.data));
     }
     catch(err) {
       //error handling
     }
  }
  
  const reviewRequests = async (status,id) => {
    try {
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},
        {withCredentials:true}
      );
      dispatch(removeRequest(id));
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
     fetchRequests();
  },[])

  if(!requests) return;

  if(requests.length===0) {
    return <><h1>No requests received!!</h1></>
  }
    
  return requests && (
    <>
       <div className='text-center mt-4'>
         <h1 className="text-3xl text-cyan-900 font-semibold">Your Requests</h1>
         {
          requests.map((request)=>{
             
            const {firstName,lastName,photoUrl,age,gender,about} = request.fromUserId;

            return (
              <div className=''>
              <div className='flex justify-center'>
                <div className="card card-side w-[800px] m-4 bg-base-100 shadow-xl">
                  <figure className='w-[300px]'>
                    <img
                      src={photoUrl}
                      alt="Movie" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{firstName+" "+lastName}</h2>
                    <p className='text-left'>{age+", "+gender}</p>
                    <p className='text-left'>{about}</p>
                    <div className="card-actions justify-end">
                      <button className="btn text-white bg-violet-500" onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
                      <button className="btn text-white bg-fuchsia-500" onClick={()=>reviewRequests("rejected",request._id)}>Reject</button>
                    </div>
                  </div>
              </div>
              </div>
              </div>
            )
          })
         }
         </div>
    </>
  )
}

export default Requests