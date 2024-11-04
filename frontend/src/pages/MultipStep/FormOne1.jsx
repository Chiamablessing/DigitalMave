import React, { useState, useContext } from "react";
import AppContext from "./Context";
import "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../../utils/upload";
import CircularProgress from "../../pages/Create Service/steps/CircularProgress";

const FormOne = () => {
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const upload1 = async (file) => {
    const url = await upload(file);
    return url;
  };

  const next = async () => {
    if (uploading) {
      toast.warning("Image is still uploading. Please wait.");
    } else if (updateContext.userName == null) {
      toast.error("Please enter your User Name");
    } else if (updateContext.userDisplayName == null) {
      toast.error("Please enter your Display Name correctly");
    } else if (updateContext.userDescription == null) {
      toast.error("Please enter your Description correctly");
    } else {
      if (file) {
        try {
          setUploading(true);
          const url = await upload1(file);
          updateContext.setImg(url);
          toast.success("Image has been successfully uploaded.");
        } catch (error) {
          toast.error("Error uploading image. Please try again.");
        } finally {
          setUploading(false);
        }
      }
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  const inputClassName =
    "block p-4 w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]";
  const labelClassName =
    "mb-2 text-[10px]  font-semibold text-gray-900  dark:text-[#333]";

  return (
    <>
      <div className="scroll flex flex-col items-center justify-center gap-3 bg-[#F9F9F9] min-h-[84vh]">
        <div className="px-4 md-b:max-w-[500px] text-center">
          <h2 className="text-xl md-b:text-3xl font-bold text-[#333]">
            Welcome! First things first...
          </h2>
          <h4 className="text-xs text-[#00000099]">
            Please complete your profile to get started
          </h4>
          <form className="form flex flex-col items-center w-full gap-5 mt-5">
            <div className="flex flex-col items-center cursor-pointer">
              <label className={labelClassName} htmlFor="">
                Select a profile Picture
              </label>
              <div
                className={` bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative max-w-full max-h-full`}
              >
                {userInfo.img ? (
                  <img
                    src={userInfo.img}
                    alt="profile"
                    className="rounded-[50%] w-full object-cover h-full"
                  />
                ) : (
                  <span className="text-6xl text-white">
                    {userInfo.email[0].toUpperCase()}
                  </span>
                )}
                <div
                  className={`absolute h-full w-full rounded-full flex items-center justify-center transition-all duration-100 ${
                    userInfo.img ? "opacity-100" : "opacity-0 bg-slate-400"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center relative ${
                      userInfo.img ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white absolute"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="file"
                      className="opacity-0 w-full h-full z-50 cursor-pointer"
                      multiple={true}
                      name="profileImage"
                      required
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-full">
              <div className="w-full text-center md-b:w-[48%] md-b:text-left">
                <label className={labelClassName} htmlFor="userName">
                  Please enter a username
                </label>
                <input
                  className={`${inputClassName} w-1/3`}
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Username"
                  required
                  onChange={(e) => updateContext.setUserName(e.target.value)}
                />
              </div>

              <div className="w-full text-center md-b:w-[48%] md-b:text-left">
                <label className={labelClassName} htmlFor="displayName">
                  Please enter your display Name
                </label>
                <input
                  className={`${inputClassName} w-1/3`}
                  type="text"
                  name="displayName"
                  id="displayName"
                  placeholder="Name"
                  required
                  onChange={(e) => updateContext.setDisplayName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full text-left">
              <label className={labelClassName} htmlFor="description">
                Introduce Yourself
              </label>
              <textarea
                name="description"
                id="description"
                className={`${inputClassName} !p-2 !h-24`}
                placeholder="Description"
                required
                onChange={(e) => updateContext.setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full flex flex-wrap justify-between">
              <button
                className="text-white !bg-[#0E9F6E] hover:!bg-[#046c4e] font-semibold rounded-md py-2 px-4 w-full tracking-[0.05em]"
                type="button"
                onClick={next}
              >
                Next
              </button>
            </div>
            {uploading && (
              <div className="flex justify-center mt-4">
                <CircularProgress />
              </div>
            )}
            {/* Handle notifications */}
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormOne;
