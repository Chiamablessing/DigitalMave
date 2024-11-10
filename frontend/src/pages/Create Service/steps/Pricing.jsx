import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceContext from "../ServiceContext";
import styles from "../CreateService.module.css";

const Pricing = () => {
  const myContext = useContext(ServiceContext);
  const updateContext = myContext.serviceDetails;
  const [pricingTiers, setPricingTiers] = useState([
    {
      title: "",
      description: "",
      deliveryDays: 0,
      revisions: 0,
      images: 0,
      pages: 0,
      options: {
        sourceFiles: false,
        tableOfContents: false,
        socialMediaKit: false,
      },
      price: 0,
    },
    {
      title: "",
      description: "",
      deliveryDays: 0,
      revisions: 0,
      images: 0,
      pages: 0,
      options: {
        sourceFiles: false,
        tableOfContents: false,
        socialMediaKit: false,
      },
      price: 0,
    },
    {
      title: "",
      description: "",
      deliveryDays: 0,
      revisions: 0,
      images: 0,
      pages: 0,
      options: {
        sourceFiles: false,
        tableOfContents: false,
        socialMediaKit: false,
      },
      price: 0,
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const newTiers = [...pricingTiers];
    if(field === "price" || field === "deliveryDays" || field === "revisions" || field === "images" || field === "pages") {
      value = parseInt(value);
    }
    newTiers[index][field] = value;
    setPricingTiers(newTiers);
  };

  const handleCheckboxChange = (index, option) => {
    const newTiers = [...pricingTiers];
    newTiers[index].options[option] = !newTiers[index].options[option];
    setPricingTiers(newTiers);
  };

  const validatePricingTiers = () => {
    for (const tier of pricingTiers) {
      if (!tier.title || tier.title.length > 30) {
        toast.error(
          "Please enter a valid title (max 30 characters) for each tier."
        );
        return false;
      }
      if (!tier.description || tier.description.length > 80) {
        toast.error(
          "Please enter a valid description (max 80 characters) for each tier."
        );
        return false;
      }
      if (tier.deliveryDays <= 0) {
        toast.error(
          "Please enter a valid number of delivery days for each tier."
        );
        return false;
      }
      if (tier.revisions < 0) {
        toast.error("Please enter a valid number of revisions for each tier.");
        return false;
      }
      if (tier.images < 0) {
        toast.error("Please enter a valid number of images for each tier.");
        return false;
      }
      if (tier.pages < 0) {
        toast.error("Please enter a valid number of pages for each tier.");
        return false;
      }
      if (tier.price <= 0) {
        toast.error("Please enter a valid price for each tier.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (validatePricingTiers()) {
      updateContext.setPricingTiers(pricingTiers);
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className="text-5xl font-medium mb-4 ">Create pricing tiers</h2>
      <p
        className="mb-7 text-[#3e3e3e]
      "
      >
        Customize your project with 1 or 3 pricing tiers
      </p>

      <div className="mb-4">
        <div className="grid grid-cols-4 gap-4">
          <label className="block mb-1 font-medium pt-5">Custom Title</label>
          {["Starter", "Standard", "Advanced"].map((tier, index) => (
            <div key={index}>
              <h3 className="font-medium mb-2 text-left">{tier}</h3>
              <div className="mb-4">
                <textarea
                  value={pricingTiers[index].title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                  maxLength="30"
                />
                <p className="text-right text-sm">
                  {pricingTiers[index].title.length}/30 characters
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Custom Description</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <textarea
                    value={pricingTiers[index].description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                    maxLength="80"
                  />
                  <p className="text-right text-sm">
                    {pricingTiers[index].description.length}/80 characters
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Delivery Days</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <input
                    type="number"
                    value={pricingTiers[index].deliveryDays}
                    onChange={(e) =>
                      handleInputChange(index, "deliveryDays", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">
              Number of Revisions
            </label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <select
                    value={pricingTiers[index].revisions}
                    onChange={(e) =>
                      handleInputChange(index, "revisions", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                  >
                    {[...Array(10).keys(), "Unlimited"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Number of Images</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <input
                    type="number"
                    value={pricingTiers[index].images}
                    onChange={(e) =>
                      handleInputChange(index, "images", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">
              Number of Interior Pages
            </label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <input
                    type="number"
                    value={pricingTiers[index].pages}
                    onChange={(e) =>
                      handleInputChange(index, "pages", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="block font-medium mb-2 text-[22px]">
            Service Tier Options
          </h4>
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Source Files</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <div
                    className={`${styles.checkboxContainer} flex items-center mb-2 justify-center`}
                  >
                    <input
                      type="checkbox"
                      checked={pricingTiers[index].options.sourceFiles}
                      onChange={() =>
                        handleCheckboxChange(index, "sourceFiles")
                      }
                      className="mr-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Table of Contents</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <div
                    className={`${styles.checkboxContainer} flex items-center mb-2 justify-center`}
                  >
                    <input
                      type="checkbox"
                      checked={pricingTiers[index].options.tableOfContents}
                      onChange={() =>
                        handleCheckboxChange(index, "tableOfContents")
                      }
                      className="mr-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Social Media Kit</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <div
                    className={`${styles.checkboxContainer} flex items-center mb-2 justify-center`}
                  >
                    <input
                      type="checkbox"
                      checked={pricingTiers[index].options.socialMediaKit}
                      onChange={() =>
                        handleCheckboxChange(index, "socialMediaKit")
                      }
                      className="mr-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4">
            <label className="block mb-1 font-medium">Price ($)</label>
            {["Starter", "Standard", "Advanced"].map((tier, index) => (
              <div key={index}>
                <div className="mb-4">
                  <input
                    type="number"
                    value={pricingTiers[index].price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg py-2 px-3  focus-within:border-[#3e3e3e5f] focus-within:outline-none hover:border-[#3e3e3e5f] focus:border-[#3e3e3e5f]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-between mt-11">
        <button
          className="px-4 py-2 mr-2 text-[#0E9F6E] border border-[#0E9F6E] rounded-3xl"
          type="button"
          onClick={() => updateContext.setStep(updateContext.currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 !bg-[#ffdd43] text-white rounded-3xl hover:bg-[#046c4e]"
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

export default Pricing;
