import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Navbar = () => {

  const user = useSelector((store) => store.user)
  return (
    <div className="navbar bg-neutral-content">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🖥️ DevTinder</Link>
  </div>
  {user && (<div className="flex-none gap-2">
    <p className='mr-4'>Welcome, {user.firstName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default Navbar