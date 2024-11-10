import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceContext from "../ServiceContext";

const DescriptionFAQ = () => {
  useEffect(() => {
    import("react-quill/dist/quill.snow.css");
  }, []);
  const myContext = useContext(ServiceContext);
  const updateContext = myContext.serviceDetails;
  const [description, setDescription] = useState("");

  const next = () => {
    if (updateContext.serviceDescription.length < 10) {
      toast.error("Please enter a valid description (at least 10 characters)");
    } else {
      updateContext.setServiceDescription(description); // Save description to context
      console.log(updateContext);
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className="text-5xl font-medium mb-7">Service description</h2>
      <div className="mb-6 pb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-lg text-[#3e3e3e]"
        >
          Briefly Describe Your Service
        </label>
        <ReactQuill
          value={description}
          onChange={(e) => {
            setDescription(e);
            updateContext.setServiceDescription(e);
          }}
          className="h-48 mb-4 block"
          placeholder="Describe your service in detail..."
        />
      </div>
      <div className="w-full flex flex-wrap justify-between mt-11">
        <button
          className="px-4 py-2 mr-2 text-[#141c1a] border border-[#0E9F6E] rounded-3xl"
          type="button"
          onClick={() => updateContext.setStep(updateContext.currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 !bg-[#0b0c0c] text-white rounded-3xl hover:bg-[#f7d05d]"
          type="button"
          onClick={next}
        >
          {updateContext.currentPage < 6 ? "Next" : "Submit"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DescriptionFAQ;
