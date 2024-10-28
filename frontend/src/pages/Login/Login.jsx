import React, { useState, useEffect, useRef, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../../firebase.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export const Login = () => {
  const { updateUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        email,
        password,
      });
      //localStorage.setItem("currentUser", JSON.stringify(res.data));
      updateUser(res.data);
      // Show success notification
      toast.success("Logged in successfully", { position: "top-right" });
      setTimeout(() => {
        navigate("/welcome");
      }, 2000);
    } catch (err) {
      setError(err.response.data);
      // Show error use state variable or error notification string
      toast.error(error || "Could not login", { position: "top-right" });
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      const { user } = res;
      const { email, displayName, photoURL } = user;
      const res1 = await newRequest.post("/auth/google", {
        email,
        name: displayName,
        img: photoURL,
        country: "Algeria",
        isOnline: true,
      });
      //localStorage.setItem("currentUser", JSON.stringify(res1.data));
      updateUser(res1.data);

      // to show success notification
      toast.success("Logged in successfully", { position: "top-right" });
      setTimeout(() => {
        navigate("/welcome");
      }, 2000);
    } catch (err) {
      console.log("could not login with google", err);
      setError(err.response.data);

      // Show error use state variable or error notification string
      toast.error(error || "Could not login with google", {
        position: "top-right",
      });
    }
  };

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [timer, setTimer] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: () => setTimer(0),
    prevArrow: null, // Remove the left arrow
    nextArrow: null, // Remove the right arrow
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) =>
        prevTimer < 5 ? prevTimer + 1 : handleNextSlide()
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    sliderRef.current.slickNext();
    setTimer(0);
  };

  const handlePointClick = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index);
    setTimer(0);
  };

  return (
    // Container
    <div className="bg-[#fcfcfc] flex justify-center items-center h-screen w-full relative">
      {/* <!-- Left: Login Form --> */}
      <div className=" w-full h-screen lg:w-3/5 flex flex-col justify-between items-center">
        <div className="flex items-center flex-row justify-between p-6 bg-[#fcfcfc]  w-full ">
          {/* Login Header */}
          <div>
            <a href="/home">
              <img
                src="/src/assets/images/home/Logo.PNG"
                alt="FreelySlah"
                className="max-w-[80px]"
              />
            </a>
          </div>
          <div>
            <span className="text-[#8a8a8a] font-normal mr-2 text-sm hidden sm:inline">
              Are you new?
            </span>
            <a
              className="cursor-pointer text-sm font-semibold text-[#6941c6]"
              href="/signup"
            >
              Get an invite
            </a>
          </div>
        </div>

        {/* Login main */}

        <div className="flex-1 w-full pt-6 px-5 pb-12 flex items-center">
          <div className="w-full">
            <h4 className="max-w-[450px] mx-auto text-[#333] text-2xl font-normal mb-6">
              Sign into your account
            </h4>
            <form onSubmit={handleSubmit}>
              {/* <!-- Email Input --> */}
              <div className="max-w-[450px] mx-auto">
                <label
                  htmlFor="email"
                  className="text-[#344054] text-xs font-normal mb-1 inline-block"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <!-- Password Input --> */}
              <div className="max-w-[450px] mx-auto mt-3 leading-normal">
                <label
                  htmlFor="password"
                  className="text-[#344054] text-xs font-normal mb-1 inline-block"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "password" : "text"}
                    id="password"
                    name="password"
                    minLength={8}
                    className="input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3] "
                    placeholder="Password (min 8 characters)"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute top-0 right-0 bottom-0 flex items-center justify-center w-8 cursor-pointer"
                    onClick={handleShow}
                  >
                    {show ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between max-w-[450px] mx-auto">
                {/* <!-- Remember Me Checkbox --> */}
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="w-3 h-3 text-blue-600"
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-600 ml-2 text-xs"
                  >
                    Remember Me
                  </label>
                </div>

                {/* <!-- Forgot Password Link --> */}
                <div className="text-blue-500 font-medium">
                  <a
                    href="#"
                    className="hover:underline text-xs text-[#6941C6]"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* <!-- Login Button --> */}
              <div className="max-w-[450px] mx-auto mt-4">
                <button
                  type="submit"
                  className="text-white !bg-[#0E9F6E]  hover:!bg-[#046c4e] font-semibold rounded-md py-2 px-4 w-full tracking-[0.05em]"
                >
                  Login
                </button>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                {/* Handle notifications */}
                <ToastContainer />
              </div>
            </form>

            {/* <!-- OR Separator --> */}

            <div className="mt-10 grid grid-cols-3 items-center text-gray-500 max-w-[450px] mx-auto">
              <hr className="outline-gray-400" />
              <p className="text-center text-sm">Or continue with</p>
              <hr className="outline-gray-400" />
            </div>

            {/* <!-- Google Login --> */}
            <div className="mt-2 flex items-center justify-between max-w-[450px] mx-auto">
              <button
                className="font-medium bg-white shadow-bshadow border py-2 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:bg-gray-200 focus:outline-none"
                type="button"
                onClick={handleGoogleClick}
              >
                {/* <!-- google logo svg --> */}
                <svg
                  className="mr-3"
                  viewBox="0 0 48 48"
                  width="20px"
                  height="25px"
                >
                  <title>Google Logo</title>
                  <clipPath id="g">
                    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                  </clipPath>
                  <g className="colors" clipPath="url(#g)">
                    <path fill="#FBBC05" d="M0 37V11l17 13z" />
                    <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                    <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                    <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Right: Image --> */}
      <div
        className="w-2/5 h-screen hidden border-l-2 border-[#f0f0f0] relative lg:flex lg:flex-col lg:justify-between  bg-[#F7F6FB]"
        // style={{ background: "linear-gradient(45deg, #F7F6FB, #F7F6FB)" }}
      >
        {/* <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        /> */}
        {/* <div className="h-full! h-screen! w-full flex flex-col justify-between"> */}
        <Slider
          ref={sliderRef}
          {...settings}
          className="w-full max-w-xl m-auto"
        >
          <div className="p-6 text-center h-full">
            <div className="w-5/6 h-80 mt-5 mb-8 m-auto">
              <img
                src="/src/assets/pic1.png"
                alt="image"
                className="w-full h-full m-auto"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Unleash Your Potential
              </h3>
              <p className="text-gray-600 text-sm">
                FreelySlah is a leading freelancing platform that connects
                skilled professionals with clients worldwide, empowering you to
                unlock your full potential and grow your career.
              </p>
            </div>
          </div>
          <div className="p-5 text-center h-full">
            <div className="w-9/12 h-80 mt-5 mb-8 m-auto pt-14">
              <img
                src="/src/assets/pic2.png"
                alt="image"
                className="w-full m-auto"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Explore Global Opportunities
              </h3>
              <p className="text-gray-600 text-sm">
                With FreelySlah, you can access a wide range of freelance
                projects from clients around the globe, expanding your horizons
                and allowing you to showcase your talents on a global stages
              </p>
            </div>
          </div>
          <div className="p-5 text-center h-full">
            <div className="w-9/12 h-80 mt-5 mb-8 m-auto">
              <img
                src="/src/assets/secure.png"
                alt="image"
                className=" h-full m-auto"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Flexible and Secure
              </h3>
              <p className="text-gray-600 text-sm">
                Our platform provides a flexible and secure environment,
                ensuring seamless collaboration, transparent communication, and
                secure payments for both freelancers and clients.
              </p>
            </div>
          </div>
        </Slider>
        <div className="flex justify-center points-container mb-8">
          {[0, 1, 2].map((index) => (
            <div
              className={`point ${
                currentSlide === index ? "active-point" : ""
              }`}
              key={index}
              onClick={() => handlePointClick(index)}
            >
              {currentSlide === index && (
                <div
                  className="progress"
                  style={{ width: `${(timer / 5) * 100}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
};
export default Login;
