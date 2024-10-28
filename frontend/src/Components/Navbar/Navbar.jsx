import React from 'react';
import { FaBars, FaTimes,FaAngleDown, FaSearch } from 'react-icons/fa';
import {useState} from 'react'
import './Navbar.css'
// import Logo from '../Image/dribbleLogo.png'
import dmLogo from '../images/Black and White Initial D Creative Studio Logo.png'
import { Link } from 'react-router-dom';
const Navbar = (openTheme) => {

    const [openNav, setOpenNav] = useState(false);
    const toggleNav = () =>{
        setOpenNav(!openNav)
    }

  return (


    <div className='Navigation'>


<div className="leftNav">

<div className="menuBarNavAlign">

<div className="Leading" onClick={toggleNav}>
{openNav ? <FaTimes/>: <FaBars/>}
</div>

<Link to='/' className="dribbleLogo">
<img src={dmLogo} className='logoPic' />
</Link>

</div>

<nav className={openNav ? 'open': ''}>

    <ul className='hoveredLinky'>
        <Link to="" className='hoveredLink'>Find designers <FaAngleDown className='angleDown'/>
        <div className="dropDown">
        <ul className='drops'>

            <Link to="/inspiration">
                <p className='topDrops'>Designer Search</p>
                <p className='bottomDrops'>Quickly find your next Designer</p>
                </Link>


            <Link to="/jobs">
                <p className='topDrops'>Post a Job</p>
                <p className='bottomDrops'>The #1 job board design talent</p>
            </Link>

        </ul>
    </div>


        </Link>
        <Link to="/inspiration">Inspiration</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="">Go pro</Link>
    </ul>
    <div className="LoginLink">
        <Link to="">Log In</Link>
    </div>



</nav>
</div>


<div className="rightNav">
    <div className="inputfield">
        <FaSearch className='inputIcon'/>
        <input type="search" placeholder='search...'/>
    </div>

    <div className="search">
        <FaSearch  />
    </div>

    <div className="Login">
        <Link to="">Log in</Link>
    </div>

    <div className="signUpBtn">
        <button type='submit'>Sign up</button>
    </div>
</div>









    </div>
  )
}

export default Navbar
