import React, { useState, useContext, useEffect } from "react";
import "./MultiStep.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./Context";
import { useNavigate } from "react-router-dom";

const FormFreelancer = () => {
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

useEffect(() => {
    console.log(updateContext.freelancerType);
    if (updateContext.isSeller == false) {
    updateContext.setStep(updateContext.currentPage + 1);
    }
}, [updateContext]);

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
    if (updateContext.freelancerType == null) {
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
                Choose your freelancing type
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
                    checked={selectedValue === "service"}
                    onChange={(e) => {
                        handleRadioChange(e);
                        updateContext.setFreelancerType(
                        (e.target.value = "service")
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
                    <img
                        src="/src/assets/icons8-work.gif"
                        alt="product"
                        className="w-[60px] h-[60px] m-auto"
                    />{" "}
                    <span className="cap-opt-1 font-semibold text-[20px] align-middle flex items-center ">
                        I&apos;m a freelancer service
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
                    checked={selectedValue === "product"}
                    onChange={(e) => {
                        handleRadioChange(e);
                        updateContext.setFreelancerType(
                        (e.target.value = "product")
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
                    <img
                        src="/src/assets/icons8-product.gif"
                        alt="product"
                        className="w-[64px] h-[64px] m-auto"
                    />
                    <span className="cap-opt-1 font-semibold text-[20px] align-middle  flex items-center">
                        I&apos;m a freelancer selling products
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

export default FormFreelancer;
