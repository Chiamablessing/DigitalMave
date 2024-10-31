import React from "react";
import Image1 from '../../Components/Images/about2.png'
import Image2 from '../../Components/Images/rumen.png'
const AboutUs = () => {
  return (
    <div className="bg-[#FCFCFC] ">
      <div className="section flex flex-row ml-24">
        <div className="container px-4 md:px-0 py-20 flex flex-row">
          <div className="content-section w-full md:w-3/5">
            <div className="title">
              <h1 className="text-3xl md:text-4xl text-black-700 font-bold uppercase">
                DigitalMave
              </h1>
            </div>
            <div className="content mt-6">
              <h2 className="text-xl md:text-2xl text-gray-700 font-bold">
              The world’s destination
              for design
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600">
                We are DigitalMave, dedicated to revolutionizing the freelancing
                and e-commerce landscape. Our platform combines the flexibility
                of freelancing with a robust marketplace for selling products.
                We’re on a mission to build the world’s best community for creatives to share, grow, and get hired.
              </p>
            </div>
            <div className="social mt-8">
              <a href="#" className="mr-4">
                <i className="fab fa-facebook-f text-gray-600 hover:text-gray-900"></i>
              </a>
              <a href="#" className="mr-4">
                <i className="fab fa-instagram text-gray-600 hover:text-gray-900"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube text-gray-600 hover:text-gray-900"></i>
              </a>
            </div>
          </div>
          <div className="image-section w-full md:w-2/5">
            <img
              src={Image1}
              alt=""
              className="w-full h-auto md:mx-auto md:my-0 max-w-[400px]"
            />
          </div>
        </div>
      </div>

      <div className="section flex flex-row ml-10 gap-20">
        <div className="image-section w-full md:w-2/5">
          <img
            src={Image2}
            alt=""
            className="w-full h-auto md:mx-auto md:my-0 max-w-[270px]"
          />
        </div>
        <div className="container px-4 md:px-0 py-10 flex flex-row">
          <div className="content-section w-full md:w-3/5">
            <div className="title">
              <h1 className="text-3xl md:text-4xl text-black-700 font-bold uppercase">
              Over 1 trillion pixels shared. What are you working on?
              </h1>
            </div>
            <div className="content mt-6">
              <h2 className="text-xl md:text-2xl text-gray-700 font-bold">
              Get to know us
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600">
              DigitalMave is a 100% remote team. We believe that creative collaboration can happen anywhere and want our team to work
              where they feel most comfortable and inspired
              <br />Hundreds of millions of people look for design inspiration and feedback on DigitalMav.
              We help players like you share small screenshots (shots) to show off your current projects, boost your portfolio,
              and love what you do—no matter what kind of creative professional you are.
              </p>
            </div>
            <div className="social mt-8">
              <a href="#" className="mr-4">
                <i className="fab fa-facebook-f text-gray-600 hover:text-gray-900"></i>
              </a>
              <a href="#" className="mr-4">
                <i className="fab fa-instagram text-gray-600 hover:text-gray-900"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube text-gray-600 hover:text-gray-900"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
