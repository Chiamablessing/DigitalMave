import React, { useState, useContext } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceContext from "../ServiceContext";

const categories = {
  "Web Design": ["UI/UX Design", "Responsive Design"],
  "Software Development": ["Frontend Development", "Backend Development"],
  Writing: ["Content Writing", "Technical Writing"],
  Marketing: ["SEO", "Social Media"],
};

const Overview = () => {
  const myContext = useContext(ServiceContext);
  const updateContext = myContext.serviceDetails;

  // Edit Service Category Modal
  const [showEditServiceCategoryModal, setShowEditServiceCategoryModal] =
    useState(false);
  const [serviceCategory, setServiceCategory] = useState("Web Design");
  const [serviceSubCategory, setServiceSubCategory] = useState("UI/UX Design");

  // Temporary state for modal
  const [tempServiceCategory, setTempServiceCategory] =
    useState(serviceCategory);
  const [tempServiceSubCategory, setTempServiceSubCategory] =
    useState(serviceSubCategory);

  const openEditServiceCategoryModal = (event) => {
    event.preventDefault(); // Prevent form submission or any default behavior
    setTempServiceCategory(serviceCategory);
    setTempServiceSubCategory(serviceSubCategory);
    updateContext.setServiceCategory(serviceCategory);
    updateContext.setServiceSubCategory(serviceSubCategory);
    setShowEditServiceCategoryModal(true);
  };

  const handleEditServiceCategory = () => {
    setServiceCategory(tempServiceCategory);
    setServiceSubCategory(tempServiceSubCategory);
    updateContext.setServiceCategory(tempServiceCategory);
    updateContext.setServiceSubCategory(tempServiceSubCategory);
    toast.success("Service category updated successfully");
    setShowEditServiceCategoryModal(false);
  };

  // Manage Search Tags
  const [tags, setTags] = useState(["Framer", "CSS", "PHP", "Web Design"]);
  const [showEditTagsModal, setShowEditTagsModal] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (event) => {
    event.preventDefault();
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      updateContext.setServiceSearchTags([...tags, newTag.trim()]);
      setNewTag("");
      toast.success("Tag added successfully");
    }
    setShowEditTagsModal(false);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    updateContext.setServiceSearchTags(
      tags.filter((tag) => tag !== tagToDelete)
    );
    toast.success("Tag deleted successfully");
  };

  const openEditTagsModal = (event) => {
    event.preventDefault();
    setShowEditTagsModal(true);
  };

  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setCharCount(value.length);

    const words = value.trim().split(/\s+/);
    setWordCount(words.filter((word) => word.length > 0).length);

    updateContext.setServiceTitle("You will get " + value);
  };

  const next = () => {
    if (!updateContext.serviceTitle || wordCount < 7) {
      toast.error("Please enter a valid title with at least 7 words");
    } else if (!updateContext.serviceCategory) {
      toast.error("Please select a category");
    } else if (!updateContext.serviceSubCategory) {
      toast.error("Please select a sub-category");
    } else if (updateContext.serviceSearchTags.length < 3) {
      toast.error("Please add at least 3 search tags");
    } else {
      console.log(updateContext);
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className="text-5xl font-medium mb-11">Service overview</h2>

      <div className="mb-5">
        <label className="block font-medium mb-1 text-2xl">Title</label>
        <span className="text-xs text-[#181818]">
          Tell the client what you will deliver and how it benefits them.
        </span>
        <div className="relative w-full mt-2">
          <div className="flex items-center border border-[#E9E9E9] rounded-lg px-3 py-2 focus-within:border-[#3e3e3e5f] text-sm">
            <span className="text-gray-700 font-medium text-sm">
              You will get
            </span>
            <input
              type="text"
              placeholder=" a fantastic deliverable that drives impact"
              maxLength="75"
              className="flex-1 border-none focus:border-none focus:outline-none p-0 ml-2 text-gray-800 placeholder-gray-500"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="absolute -bottom-6 right-2 text-gray-500 text-xs">
            {charCount}/75 characters (min. 7 words: {wordCount})
          </div>
        </div>
      </div>
      {/* Service category section */}
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-medium">
          Category
        </label>
        <div className="flex items-center">
          <p className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-500 border-none outline-none">
            {serviceCategory} - {serviceSubCategory}
          </p>
          <div className="flex items-center">
            <button
              onClick={openEditServiceCategoryModal}
              className="text-[#209211] flex items-center justify-center border rounded-[50%] border-[#E6E6E6] text-lg p-[5px] hover:bg-[#F9F9F9]  mr-2"
            >
              <MdOutlineEdit />
            </button>
          </div>
        </div>
      </div>

      {/* Search tags section */}
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-medium">
          Search Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center py-0 px-[12px] bg-white text-sm text-[#676767] rounded-full border border-[#676767]"
            >
              {tag}
              <button
                onClick={() => handleDeleteTag(tag)}
                className="ml-2 text-[#676767] text-xl"
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={openEditTagsModal}
            className="text-[#209211] flex items-center justify-center border rounded-[50%] border-[#E6E6E6] text-lg p-[5px] hover:bg-[#F9F9F9]"
          >
            <MdOutlineEdit />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Please note: Some categories require that sellers verify their skills.
      </p>
      {/* Edit Category Modal */}
      {showEditServiceCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-semibold">Edit Service Category</h3>
              <button
                onClick={() => setShowEditServiceCategoryModal(false)}
                className="text-gray-600 hover:text-gray-900 !text-5xl"
              >
                &times;
              </button>
            </div>
            <div className="px-3 overflow-x-auto min-h-fit">
              <div className="mb-7">
                <label className="text-[#333] font-medium text-xl mb-3">
                  Category
                </label>
                <select
                  className="block p-2 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3] text-gray-600"
                  value={tempServiceCategory}
                  onChange={(e) => {
                    setTempServiceCategory(e.target.value);
                    setTempServiceSubCategory(categories[e.target.value][0]);
                  }}
                >
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-7">
                <label className="text-[#333] font-medium text-xl mb-3">
                  Specialty
                </label>
                <select
                  className="block p-2 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3] text-gray-600"
                  value={tempServiceSubCategory}
                  onChange={(e) => setTempServiceSubCategory(e.target.value)}
                >
                  {categories[tempServiceCategory].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowEditServiceCategoryModal(false)}
                className="px-4 py-2 mr-2 text-[#0E9F6E]"
              >
                Cancel
              </button>
              <button
                onClick={handleEditServiceCategory}
                className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tags Modal */}
      {showEditTagsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-semibold">Add Tag</h3>
              <button
                onClick={() => setShowEditTagsModal(false)}
                className="text-gray-600 hover:text-gray-900 !text-5xl"
              >
                &times;
              </button>
            </div>
            <div className="px-3 overflow-x-auto min-h-fit">
              <div className="mb-7">
                <input
                  type="text"
                  className="block p-2 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border placeholder:text-sm placeholder:text-[#BEB5C3] text-gray-600"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddTag}
                className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex flex-wrap justify-between mt-11">
        <button
          className="px-5 py-2 !bg-[#ffde4a] text-white rounded-3xl hover:bg-[#046c4e]"
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

export default Overview;
