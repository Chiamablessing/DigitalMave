import React, { useState } from "react";
import { Country } from "country-state-city";
import "./Signup.css";
import newRequest from "../../utils/newRequest";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
  });

  const getCountryName = (isoCode) => {
    const country = Country.getCountryByCode(isoCode);
    return country ? country.name : "N/A";
  };

  //handle all notifications

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user1 = result.user;
      console.log(user1);
      await newRequest.post("/auth/google", {
        email: user1.email,
        name: user1.displayName,
        img: user1.photoURL,
        country: "Algeria",
      });

      // Show success notification
      toast.success("Signup successful!", { position: "top-right" });
    } catch (err) {
      console.log("could not login with google", err);
      setError(err.response.data);
      // Show error notification
      toast.error(error || "Signup failed. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    user.country = getCountryName(user.country);

    try {
      await newRequest.post("/auth/register", {
        ...user,
        username: `${user.fname}_${user.lname}`,
      });
      // navigate("/");
      // Show success notification
      toast.success("Signup successful!", { position: "top-right" });
    } catch (err) {
      setError(err.response.data);
      // Show error notification
      toast.error(error || "Signup failed. Please try again.", {
        position: "top-right",
      });
    }
  };

  let countryData = Country.getAllCountries();
  //   console.log(countryData);

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    // Container
    <div className="bg-[#FCFCFC] flex justify-center items-center h-screen w-full relative ">
      {/* <!-- Right: Login Form --> */}
      <div className=" w-full h-screen lg:w-2/3 flex flex-col justify-between items-center">
        <div className="flex items-center flex-row justify-between p-6 bg-[#fcfcfc]   w-full ">
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
              Already registered ?
            </span>
            <a
              className="cursor-pointer text-sm font-semibold text-[#6941c6]"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>

        {/* Signup main */}

        <div className="scroll-signup flex-1  w-full pt-6 px-5 pb-12 overflow-y-scroll min-h-minus-72">
          <h4 className="max-w-[450px] mx-auto text-[#333] text-2xl font-normal mb-6">
            Create an account
          </h4>
          {/* <!-- Google Login --> */}
          <div className="flex items-center justify-between max-w-[450px] mx-auto">
            <button
              className="font-medium bg-white shadow-bshadow border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:bg-gray-100 focus:outline-none"
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
          {/* <!-- OR Separator --> */}

          <div className="mt-5 mb-4 grid grid-cols-3 items-center text-gray-500 max-w-[450px] mx-auto">
            <hr className="outline-gray-400" />
            <p className="text-center text-sm">Or continue with</p>
            <hr className="outline-gray-400" />
          </div>

          <form onSubmit={handleSubmit}>
            {/* <!-- First Name Input --> */}
            <div className="max-w-[450px] mx-auto flex flex-row justify-between items-center mb-3">
              <div className="w-[48%]">
                <label
                  htmlFor="fname"
                  className="text-[#344054] text-xs font-normal mb-1 inline-block"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  placeholder="First name"
                  onChange={handleChange}
                />
              </div>
              {/* <!-- Last Name Input --> */}
              <div className="w-[48%]">
                <label
                  htmlFor="lname"
                  className="text-[#344054] text-xs font-normal mb-1 inline-block"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  placeholder="Last name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="max-w-[450px] mx-auto">
              <label
                htmlFor="email"
                className="text-[#344054] text-xs font-normal mb-1 inline-block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                placeholder="your@email.com"
                onChange={handleChange}
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
                  onChange={handleChange}
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
            {/* <!-- Country Input --> */}
            <div className="max-w-[450px] mx-auto mt-3 leading-normal">
              <label
                htmlFor="country"
                className="text-[#344054] text-xs font-normal mb-1 inline-block"
              >
                Country
              </label>

              <select
                id="country"
                name="country"
                onChange={handleChange}
                className="input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3] "
              >
                <option value="">Select Country</option>
                {countryData.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <!-- Terms checkbox --> */}
            <div className="mt-4 mb-5 max-w-[450px] mx-auto flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="w-3 h-3 text-blue-600"
              />
              <label htmlFor="terms" className="text-gray-600 ml-2 text-xs">
                Yes, I agree to FreelySlah’s{" "}
                <a href="" className="text-[#6941c6]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="" className="text-[#6941c6]">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* <!-- Signup Button --> */}
            <div className="max-w-[450px] mx-auto mt-4">
              <button
                type="submit"
                className="text-white text-sm w-fit !bg-[#0E9F6E]  hover:!bg-[#046c4e] font-semibold rounded-md py-2 px-4 tracking-[0.05em]"
              >
                Signup
              </button>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

              {/* Handle notifications */}
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>

      {/* <!-- Right: Image --> */}
      <div className="w-1/3 h-screen hidden border-l-2 border-[#f0f0f0] relative lg:flex lg:flex-col lg:justify-between">
        <div className="relative h-full">
          <img
            src="/src/assets/bg4.png"
            alt="Background Image"
            className="object-cover w-full h-full"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0e9f6e] to-[#0e9f6e] opacity-90"></div> */}
          <div className="absolute inset-0 flex flex-col justify-center text-white p-6 pt-10">
            <h4 className="text-sm font-semibold mb-4 inline-block w-fit h-fit px-4 py-5 relative z-10 overflow-hidden rounded text-left">
              Explore a universe of skilled professionals Talents
              <span className="inline-flex ml-2 mr-1">
                <img
                  alt="svgImg"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CjxwYXRoIGZpbGw9IiNmZmE2MDIiIGQ9Ik00OC44NDcsMjQuNTI5bDguOTIzLDMuNzgzYzEuOTMyLDAuODE5LDEuOTMyLDMuNTU3LDAsNC4zNzZsLTguOTIzLDMuNzgzCWMtMS4xMzUsMC40ODEtMi4wMzksMS4zODUtMi41MjEsMi41MjFsLTMuNzgzLDguOTIzYy0wLjgxOSwxLjkzMi0zLjU1NywxLjkzMi00LjM3NiwwbC0zLjc4My04LjkyMwljLTAuNDgxLTEuMTM1LTEuMzg1LTIuMDM5LTIuNTIxLTIuNTIxbC04LjkyMy0zLjc4M2MtMS45MzItMC44MTktMS45MzItMy41NTcsMC00LjM3Nmw4LjkyMy0zLjc4MwljMS4xMzUtMC40ODEsMi4wMzktMS4zODUsMi41MjEtMi41MjFsMy43ODMtOC45MjNjMC44MTktMS45MzIsMy41NTctMS45MzIsNC4zNzYsMGwzLjc4Myw4LjkyMwlDNDYuODA4LDIzLjE0NCw0Ny43MTIsMjQuMDQ4LDQ4Ljg0NywyNC41Mjl6Ij48L3BhdGg+PGVsbGlwc2UgY3g9IjMyIiBjeT0iNjEiIG9wYWNpdHk9Ii4zIiByeD0iMjIuNSIgcnk9IjMiPjwvZWxsaXBzZT48cGF0aCBmaWxsPSIjZmZhNjAyIiBkPSJNMjIuMDYsMTQuMDQ4bDQuOTQzLDIuMDk2YzEuMDcsMC40NTQsMS4wNywxLjk3LDAsMi40MjRsLTQuOTQzLDIuMDk2CWMtMC42MjksMC4yNjctMS4xMywwLjc2Ny0xLjM5NiwxLjM5NmwtMi4wOTYsNC45NDNjLTAuNDU0LDEuMDctMS45NywxLjA3LTIuNDI0LDBsLTIuMDk2LTQuOTQzCWMtMC4yNjctMC42MjktMC43NjctMS4xMy0xLjM5Ni0xLjM5NmwtNC45NDMtMi4wOTZjLTEuMDctMC40NTQtMS4wNy0xLjk3LDAtMi40MjRsNC45NDMtMi4wOTZjMC42MjktMC4yNjcsMS4xMy0wLjc2NywxLjM5Ni0xLjM5NglsMi4wOTYtNC45NDNjMC40NTQtMS4wNywxLjk3LTEuMDcsMi40MjQsMGwyLjA5Niw0Ljk0M0MyMC45MywxMy4yODEsMjEuNDMxLDEzLjc4MiwyMi4wNiwxNC4wNDh6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2ZmYTYwMiIgZD0iTTIyLjA2LDQxLjA0OGw0Ljk0MywyLjA5NmMxLjA3LDAuNDU0LDEuMDcsMS45NywwLDIuNDI0bC00Ljk0MywyLjA5NgljLTAuNjI5LDAuMjY3LTEuMTMsMC43NjctMS4zOTYsMS4zOTZsLTIuMDk2LDQuOTQzYy0wLjQ1NCwxLjA3LTEuOTcsMS4wNy0yLjQyNCwwbC0yLjA5Ni00Ljk0MwljLTAuMjY3LTAuNjI5LTAuNzY3LTEuMTMtMS4zOTYtMS4zOTZsLTQuOTQzLTIuMDk2Yy0xLjA3LTAuNDU0LTEuMDctMS45NywwLTIuNDI0bDQuOTQzLTIuMDk2YzAuNjI5LTAuMjY3LDEuMTMtMC43NjcsMS4zOTYtMS4zOTYJbDIuMDk2LTQuOTQzYzAuNDU0LTEuMDcsMS45Ny0xLjA3LDIuNDI0LDBsMi4wOTYsNC45NDNDMjAuOTMsNDAuMjgxLDIxLjQzMSw0MC43ODIsMjIuMDYsNDEuMDQ4eiI+PC9wYXRoPjxwYXRoIGQ9Ik01Ny43NywyOC4zMTJsLTEuMTM1LTAuNDgxYy0wLjI3NCwwLjA2NS0wLjU0OCwwLjE0LTAuODE3LDAuMjU0bC04LjkyMywzLjc4MyBjLTIuMzQyLDAuOTkzLTQuMTc4LDIuODMtNS4xNzIsNS4xNzJsLTMuNzgzLDguOTIzYy0wLjExNCwwLjI2OC0wLjE4OSwwLjU0My0wLjI1MywwLjgxN2wwLjQ4MSwxLjEzNCBjMC44MTksMS45MzIsMy41NTcsMS45MzIsNC4zNzYsMGwzLjc4My04LjkyM2MwLjQ4MS0xLjEzNSwxLjM4NS0yLjAzOSwyLjUyMS0yLjUyMWw4LjkyMy0zLjc4MyBDNTkuNzAyLDMxLjg2OSw1OS43MDIsMjkuMTMxLDU3Ljc3LDI4LjMxMnoiIG9wYWNpdHk9Ii4xNSI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zOC45ODksMjMuOTZsMy43ODMtOC45MjNjMC4xMTQtMC4yNjgsMC4xODktMC41NDIsMC4yNTMtMC44MTdsLTAuNDgxLTEuMTM1IGMtMC44MTktMS45MzItMy41NTctMS45MzItNC4zNzYsMGwtMy43ODMsOC45MjNjLTAuNDgxLDEuMTM1LTEuMzg1LDIuMDM5LTIuNTIxLDIuNTIxbC04LjkyMywzLjc4MyBjLTEuOTMyLDAuODE5LTEuOTMyLDMuNTU3LDAsNC4zNzZsMS4xMzQsMC40ODFjMC4yNzUtMC4wNjQsMC41NDktMC4xMzksMC44MTctMC4yNTNsOC45MjMtMy43ODMgQzM2LjE1OSwyOC4xMzksMzcuOTk1LDI2LjMwMywzOC45ODksMjMuOTZ6IiBvcGFjaXR5PSIuMyI+PC9wYXRoPjxsaW5lIHgxPSIzOC4wNjgiIHgyPSI0MC4zNTYiIHkxPSIyMy41NyIgeTI9IjE4LjE3MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIzIj48L2xpbmU+Cjwvc3ZnPg=="
                />
              </span>
              .<div className="glass-overlay absolute inset-0 z-0"></div>
            </h4>
            <p className="text-gray-350 text-sm pl-4 max-w-[550px]">
              Discover the world&apos;s top freelance talents on FreelySlah.
              Join our community and unlock new opportunities.
            </p>
            <div className="w-* h-96 mt-1 mb-8 m-auto">
              <video
                className="w-full h-full m-auto"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/src/assets/signup.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
