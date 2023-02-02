import React from 'react'
import {Link} from 'react-router-dom'

import Logo from 'assets/logo-yellow.png'   

const Navbar = () => {
  return (
    <div className="navbar h-10 bg-[#0F4C75] shadow sticky top-0 z-50">
      <div className="navbar-start">        
        <Link to='/' className="btn btn-ghost normal-case text-md">
        <img src={Logo} alt="logo-app" className="w-[42px]" />
        </Link>
      </div>
      <div className="navbar-center">
        <p className='uppercase text-xl font-bold text-[#FFC909]'>timesync</p>
      </div>
      <div className="navbar-end mr-10">
        <p className='capitalize text-md font-normal text-[#FFC909]'>aryo yudhanto
            {/* {
                cookie.name? cookie.name : null
            } */}
        </p>
      </div>
    </div>
  )
}

export default Navbar