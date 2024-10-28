import React from "react";
import forest from "../images/forest.png";
import dalius from "../images/dalius.png";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { PiEyeFill } from "react-icons/pi";
import heyo from "../images/heyo.jpg";
import bird from "../images/bird.jpg";
import forex from "../images/forex.jpg";
import verse from "../images/verse.jpg";
import man from "../images/man.png";
import gert from "../images/gert.png";
import "./Secondpage.css";

// add designs

function Secondpage() {

  const content = [

    {
      image: forest,
      icon: dalius,
      label: "Dalius ",
      link: <Link className="link1">PRO</Link>,
      love: <IoMdHeart className="heart" />,
      number: "73",
      eyefill: <PiEyeFill />,
      views: "12.7k",
    },

    {
      image: heyo,
      icon: gert,
      label: "Gert",
      link: <Link className="link1">PRO</Link>,
      love: <IoMdHeart className="heart" />,
      number: "94",
      eyefill: <PiEyeFill />,
      views: "7.7k",
    },

    {
      image: bird,
      icon: man,
      label: "Bird",
      link: <Link className="link1">PRO</Link>,
      love: <IoMdHeart className="heart" />,
      number: "68",
      eyefill: <PiEyeFill />,
      views: "10.3k",
    },

    {
      image: forex,
      icon: verse,
      label: "Forex",
      link: <Link className="link1">PRO</Link>,
      love: <IoMdHeart className="heart" />,
      number: "118",
      eyefill: <PiEyeFill />,
      views: "3.2k",
    },
  ];

  return (
    <div className="pictureContainer">

      {content.map((item) => (
        <div>
          <img src={item.image} alt="" className="image" />

          <div className="firstlabel">
            <img src={item.icon} alt="" className="subimage" />
            <p className="firstpara">{item.label}</p>
            <p className="sublink">{item.link}</p>
            {item.love}
            <p className="number">{item.number}</p>
            {item.eyefill}
            <p className="number">{item.views}</p>
          </div>
        </div>
      ))}
{/* 
      <img src={forest} alt="" />
<div className="firstlabel">
  <img src={dalius} alt="" />
  <p>Dalius Stuoka l...</p>
  <p><Link>PRO</Link></p>
  <IoIosHeartEmpty />
  <p>118</p>
  <PiEyeFill />
  <p>12.7k</p>

</div>  */}
    </div>
  );
}

export default Secondpage;
