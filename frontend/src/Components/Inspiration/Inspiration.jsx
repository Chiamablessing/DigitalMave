import React from "react";
import { BsArrowDown } from "react-icons/bs";
import logo from "../images/logo.png";
import "./Inspiration.css";
import { Link } from "react-router-dom";
import { BsDashLg } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

function Inspiration() {
  return (
    <div className="main">
      <div className="maininspiration">
        <p className="firstparagraph">
          Build high quantity sites and smarter with Webflow
        </p>
        <button className="firstbutton">
          Get started
          <BsDashLg className="secondicon" />
          it`s free
          <BsArrowDown className="firsticon" />{" "}
        </button>

        <img src={logo} alt="" />

        <FaRegCircleXmark className="icon" />
      </div>

      <div className="line2">
      <div className="subpara">
        <h1 className="firstheading">Discover the world's top</h1>
        <h1 className="secondheading">designers & creatives</h1>
      </div>
      <div className="subparatwo">
      <p className="secondparagraph">
        Dribbble is the leading destination to find & showcase creative work and
      </p>
      <p className="thirdparagraph">
        home to the world's best design professionals.
      </p>

      </div>

      </div>

      <input
        type="text"
        placeholder="Search 18 million+ shots..."
        className="firstinput"
      />
      <CiSearch className="search" />

      <div className="container">
        <p>Trending searches</p>
        <button className="secondbtn">
          <Link className="link">landing page</Link>
        </button>
        <button className="thirdbtn">
          <Link className="link">ios</Link>
        </button>
        <button className="fourthbtn">
          <Link className="link">food</Link>
        </button>
        <button className="fivthbtn">
          <Link className="link">landingpage</Link>
        </button>
        <button className="sixthbtn">
          <Link className="link">uxdesign</Link>
        </button>
        <button className="seventhbtn">
          <Link className="link">app design</Link>
        </button>
      </div>

      <div className="secondContainer">
        <button className="subSecondbtn">
          <Link className="link">Popular</Link>
          <IoIosArrowDown className="btnicon1" />
        </button>


        <div className="subsecondContainer">
          <button className="subbtn2">
            <Link className="link">Discover</Link>
          </button>
          <p>
            <Link className="link">Animation</Link>
          </p>
          <p>
            <Link className="link">Branding</Link>
          </p>
          <p>
            <Link className="link">Illustration</Link>
          </p>
          <p>
            <Link className="link">Mobile</Link>
          </p>
          <p>
            <Link className="link">Print</Link>
          </p>
          <p>
            <Link className="link">PrDesign</Link>
          </p>
          <p>
            <Link className="link">Typograph</Link>
          </p>
        </div>

        <button className="subbtn3">
          <Link className="link">Filters</Link>
        </button>
      </div>



    </div>
  );
}

export default Inspiration;
