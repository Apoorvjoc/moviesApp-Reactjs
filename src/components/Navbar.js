import React from 'react'
import Logo from "../images/logo.png"
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className='border flex space-x-8 items-center pl-12 py-4'>
      <img src={Logo}/>
      <Link to="/" className='text-blue-400 font-bold text-3xl'>Movies</Link>
      <Link to = "/fav"className='text-blue-400 font-bold text-3xl'>Favourites</Link>
    </div>
  )
}

export default Navbar
