import React from "react";

const ContactUs = () => {
  return (
    <div
      id="contact"
      className="bg-white py-20 mt-11 flex justify-center items-center  "
    >
      <div className="map filter grayscale-20 shadow-md border-2 border-white md:flex hidden">
        <div className="md:w-1/2">
          <img src="/images/contact.png" className="max-w-[300px]" alt="" />
        </div>
      </div>

      <div className="contact-box ml-5 gap-5 bg-pink-700 flex flex-col justify-center items-center p-8 shadow-lg">
        <div className="c-heading text-center ">
          <h1 className="text-white mb-2 mt-10 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Get In Touch
          </h1>
          <p className="text-gray-100 text-sm">
            Call Or Email Us Regarding Question Or Issues
          </p>
        </div>

        <div className="c-inputs mt-6 ">
          <form className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Full Name"
              className="text-white w-64 h-12 bg-transparent border-b border-white outline-none px-4 py-2 mb-4 font-bold placeholder-white focus:placeholder-gray-300"
            />

            <input
              type="email"
              placeholder="Example@gmail.com"
              className="text-white w-64 h-12 bg-transparent border-b border-white outline-none px-4 py-2 mb-4 font-bold placeholder-white focus:placeholder-gray-300"
            />
            <textarea
              name="message"
              placeholder="Write Message"
              className="text-white w-64 h-12 bg-transparent border-b border-white outline-none px-4 py-2 mb-4 font-bold placeholder-white focus:placeholder-gray-300"
            ></textarea>

            <button className="w-48 h-12 bg-white text-black border-none outline-none rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              SEND
            </button>
          </form>
        </div>
      </div>

      <div className="social flex flex-col justify-center items-center shadow-lg">
        <a href="#" className="p-5 text-gray-700 hover:text-black">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="p-5 text-gray-700 hover:text-black">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="p-5 text-gray-700 hover:text-black">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="p-5 text-gray-700 hover:text-black">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>

      <iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12714537.889862413!2d2.6769328726172697!3d9.07775112217132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041d94f43762a3b%3A0x7a09a4bd63e98fc3!2sNigeria!5e0!3m2!1sen!2sng!4v1713327063508!5m2!1sen!2sng"
        width="full"
        height="400"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default ContactUs;
