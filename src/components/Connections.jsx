import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
const Connections = () => {
  const connections = useSelector((store)=>store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async ()=>{
    try 
    {
      const res = await axios.get(BASE_URL+"/user/connections",
        {withCredentials:true}
      )
      dispatch(addConnections(res?.data?.data));
      
     // console.log(connections);
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
     fetchConnections();
  },[])

  if(!connections) return;

  if(connections.length===0) {
    return <><h1>No connections made!!</h1></>
  }

  return (
    <>
       <div className='text-center mt-4'>
         <h1 className="text-3xl text-cyan-900 font-semibold">Connections</h1>
         {
          connections.map((connection)=>{
             
            const {firstName,lastName,photoUrl,age,gender,about} = connection;

            return (
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
                      <button className="btn text-white bg-red-950">Chat</button>
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

export default Connections