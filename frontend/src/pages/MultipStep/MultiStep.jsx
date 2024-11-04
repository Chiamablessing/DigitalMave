import React, { useState, useContext, useEffect } from "react";
import { LuUser } from "react-icons/lu";
import "./MultiStep.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./Context";
import { useNavigate } from "react-router-dom";

const MultiStep = () => {
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;
  const [selectedValue, setSelectedValue] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  // You should call navigate() in a React.useEffect(), not when your component is first rendered.
  // This is because navigate() will cause a re-render, and you can't call navigate() during a render.
  //solution:
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  //   if (!userInfo) {
  //     navigate("/login");
  //   }

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    //  updateContext.setIsSeller(
    //    event.target.value === "freelancer" ? true : false
    //  );
  };

  //   console.log("slected value: " + selectedValue);
  //   console.log("selected event: " + event.target.value);
  //   console.log("updatecontext value: " + updateContext.isSeller);

  const next = () => {
    if (updateContext.isSeller == null) {
      toast.error("Please select an option");
    } else {
      //   if (updateContext.isSeller === true)
      // updateContext.setStep(updateContext.currentPage + 1);
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <>
      <div className="container flex items-center justify-center   w-full px-3 mx-auto min-[576px]:max-w-[540px]  min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px]">
        <div className="grid grid-cols-12 gap-4 md-b:gap-6 lg-b:gap-8 ">
          <div className="grid col-start-1 col-end-13 min-w-0 md-b:col-start-2 md-b:col-end-12  lg-b:px-[80px] lg-b:py-0 lg-b:col-start-1 lg-b:col-end-13">
            <form className=" max-[699px]:border-none  max-[699px]:p-0  ">
              <div className="!text-center ">
                <h2 className="pb-2 my-6 text-[32px] tracking-[-1px] leading-[46px] font-bold break-words text-[#333] mb-8 ">
                  Join as a client or freelancer
                </h2>
                <div className="flex flex-wrap justify-center lg-b:px-4  xl-b:px-28	mb-16">
                  <div
                    className={`custom-control w-full md-b:w-2/5 md-b:mr-5 border-2 border-transparent outline-1 outline hover:outline-[#b7b1b1] outline-[#e9e9e9] rounded-[16px] mb-[20px] pt-[26px] px-[30px] pb-[35px] relative cursor-pointer block transition-all duration-150 ease-in-out  hover:!bg-[#fafafa] hover:!border-1 hover:!border-[#0e9f6e]  focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]  ${
                      selectedValue === "client"
                        ? "bg-[#fafafa] border-2 !border-[#0e9f6e]  cursor-pointer  "
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="custom-control-input w-full h-full hidden"
                      id="cap-opt-1"
                      name="user-type"
                      value="client"
                      checked={selectedValue === "client"}
                      onChange={(e) => {
                        handleRadioChange(e);
                        updateContext.setIsSeller(
                          e.target.value === "freelancer" ? true : false
                        );
                        console.log(
                          "updatecontext value: " + updateContext.isSeller
                        );
                      }}
                    />
                    <label
                      className="custom-control-label flex items-center"
                      htmlFor="cap-opt-1"
                    >
                      {/* <MdOutlineMan className="text-[#222] text-[50px] font-normal" /> */}
                      <LuUser className="text-[#222] text-[50px] font-normal" />
                      <span className="cap-opt-1 font-semibold text-[20px] align-middle flex items-center ">
                        I&apos;m a client, hiring for a project
                      </span>
                    </label>
                  </div>
                  <div
                    className={`custom-control w-full md-b:w-2/5 md-b:mr-5 border-2 border-transparent outline-1 outline hover:outline-[#b7b1b1] outline-[#e9e9e9] rounded-[16px] mb-[20px] pt-[26px] px-[30px] pb-[35px] relative cursor-pointer block transition-all duration-150 ease-in-out  hover:!bg-[#fafafa] hover:!border-1 hover:!border-[#0e9f6e]  focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3] ${
                      selectedValue === "freelancer"
                        ? "bg-[#fafafa] border-2 !border-[#0e9f6e] cursor-pointer  "
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="custom-control-input  w-full h-full hidden"
                      id="cap-opt-2"
                      name="user-type"
                      value="freelancer"
                      checked={selectedValue === "freelancer"}
                      onChange={(e) => {
                        handleRadioChange(e);
                        updateContext.setIsSeller(
                          e.target.value === "freelancer" ? true : false
                        );
                        console.log(
                          "updatecontext value: " + updateContext.isSeller
                        );
                      }}
                    />
                    <label
                      className="custom-control-label flex "
                      htmlFor="cap-opt-2"
                    >
                      {/* <MdOutlineMan className="text-[#222] text-[50px] font-normal" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="64"
                        height="64"
                        viewBox="0 0 128 128"
                      >
                        <path d="M 64 40.5 C 52.2 40.5 41.500781 47.900391 37.300781 58.900391 C 36.700781 60.400391 37.5 62.200781 39 62.800781 C 40.6 63.400781 42.400391 62.599609 42.900391 61.099609 C 46.200391 52.399609 54.6 46.5 64 46.5 C 73.4 46.5 81.799609 52.399609 85.099609 61.099609 C 85.599609 62.299609 86.700391 63 87.900391 63 C 88.300391 63 88.6 62.900781 89 62.800781 C 90.5 62.200781 91.299219 60.500391 90.699219 58.900391 C 86.499219 47.900391 75.8 40.5 64 40.5 z M 17.099609 71.099609 C 14.699609 71.099609 12.400391 72.2 10.900391 74 C 9.4003906 75.8 8.7992187 78.299609 9.1992188 80.599609 L 16.699219 118.19922 C 16.899219 119.19922 17.199219 120.2 17.699219 121 L 11 121 C 9.3 121 8 122.3 8 124 C 8 125.7 9.3 127 11 127 L 117 127 C 118.7 127 120 125.7 120 124 C 120 122.3 118.7 121 117 121 L 110.19922 121 C 110.69922 120.1 110.99922 119.19922 111.19922 118.19922 L 118.69922 80.599609 C 119.19922 78.199609 118.6 75.8 117 74 C 115.4 72.2 113.20078 71.099609 110.80078 71.099609 L 17.099609 71.099609 z M 17 77 L 110.80078 77 C 111.60078 77 112.10078 77.499219 112.30078 77.699219 C 112.50078 77.999219 112.89922 78.600391 112.69922 79.400391 L 105.19922 117 C 104.69922 119.3 102.70078 121 100.30078 121 L 27.599609 121 C 25.199609 121 23.199219 119.3 22.699219 117 L 15.099609 79.400391 C 14.899609 78.600391 15.3 77.999219 15.5 77.699219 C 15.7 77.399219 16.2 77 17 77 z M 64 87.974609 C 61.175 87.974609 58.349219 89.049219 56.199219 91.199219 C 51.899219 95.499219 51.899219 102.50078 56.199219 106.80078 C 58.399219 108.90078 61.2 110 64 110 C 66.8 110 69.600781 108.90078 71.800781 106.80078 C 76.100781 102.50078 76.100781 95.499219 71.800781 91.199219 C 69.650781 89.049219 66.825 87.974609 64 87.974609 z M 64 94 C 65.2 94 66.6 94.5 67.5 95.5 C 69.4 97.4 69.4 100.59961 67.5 102.59961 C 65.6 104.59961 62.400391 104.49961 60.400391 102.59961 C 58.500391 100.59961 58.5 97.4 60.5 95.5 C 61.5 94.5 62.8 94 64 94 z"></path>
                      </svg>
                      <span className="cap-opt-1 font-semibold text-[20px] align-middle  flex items-center">
                        I&apos;m a freelancer, looking for work
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    onClick={next}
                    className="w-[200px] h-[50px] rounded-3xl font-extrabold ud-btn btn-thm btn-white relative add-joining text-[15px] py-[13px] px-[25px] xxs-b:py-[5px] xxs-b:px-[30px]  transition-all duration-500 ease-linear cursor-pointer outline-none !bg-[#5BBB7B] border-2 !border-[#5BBB7B] text-white hover:!text-white hover:!border-[#1F4B3F] "
                  >
                    Continue
                  </button>
                </div>
              </div>
              {/* Handle notifications */}
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStep;
