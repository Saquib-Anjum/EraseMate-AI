import React from 'react'
import {assets} from '../assets/assets'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className ='flex items-center justify-between mx-4 py-3 lg:mx-44'>
     <Link to='/'> <img src={assets.EraseMateAI} alt="" className='w-40 sm:w-50'/></Link>
      <button className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'>Get Started <img src={assets.arrow_icon} alt="" className=''/></button>
    </div>
  )
}

export default Navbar
