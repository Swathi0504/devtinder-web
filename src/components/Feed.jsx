import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard';

const Feed = () => {
  
  const feed = useSelector((store)=>store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL+"/users/feed",{
        withCredentials: true,
      })
      dispatch(addFeed(res?.data))
      console.log(res)
    }
    catch(err){
       //Error handling
       console.log(err);
    }
  }
  
  useEffect(()=>{
    console.log(feed);
    getFeed();
  },[])

  
  return feed && (
      <UserCard user={feed[0]}/>
  ) 
}

export default Feed