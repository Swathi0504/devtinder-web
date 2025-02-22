import React from 'react'

const UserCard = ({user}) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;
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
            <button className="btn bg-pink-400 text-white">Ignore</button>
            <button className="btn bg-violet-600 text-white">Interested</button>
            </div>
        </div>
        </div>
     </div>
   
    
  )
}

export default UserCard