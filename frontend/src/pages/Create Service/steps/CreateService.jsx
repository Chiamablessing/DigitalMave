import React, { useState } from "react";
import ServiceContext from "./ServiceContext.jsx";
import Overview from "./steps/Overview";
import Pricing from "./steps/Pricing";
import DescriptionFAQ from "./steps/DescriptionFAQ";
import Requirements from "./steps/Requirements";
import Gallery from "./steps/Gallery";
import Publish from "./steps/Publish";
import { MdOutlineEdit, MdCheck } from "react-icons/md"; // Import check icon

const CreateService = () => {
  const [step, setStep] = useState(1);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceSubCategory, setServiceSubCategory] = useState("");
  const [serviceSearchTags, setServiceSearchTags] = useState([]);
  const [pricingTiers, setPricingTiers] = useState([]);
  const [serviceImages, setServiceImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [serviceRequirements, setServiceRequirements] = useState([]);
  const [serviceDescription, setServiceDescription] = useState("");
  const [maxProjects, setMaxProjects] = useState(0);

  const validateSteps = (targetStep) => {
    // Add your validation logic here
    // For simplicity, we're assuming that all steps are valid.
    // You can add detailed checks based on your requirements.
    if (targetStep === 2 && !serviceTitle) return false;
    if (targetStep === 3 && (!serviceTitle || !pricingTiers.length))
      return false;
    if (
      targetStep === 4 &&
      (!serviceTitle || !pricingTiers.length || !serviceImages.length)
    )
      return false;
    if (
      targetStep === 5 &&
      (!serviceTitle ||
        !pricingTiers.length ||
        !serviceImages.length ||
        !serviceRequirements.length)
    )
      return false;
    if (
      targetStep === 6 &&
      (!serviceTitle ||
        !pricingTiers.length ||
        !serviceImages.length ||
        !serviceRequirements.length ||
        !serviceDescription)
    )
      return false;
    return true;
  };

  const handleStepClick = (targetStep) => {
    if (validateSteps(targetStep)) {
      setStep(targetStep);
    } else {
      alert("Please complete the required steps before proceeding.");
    }
  };

  const serviceDetails = {
    currentPage: step,
    serviceTitle: serviceTitle,
    serviceCategory: serviceCategory,
    serviceSubCategory: serviceSubCategory,
    serviceSearchTags: serviceSearchTags,
    pricingTiers: pricingTiers,
    serviceImages: serviceImages,
    coverImage: coverImage,
    serviceRequirements: serviceRequirements,
    serviceDescription: serviceDescription,
    maxProjects: maxProjects,

    setServiceTitle,
    setServiceCategory,
    setServiceSubCategory,
    setServiceSearchTags,
    setPricingTiers,
    setServiceImages,
    setCoverImage,
    setServiceRequirements,
    setServiceDescription,
    setMaxProjects,
    setStep,
  };

  return (
    <>
      <ServiceContext.Provider value={{ serviceDetails }}>
        <div className="main">
          <div className="min-h-screen bg-white flex flex-col items-center py-10">
            {/* Step indicator */}
            <div className="w-full max-w-4xl relative hidden xs-b:flex justify-between items-center mb-8">
              <div className="absolute inset-0 flex !items-center !justify-center">
                <div
                  className="md-b:w-[95%] w-[88%] border-t-2 border-gray-300 mb-5"
                  style={{ borderTopColor: step > 1 ? "#0E9F6E" : "gray" }} // Change color of the line
                ></div>
              </div>
              {[
                "Overview",
                "Pricing",
                "Gallery",
                "Requirements",
                "Description",
                "Review",
              ].map((label, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center cursor-pointer"
                  onClick={() => handleStepClick(i + 1)} // Validate and set step on click
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full border-2 ${
                      step === i + 1
                        ? "border-[#0E9F6E] bg-[#0E9F6E] text-white"
                        : step > i + 1
                        ? "border-[#0E9F6E] bg-[#0E9F6E] text-white"
                        : "border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {step > i + 1 ? (
                      <MdCheck className="text-white" /> // Show check mark for completed steps
                    ) : step === i + 1 ? (
                      <MdOutlineEdit className="text-white" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      step === i + 1 || step > i + 1
                        ? "text-[#0E9F6E]"
                        : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full max-w-4xl bg-white shadow-md border border-[#D9D9D9] rounded-2xl px-9 py-11">
              <div>
                {step === 1 && <Overview />}
                {step === 2 && <Pricing />}
                {step === 3 && <Gallery />}
                {step === 4 && <Requirements />}
                {step === 5 && <DescriptionFAQ />}
                {step === 6 && <Publish />}
              </div>
            </div>
          </div>
        </div>
      </ServiceContext.Provider>
    </>
  );
};

export default CreateService;
