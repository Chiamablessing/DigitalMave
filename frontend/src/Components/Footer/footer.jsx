import React from "react";
import "./footer.css";
import dmLogo from '../Images/Black and White Initial D Creative Studio Logo.png'
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
      <div className="footer">
        <div className="topNav">


<div className="logo">
<img src={dmLogo} alt="" />
</div>

<div className="NavLnks">

<Link>For Designers</Link>
<Link>Hire Talents</Link>
<Link to='/inspiration'>Inspiration</Link>
<Link>Advertising</Link>
<Link to='/contactus'>Contact</Link>
<Link to='about'>About</Link>
<Link>Careers</Link>
<Link>Support</Link>


</div>

<div className="topNavIcons">
<FaFacebookSquare/>
<FaTwitter/>
<FaInstagram/>
<FaPinterest />
</div>

        </div>



        <div className="bottomNav">
          <div className="left">
          <p>@2024 DigitalMave </p>
          <Link>Terms</Link>
          <Link>Policies</Link>
          <Link>Cookies</Link>
          </div>

          <div className="right">
            <Link>Jobs</Link>
            <Link>Designers</Link>
            <Link>Freelancers</Link>
            <Link>Tags</Link>
            <Link>Places</Link>
            <Link>Resources</Link>
          </div>
        </div>
      
      </div>
    );
  };

  export default Footer;
