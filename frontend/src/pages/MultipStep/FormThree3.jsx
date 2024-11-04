import React, { useContext } from "react";
import AppContext from "./Context";
import "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormThree3 = () => {
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;

  const next = () => {
    if (updateContext.userIdType == null) {
      toast.error("Please enter your ID Type");
    } else if (updateContext.userIdNumber == null) {
      toast.error("Please enter your ID Number");
    } else if (updateContext.userIssuedD == null) {
      toast.error("Please enter your Issued Date");
    } else if (updateContext.userExpiredD == null) {
      toast.error("Please enter your Expired Date");
    } else {
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <>
      <div className="scroll flex flex-col items-center justify-center gap-3 bg-[#F9F9F9] min-h-[84vh]">
        <div className="px-4 md-b:max-w-[700px] text-center">
          <h2 className="text-lg md-b:text-xl font-bold !text-[#333]">
            Identity Verification: Please Provide Us With your Details
          </h2>
          <h4 className="text-xs text-[#00000099]">
            You can always change them later.
          </h4>
          <form className="form flex flex-col items-center w-full gap-5 mt-5 max-w-[450px] mx-auto">
            <div className="flex justify-between flex-wrap w-full text-left">
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="idType"
                >
                  ID Type
                </label>
                <select
                  className="block w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  name="idType"
                  id="idType"
                  onChange={(e) => updateContext.setIdType(e.target.value)}
                >
                  <option selected>Select ID Type </option>
                  <option value="National ID">National ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Female">Driving licence</option>
                </select>
              </div>

              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="idNumber"
                >
                  ID Number
                </label>
                <input
                  className="block p-4 w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  type="text"
                  name="idNumber"
                  id="idNumber"
                  placeholder="Enter ID Number"
                  required
                  onChange={(e) => updateContext.setIdNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between flex-wrap w-full text-left">
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="issuedDate"
                >
                  Issued Date
                </label>
                <input
                  className="block p-4 w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  type="date"
                  name="issuedDate"
                  id="issuedDate"
                  required
                  onChange={(e) => updateContext.setIssuedD(e.target.value)}
                />
              </div>
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="expiredDate"
                >
                  Expired Date
                </label>
                <input
                  className="block p-4 w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  type="date"
                  name="expiredDate"
                  id="expiredDate"
                  required
                  onChange={(e) => updateContext.setExpiredD(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between flex-wrap w-full text-left"></div>

            <div className="w-full flex flex-wrap justify-between">
              <button
                className="border mt-3 w-fit font-semibold px-5 py-[5px] text-lg  border-[#1DBF73] !bg-white ud-btn btn-thm btn-white  hover:!bg-[#046c4e] text-[#1DBF73] hover:text-white rounded-md"
                type="button"
                onClick={() =>
                  updateContext.setStep(updateContext.currentPage - 1)
                }
              >
                Previous
              </button>
              <button
                className="border ud-btn btn-thm btn-white mt-3 w-fit font-semibold px-5 py-[5px] text-lg  border-[#1DBF73] !bg-[#0E9F6E]  hover:!bg-[#046c4e] text-white rounded-md"
                type="button"
                onClick={next}
              >
                Next
              </button>
            </div>
            {/* Handle notifications */}
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormThree3;
