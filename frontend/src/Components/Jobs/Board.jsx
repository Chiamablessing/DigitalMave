import React from "react";
import "./Board.css";
import { LuPlus } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoFlashOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import first from "../../assets/noori.png";

const jobPosts = [
  { company: "nooro", role: "Senior UX/UI designer", location: "Remote" },
  { company: "Poxify", role: "Senior Product Designer", location: "Remote" },
  { company: "Zello", role: "Senior UX/UI designer", location: "Remote" },
  { company: "Brightwave", role: "Founding Product Designer", location: "Remote" },
  { company: "Justplay", role: "Lead Product Designer", location: "Remote" },
  { company: "Justplay", role: "Lead Product Designer", location: "Remote" },
  { company: "SchoolCal", role: "UX/UI Redesign for SaaS", location: "Remote" },
  { company: "Brightwave", role: "Founding Product Designer", location: "Remote" },
  { company: "Boo", role: "UI Designer - Remote", location: "Remote" },
  { company: "Awesomic", role: "Senior UI/UX Designer", location: "Remote" },
  { company: "Kreatives", role: "Senior Motion Designer", location: "Remote" },
  { company: "Wirestock", role: "Freelance Character Artist", location: "Remote" },
  { company: "Ajax Creative", role: "Freelance Motion ", location: "Remote" },
  { company: "Smart Coach", role: "Figma website ", location: "Remote" },
  { company: "Work & Co", role: "Associate Design Director", location: "Remote" },
];

const Board = () => {
  return (
    <div className="main-container">
      <div className="container">
        <h1>The #1 Job Board for graphic design Jobs</h1>
        <p className="first-banner">
          DigitalMaven is the heart of the creative community and the best resource to
          discover and connect with designers and jobs worldwide.
        </p>
        <button className="first-btn">
          <LuPlus /> Post a Job
        </button>
      </div>

      <div className="first-links">
        <a href="#" className="link1">Job board</a>
        <a href="#" className="link2">Designer Search</a>
      </div>

      <div className="Second-container">
        <div className="recent-posts">
          <div className="input-content">
            <IoSearch className="icons" />
            <input type="text" placeholder="Search by company, skill, tag..." className="inputes" />
          </div>
          <div className="posts">
            <h3>Recent Posts</h3>
            <p className="text">1 new opportunity posted today!</p>
          </div>

          {jobPosts.map((job, index) => (
            <div className="posted-today" key={index}>
              <img src={first} alt={job.company} />
              <div className="middle-info">
                <p className="info1">
                  {job.company} <IoFlashOutline className="icon2" />
                </p>
                <p className="info2">{job.role}</p>
              </div>
              <div className="right-info">
                <a href="#" className="link3">FEATURED</a>
                <a href="#" className="link4">
                  <CiLocationOn className="icon3" /> {job.location}
                </a>
              </div>
            </div>
          ))}
        </div>


<div className="third-container">
  <div className="sub-div">
  <h2>Specialties</h2>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Animation</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Brand / Graphic Design</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Illustration</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Leadership</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Mobile Design</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>UI / Visual Design
  </p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Product Design</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>UX Design / Research</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Web Design</p>
  </div>
  </div>
  <hr />

  <h4>Location</h4>
  <input type="text" placeholder="Enter Location" className="input2" />
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Open to remote</p>
  </div>
  <hr />
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Full-Time</p>
  </div>
  <div className="checkbox">
  <input type="checkbox" className="check" />
  <p>Freelance/Contract</p>
  </div>
  <button className="second-btn">Filter</button>
</div>
      </div>
    </div>
  );
};

export default Board;
