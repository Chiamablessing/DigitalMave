import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-[#FCFCFC] ">
      <div className="section flex flex-row ml-24">
        <div className="container px-4 md:px-0 py-20 flex flex-row">
          <div className="content-section w-full md:w-3/5">
            <div className="title">
              <h1 className="text-3xl md:text-4xl text-green-700 font-bold uppercase">
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
              src="images/about1.png"
              alt=""
              className="w-full h-auto md:mx-auto md:my-0 max-w-[400px]"
            />
          </div>
        </div>
      </div>

      <div className="section flex flex-row ml-10 gap-20">
        <div className="image-section w-full md:w-2/5">
          <img
            src="images/about2.png"
            alt=""
            className="w-full h-auto md:mx-auto md:my-0 max-w-[270px]"
          />
        </div>
        <div className="container px-4 md:px-0 py-10 flex flex-row">
          <div className="content-section w-full md:w-3/5">
            <div className="title">
              <h1 className="text-3xl md:text-4xl text-green-700 font-bold uppercase">
                FreelySlah
              </h1>
            </div>
            <div className="content mt-6">
              <h2 className="text-xl md:text-2xl text-gray-700 font-bold">
                The most trusted cryptocurrency
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600">
                Our journey began with a simple yet powerful idea: to create a
                platform that empowers individuals and businesses alike. At
                FreelySlah, we believe in the potential of technology to bridge
                gaps and create opportunities. From freelancers looking to offer
                their services to businesses aiming to reach a broader audience,
                our platform is designed to meet diverse needs. Join us as we
                continue to innovate and push the boundaries of what’s possible.
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
