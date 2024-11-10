import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceContext from "../ServiceContext";
import styles from "../CreateService.module.css";
import newRequest from "../../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const myContext = useContext(ServiceContext);
  const updateContext = myContext.serviceDetails;
  const navigate = useNavigate();

  const [maxProjects, setMaxProjects] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState(null);

  const finish = async () => {
    if (!maxProjects) {
      toast.error(
        "Please specify the maximum number of simultaneous projects."
      );
    } else if (!termsAccepted) {
      toast.error("Please accept the Terms of Service.");
    } else if (!privacyAccepted) {
      toast.error("Please accept the Privacy Notice.");
    } else {
      updateContext.setMaxProjects(maxProjects);
      try {
        await newRequest.post("/gigs", {
          userId: `${userInfo._id}`,
          title: updateContext.serviceTitle,
          category: updateContext.serviceCategory,
          subCategory: updateContext.serviceSubCategory,
          serviceSearchTags: updateContext.serviceSearchTags,
          coverImage: updateContext.coverImage,
          serviceDescription: updateContext.serviceDescription,
          maxProjects: updateContext.maxProjects,
          pricingTiers: updateContext.pricingTiers,
          serviceRequirement: updateContext.serviceRequirements, // Send the whole requirements array
          serviceImages: updateContext.serviceImages,
          isSeller: userInfo.isSeller,
        });
        navigate("/");
        toast.success("Service created successfully");
      } catch (err) {
        setError(err.response.data);
        toast.error(error, { position: "top-right" });
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        finish();
      }}
    >
      <h2 className="text-5xl font-medium mb-11">Finalize</h2>

      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-[22px]"
          htmlFor="maxProjects"
        >
          Maximum number of simultaneous projects
        </label>
        <p className="text-sm mb-4 text-[#181818]">
          How many projects can you handle at one time and still deliver great
          results?
        </p>
        <input
          id="maxProjects"
          type="text"
          value={maxProjects}
          onChange={(e) => setMaxProjects(e.target.value)}
          className="border rounded-lg py-2 px-3 w-[90px] focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
        />
      </div>

      <div className="mb-6">
        <h3 className="block font-medium mb-2 text-[22px]">Copyright Notice</h3>
        <p className="text-sm text-[#181818]">
          By submitting your project, you declare that you either own or have
          rights to the material posted and that posting these materials does
          not infringe on any third party&apos;s rights. You also acknowledge
          that you understand your project will be reviewed and evaluated by
          DigitalMave to ensure it meets DigitalMave’s requirements.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="block font-medium mb-2 text-[22px]">Terms of Service</h3>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm text-[#181818]">
            I understand and agree to the{" "}
            <a
              href="/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#121212] underline"
            >
              DigitalMave Terms of Service
            </a>
            , including the{" "}
            <a
              href="/legal#user-agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#191a1a] underline"
            >
              User Agreement
            </a>{" "}
            and{" "}
            <a
              href="/legal#privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#171818] underline"
            >
              Privacy Policy
            </a>
            .
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="block font-medium mb-2 text-[22px]">Privacy Notice</h3>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="privacy"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mr-2 w-[15%]"
          />
          <label htmlFor="privacy" className="text-xs text-[#181818] w-[100%]">
            By submitting this project and activating it, I understand that it
            will appear in DigitalMave search results visible to the general
            public and will show up in search engine results, even if my profile
            visibility is set to Private or DigitalMave Users Only.
          </label>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-between mt-11">
        <button
          className="px-4 py-2 mr-2 text-[#dadfdd] border border-[#0d1311] rounded-3xl"
          type="button"
          onClick={() => updateContext.setStep(updateContext.currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 !bg-[#0d1210] text-white rounded-3xl hover:bg-[#046c4e]"
          type="button"
          onClick={finish}
        >
          {updateContext.currentPage < 6 ? "Next" : "Submit"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Publish;
