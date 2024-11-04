import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./Context";
import upload from "../../utils/upload";

const FormSix6 = () => {
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;

  useEffect(() => {
    if (
      updateContext.isSeller === false ||
      updateContext.freelancerType !== "product"
    ) {
      updateContext.setStep(updateContext.currentPage + 1);
    }
  }, [updateContext]);

  const [storeName, setStoreName] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [descStore, setDescStore] = useState("");
  const [storeImage, setStoreImage] = useState(null);
  const [file, setFile] = useState(null);

  const upload1 = async (file) => {
    const url = await upload(file);
    return url;
  };

  const next = () => {
    if (!updateContext.userStoreName) {
      toast.error("Please enter your Store Name");
    } else if (!updateContext.userStoreLocation) {
      toast.error("Please enter your Store Location");
    } else if (!updateContext.userStoreCategory) {
      toast.error("Please enter your Store Category");
    } else {
      if (file) updateContext.setStoreImg(upload1(file));
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
	const file = e.target.files[0];
    if (file) {
      setStoreImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Store Details
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          You can always change them later.
        </p>

        <div className="bg-white mx-auto p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <input
                type="file"
                id="storeImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="storeImage">
                <div className="w-32 h-32 rounded-full border border-gray-300 overflow-hidden cursor-pointer">
                  {storeImage ? (
                    <img
                      src={storeImage}
                      alt="Store"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Upload Image
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="mb-7">
            <label>Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                updateContext.setStoreName(e.target.value);
              }}
              className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                focus-within:outline-none focus-within:border placeholder:text-sm placeholder:text-[#BEB5C3]"
              placeholder="Ex: Awesome Store"
              required
            />
          </div>
          <div className="mb-7">
            <label>Store Location</label>
            <input
              type="text"
              value={storeLocation}
              onChange={(e) => {
                setStoreLocation(e.target.value);
                updateContext.setStoreLocation(e.target.value);
              }}
              className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                focus-within:outline-none focus-within:border placeholder:text-sm placeholder:text-[#BEB5C3]"
              placeholder="Ex: New York, NY"
              required
            />
          </div>
          <div className="mb-7">
            <label>Products Category / Description</label>
            <input
              type="text"
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
                updateContext.setStoreCategory(e.target.value);
              }}
              className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                focus-within:outline-none focus-within:border placeholder:text-sm placeholder:text-[#BEB5C3]"
              placeholder="Ex: Electronics, Clothing, etc."
              required
            />
          </div>
          <div className="flex flex-col w-full text-left mb-7">
            <label htmlFor="descStore">Description (Optional)</label>
            <textarea
              name="descStore"
              id="descStore"
              value={descStore}
              onChange={(e) => {
                setDescStore(e.target.value);
                updateContext.setStoreDescription(e.target.value);
              }}
              className="block w-full h-24 input focus:outline-none focus:border-[#2525258a] bg-white focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] p-2"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-3xl hover:bg-gray-400"
              onClick={() =>
                updateContext.setStep(updateContext.currentPage - 2)
              }
            >
              Previous
            </button>
            <button
              onClick={next}
              className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormSix6;
