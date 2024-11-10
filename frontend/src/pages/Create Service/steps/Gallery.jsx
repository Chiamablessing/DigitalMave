import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoTrash } from "react-icons/go";
import ServiceContext from "../ServiceContext";
import { CiImageOn } from "react-icons/ci";
import styles from "../CreateService.module.css";
import upload from "../../../utils/upload";
import CircularProgress from "./CircularProgress"; // Import the custom CircularProgress component

const Gallery = () => {
  const myContext = useContext(ServiceContext);
  const updateContext = myContext.serviceDetails;
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) =>
        file.size <= 10 * 1024 * 1024 &&
        (file.type === "image/jpeg" || file.type === "image/png")
    );

    if (validFiles.length + images.length > 20) {
      toast.error("You can upload up to 20 images.");
    } else {
      const newImages = [...images, ...validFiles];
      setImages(newImages);
      updateContext.setServiceImages(newImages.map((image) => image.name));

      // Start uploading process
      setUploading(true);

      try {
        // Upload each image and update the state with the URL
        const uploadedImageURLs = await Promise.all(
          newImages.map(async (image) => {
            const url = await upload1(image);
            return url;
          })
        );

        // Do something with the uploaded image URLs, like save them to a database
        console.log("Uploaded Image URLs:", uploadedImageURLs);
        updateContext.setServiceImages(uploadedImageURLs);

        // Notify user that all images are uploaded
        toast.success("All images have been successfully uploaded.");
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading images. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    updateContext.setServiceImages(newImages);
    if (index === coverImage) {
      setCoverImage(null);
      updateContext.setCoverImage(null);
    }
  };

  const handleSetCoverImage = (index) => {
    setCoverImage(index);
    updateContext.setCoverImage(index);
  };
  console.log(updateContext);

  const next = () => {
    if (uploading) {
      toast.warning("Images are still uploading. Please wait.");
    } else if (updateContext.serviceImages.length < 3) {
      toast.error("Please upload at least 3 images.");
    } else if (coverImage === null) {
      toast.error("Please select a cover image.");
    } else {
      console.log(updateContext);
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  // Function to upload a single file and return its URL
  const upload1 = async (file) => {
    const url = await upload(file);
    return url;
  };

  return (
    <div>
      <h2 className="text-5xl font-medium mb-4">Create a project gallery</h2>

      <div className="mb-8 text-[#3e3e3e] ">
        <p>
          Upload up to 20 images (.jpg or .png), up to 10MB each and less than
          4,000 pixels in width or height.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative border p-2 mb-9 rounded-2xl">
            <img
              src={URL.createObjectURL(image)}
              alt={`Upload Preview ${index + 1}`}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-1 right-1 bg-white rounded-full hover:bg-gray-200 text-[#0E9F6E] hover:text-red-500 border border-gray-300 hover:border-red-500 p-2"
              onClick={() => handleRemoveImage(index)}
            >
              <GoTrash className="w-4 h-4 hover:text-red-500" />
            </button>
            <div className="flex justify-start mt-5 ">
              <input
                type="radio"
                name="coverImage"
                checked={coverImage === index}
                onChange={() => handleSetCoverImage(index)}
                className={styles.customRadio}
              />
              <label className="ml-2">Set as project cover</label>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center border-[#D9D9D9] border-2 p-4 cursor-pointer w-64 h-48 bg-[#F1F1F1] rounded-lg text-sm">
          <label className="w-full h-full text-center cursor-pointer flex flex-col items-center justify-center">
            <CiImageOn size={38} className="mb-2" />
            <span>
              Drag image here or{" "}
              <span className="text-[#0E9F6E] cursor-pointer font-medium">
                browse
              </span>
            </span>
            <input
              type="file"
              accept="image/jpeg, image/png"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {uploading && (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      )}

      <div className="w-full flex flex-wrap justify-between mt-11">
        <button
          className="px-4 py-2 mr-2 text-[#0E9F6E] border border-[#0E9F6E] rounded-3xl"
          type="button"
          onClick={() => updateContext.setStep(updateContext.currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 !bg-[#f3ce48] text-white rounded-3xl hover:bg-[#046c4e]"
          type="button"
          onClick={next}
          //disabled={uploading} // Disable the button while uploading
        >
          {updateContext.currentPage < 6 ? "Next" : "Submit"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Gallery;
