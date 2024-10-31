import React from 'react'
import './Fourthpage.css'
import emote from "../Images/emote.jpg"
import yagi from "../Images/yagi.png"
import jay from "../Images/jay.png"
import rumen from "../Images/rumen.png"
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { PiEyeFill } from "react-icons/pi";
import icon5 from "../Images/icon5.jpg";
import icon6 from "../Images/icon6.png";
import icon7 from "../Images/icon7.jpg";
import icon8 from "../Images/icon8.jpg";

function Fourthpage() {

    const cover = [
        {
          image: emote,
          icon: icon5,
          label: "emote",
          link: <Link className="link1">PRO</Link>,
          love: <IoMdHeart className="heart" />,
          number: "293",
          eyefill: <PiEyeFill />,
          views: "25.7k",
        },

        {
          image: yagi,
          icon: icon6,
          label: "yagi",
          link: <Link className="link1">PRO</Link>,
          love: <IoMdHeart className="heart" />,
          number: "734",
          eyefill: <PiEyeFill />,
          views: "45.7k",
        },

        {
          image: jay,
          icon: icon7,
          label: "jay",
          link: <Link className="link1">PRO</Link>,
          love: <IoMdHeart className="heart" />,
          number: "468",
          eyefill: <PiEyeFill />,
          views: "9.3k",
        },

        {
          image: rumen,
          icon: icon8,
          label: "rumen",
          link: <Link className="link1">PRO</Link>,
          love: <IoMdHeart className="heart" />,
          number: "118",
          eyefill: <PiEyeFill />,
          views: "56.2k",
        },
      ];
  return (
    <div className='pictureContainer'>

      {cover.map((hold) => (
        <div>
          <img src={hold.image} alt="" className="image" />

          <div className="firstlabel">
            <img src={hold.icon} alt="" className="subimage" />
            <p className="firstpara">{hold.label}</p>
            <p className="sublink">{hold.link}</p>
            {hold.love}
            <p className="number">{hold.number}</p>
            {hold.eyefill}
            <p className="number">{hold.views}</p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Fourthpage
