import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceContext from "../ServiceContext";
import styles from "../CreateService.module.css";

const Requirements = () => {
  const myContext = useContext(ServiceContext);
  const updateContext = myContext.serviceDetails;

  const [requirements, setRequirements] = useState([
    {
      text: "Requirement 1",
      typeR: "Free Text",
      mandatory: false,
      choices: [],
    },
  ]);

  const [showOptions, setShowOptions] = useState(null);
  const [newRequirement, setNewRequirement] = useState(false);
  const [currentRequirement, setCurrentRequirement] = useState({
    text: "",
    typeR: "Free Text",
    mandatory: false,
    choices: [],
  });
  const [editIndex, setEditIndex] = useState(null);
  const [newChoice, setNewChoice] = useState("");

  const handleEdit = (index) => {
    setCurrentRequirement(requirements[index]);
    setEditIndex(index);
    setNewRequirement(true);
  };

  const handleDelete = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    updateContext.setServiceRequirements(updatedRequirements);
    toast.success("Requirement deleted");
  };

  const next = () => {
    if (requirements.length === 0) {
      toast.error("Please add at least one requirement");
    } else if (requirements.length < 3) {
      toast.error("Please add at least three requirements");
    } else {
      updateContext.setServiceRequirements(requirements);
      console.log(updateContext);
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  const handleAddRequirement = () => {
    setNewRequirement(true);
    setCurrentRequirement({
      text: "",
      typeR: "Free Text",
      mandatory: false,
      choices: [],
    });
    setEditIndex(null);
  };

  const handleSaveRequirement = () => {
    if (currentRequirement.text.trim() === "") {
      toast.error("Requirement text cannot be empty");
      return;
    }

    let updatedRequirements;
    if (editIndex !== null) {
      updatedRequirements = requirements.map((req, index) =>
        index === editIndex ? currentRequirement : req
      );
    } else {
      updatedRequirements = [...requirements, currentRequirement];
    }
    setRequirements(updatedRequirements);
    updateContext.setServiceRequirements(updatedRequirements);

    setNewRequirement(false);
    setCurrentRequirement({
      text: "",
      typeR: "Free Text",
      mandatory: false,
      choices: [],
    });
    setEditIndex(null);
    toast.success("Requirement saved");
  };

  const handleCancelRequirement = () => {
    setNewRequirement(false);
    setCurrentRequirement({
      text: "",
      typeR: "Free Text",
      mandatory: false,
      choices: [],
    });
    setEditIndex(null);
  };

  const handleTypeChange = (e) => {
    setCurrentRequirement({
      ...currentRequirement,
      typeR: e.target.value,
      choices: [],
    });
  };

  const handleAddChoice = () => {
    if (newChoice.trim() === "") {
      toast.error("Choice text cannot be empty");
      return;
    }
    setCurrentRequirement({
      ...currentRequirement,
      choices: [...currentRequirement.choices, newChoice],
    });
    setNewChoice("");
  };

  const handleDeleteChoice = (index) => {
    const updatedChoices = currentRequirement.choices.filter(
      (_, i) => i !== index
    );
    setCurrentRequirement({
      ...currentRequirement,
      choices: updatedChoices,
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-medium mb-11">
        Requirements for the client
      </h2>
      <p className="block font-medium mb-5 text-[22px]">
        Tell the client what you need to get started
      </p>
      {requirements.map((req, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-2 border-t border-gray-400 py-4"
        >
          <span>
            {index + 1}. {req.text}
          </span>
          <div className="relative">
            <button
              onClick={() =>
                setShowOptions(showOptions === index ? null : index)
              }
              className="text-[#0E9F6E] border bg-white rounded-[50%] flex items-center justify-center font-bold text-2xl w-8  h-8 pb-2  border-gray-300 hover:bg-gray-100"
            >
              ...
            </button>
            {showOptions === index && (
              <div className={styles.optionsMenu}>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
      {newRequirement ? (
        <div className="border border-gray-300 p-4 mt-4 rounded-2xl bg-[#E9E9E9]">
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-2 focus-within:border-[#3e3e3e5f] focus-within:outline-none"
            placeholder="EXAMPLE: Do you have preferred styles for your illustration? Send me some examples if you have any."
            rows="3"
            value={currentRequirement.text}
            onChange={(e) =>
              setCurrentRequirement({
                ...currentRequirement,
                text: e.target.value,
              })
            }
          ></textarea>
          <div className="flex items-center mb-2">
            <label className="w-1/4">Answer:</label>
            <select
              className="w-3/4 border border-gray-300 rounded p-2"
              value={currentRequirement.typeR}
              onChange={handleTypeChange}
            >
              <option>Free Text</option>
              <option>Multiple Choice</option>
              <option>File Upload</option>
            </select>
          </div>
          {currentRequirement.typeR === "Multiple Choice" && (
            <div className="mb-2">
              <button className="text-[#0E9F6E] mb-2" onClick={handleAddChoice}>
                + Add choice
              </button>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 mr-2"
                  placeholder="Enter choice"
                  value={newChoice}
                  onChange={(e) => setNewChoice(e.target.value)}
                />
                <button
                  className="bg-[#0E9F6E] text-white px-4 py-2 rounded"
                  onClick={handleAddChoice}
                >
                  Add
                </button>
              </div>
              <ul>
                {currentRequirement.choices.map((choice, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 mb-2 border-b border-gray-300"
                  >
                    {choice}
                    <button
                      className="text-red-500 ml-4"
                      onClick={() => handleDeleteChoice(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-gray-600 mb-2">
            The client can also attach files.
          </p>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={currentRequirement.mandatory}
              onChange={(e) =>
                setCurrentRequirement({
                  ...currentRequirement,
                  mandatory: e.target.checked,
                })
              }
            />
            <label>Mandatory requirement</label>
          </div>
          <div className="flex justify-end">
            <button
              className="text-gray-600 mr-4"
              onClick={handleCancelRequirement}
            >
              Cancel
            </button>
            <button
              className="bg-[#0E9F6E] text-white px-4 py-2 rounded"
              onClick={handleSaveRequirement}
            >
              {editIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center text-[#0E9F6E] font-medium text-lg"
          onClick={handleAddRequirement}
        >
          <span className="mr-2 text-3xl font-light">+</span> Add a requirement
        </button>
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
          className="px-5 py-2 !bg-[#f1bd3a] text-white rounded-3xl hover:bg-[#046c4e]"
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

export default Requirements;
