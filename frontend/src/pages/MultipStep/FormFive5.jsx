import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./Context"; // Assuming you have the context defined in Context.js
import "./styles.module.css";
import { PiPlusBold } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { Tooltip } from "react-tooltip";

// Simulate fetching language options from an API
const fetchLanguageOptions = async () => {
  return [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    // Add more languages as needed
  ];
};

const proficiencyOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Conversational", label: "Conversational" },
  { value: "Fluent", label: "Fluent" },
  { value: "Native or Bilingual", label: "Native or Bilingual" },
];

const FormFive5 = () => {
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;

  useEffect(() => {
    if (
      updateContext.isSeller == false ||
      updateContext.freelancerType !== "service"
    ) {
      updateContext.setStep(updateContext.currentPage + 1);
    }
  }, [updateContext]);

  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [showEditLanguageModal, setShowEditLanguageModal] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showEditSkillModal, setShowEditSkillModal] = useState(false);
  const [skills, setSkills] = useState("");
  const [editSkillIndex, setEditSkillIndex] = useState(null);

  const [showAddEducationModal, setShowAddEducationModal] = useState(false);
  const [showEditEducationModal, setShowEditEducationModal] = useState(false);
  const [school, setSchool] = useState("");
  const [dataSchoolFrom, setDataSchoolFrom] = useState("");
  const [dataSchoolTo, setDataSchoolTo] = useState("");
  const [degree, setDegree] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [descEducation, setDescEducation] = useState("");
  const [editEducationIndex, setEditEducationIndex] = useState(null);

  //Work & Experience
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showEditWorkModal, setShowEditWorkModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [dateWorkFrom, setDateWorkFrom] = useState("");
  const [dateWorkTo, setDateWorkTo] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [descWork, setDescWork] = useState("");
  const [editWorkIndex, setEditWorkIndex] = useState(null);

  // Generate an array of years from 1950 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => currentYear - index
  );

  useEffect(() => {
    const getLanguageOptions = async () => {
      const options = await fetchLanguageOptions();
      setLanguageOptions(options);
    };
    getLanguageOptions();
  }, []);

  const handleAddLanguage = () => {
    if (!selectedLanguage || !selectedProficiency) {
      toast.error("Please select both language and proficiency level.");
      return;
    }

    const newLanguage = {
      language: selectedLanguage.value,
      proficiency: selectedProficiency.value,
    };

    updateContext.setLanguages([...updateContext.userLanguages, newLanguage]);

    setShowAddLanguageModal(false);
    setSelectedLanguage(null);
    setSelectedProficiency(null);
  };

  const handleEditLanguage = () => {
    if (!selectedProficiency) {
      toast.error("Please select a proficiency level.");
      return;
    }

    const updatedLanguages = [...updateContext.userLanguages];
    updatedLanguages[editIndex].proficiency = selectedProficiency.value;

    updateContext.setLanguages(updatedLanguages);

    setShowEditLanguageModal(false);
    setSelectedProficiency(null);
    setEditIndex(null);
  };

  const handleDeleteLanguage = (index) => {
    const updatedLanguages = [...updateContext.userLanguages];
    updatedLanguages.splice(index, 1);
    updateContext.setLanguages(updatedLanguages);
    toast.success("Language deleted successfully.");
  };

  const openEditLanguageModal = (index) => {
    setEditIndex(index);
    setSelectedProficiency({
      value: updateContext.userLanguages[index].proficiency,
      label: updateContext.userLanguages[index].proficiency,
    });
    setShowEditLanguageModal(true);
  };

  const getAvailableLanguages = () => {
    const addedLanguages = updateContext.userLanguages.map(
      (lang) => lang.language
    );
    return languageOptions.filter(
      (option) => !addedLanguages.includes(option.value)
    );
  };

  const handleAddSkill = () => {
    if (!skills) {
      toast.error("Please enter a skill.");
      return;
    }

    updateContext.setSkills([...updateContext.userSkills, skills]);
    setShowAddSkillModal(false);
    setSkills("");
  };

  const handleEditSkill = () => {
    if (!skills) {
      toast.error("Please enter a skill.");
      return;
    }

    const updatedSkills = [...updateContext.userSkills];
    updatedSkills[editSkillIndex] = skills;

    updateContext.setSkills(updatedSkills);

    setShowEditSkillModal(false);
    setSkills("");
    setEditSkillIndex(null);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...updateContext.userSkills];
    updatedSkills.splice(index, 1);
    updateContext.setSkills(updatedSkills);
    toast.success("Skill deleted successfully.");
  };

  /*const openEditSkillModal = (index) => {
    setEditSkillIndex(index);
    setSkills(updateContext.userSkills[index]);
    setShowEditSkillModal(true);
  };*/

  // Education section
  const handleAddEducation = () => {
    if (!school || !dataSchoolFrom || !dataSchoolTo) {
      toast.error("Please enter all required fields.");
      return;
    }

    const newEducation = {
      school,
      dataSchoolFrom,
      dataSchoolTo,
      degree,
      areaOfStudy,
      descEducation,
    };

    updateContext.setEducation([...updateContext.userEducation, newEducation]);

    setShowAddEducationModal(false);
    setSchool("");
    setDataSchoolFrom("");
    setDataSchoolTo("");
    setDegree("");
    setAreaOfStudy("");
    setDescEducation("");
  };

  const handleEditEducation = () => {
    if (!school || !dataSchoolFrom || !dataSchoolTo) {
      toast.error("Please enter all required fields.");
      return;
    }

    const updatedEducation = [...updateContext.userEducation];
    updatedEducation[editEducationIndex] = {
      school,
      dataSchoolFrom,
      dataSchoolTo,
      degree,
      areaOfStudy,
      descEducation,
    };

    updateContext.setEducation(updatedEducation);

    setShowEditEducationModal(false);
    setSchool("");
    setDataSchoolFrom("");
    setDataSchoolTo("");
    setDegree("");
    setAreaOfStudy("");
    setDescEducation("");
    setEditEducationIndex(null);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = [...updateContext.userEducation];
    updatedEducation.splice(index, 1);
    updateContext.setEducation(updatedEducation);
    toast.success("Education deleted successfully.");
  };

  const openEditEducationModal = (index) => {
    setEditEducationIndex(index);
    setSchool(updateContext.userEducation[index].school);
    setDataSchoolFrom(updateContext.userEducation[index].dataSchoolFrom);
    setDataSchoolTo(updateContext.userEducation[index].dataSchoolTo);
    setDegree(updateContext.userEducation[index].degree);
    setAreaOfStudy(updateContext.userEducation[index].areaOfStudy);
    setDescEducation(updateContext.userEducation[index].descEducation);

    setShowEditEducationModal(true);
  };

  // Work & Experience
  const handleAddWork = () => {
    if (!companyName || !dateWorkFrom || !dateWorkTo) {
      toast.error("Please enter all required fields.");
      return;
    }

    const newWork = {
      companyName,
      dateWorkFrom,
      dateWorkTo,
      jobRole,
      descWork,
    };

    updateContext.setWorkExperience([...updateContext.workExperience, newWork]);

    setShowAddWorkModal(false);
    setCompanyName("");
    setDateWorkFrom("");
    setDateWorkTo("");
    setJobRole("");
    setDescWork("");
  };

  const handleEditWork = () => {
    if (!companyName || !dateWorkFrom || !dateWorkTo) {
      toast.error("Please enter all required fields.");
      return;
    }

    const updatedWork = [...updateContext.workExperience];
    updatedWork[editWorkIndex] = {
      companyName,
      dateWorkFrom,
      dateWorkTo,
      jobRole,
      descWork,
    };

    updateContext.setWorkExperience(updatedWork);

    setShowEditWorkModal(false);
    setCompanyName("");
    setDateWorkFrom("");
    setDateWorkTo("");
    setJobRole("");
    setDescWork("");
    setEditWorkIndex(null);
  };

  const handleDeleteWork = (index) => {
    const updatedWork = [...updateContext.workExperience];
    updatedWork.splice(index, 1);
    updateContext.setWorkExperience(updatedWork);
    toast.success("Work experience deleted successfully.");
  };

  const openEditWorkModal = (index) => {
    setEditWorkIndex(index);
    setCompanyName(updateContext.workExperience[index].companyName);
    setDateWorkFrom(updateContext.workExperience[index].dateWorkFrom);
    setDateWorkTo(updateContext.workExperience[index].dateWorkTo);
    setJobRole(updateContext.workExperience[index].jobRole);
    setDescWork(updateContext.workExperience[index].descWork);

    setShowEditWorkModal(true);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#ffffff",
      borderColor: state.isFocused ? "#2525258a" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #2525258a" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused
          ? "#2525258a"
          : provided["&:hover"].borderColor,
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem", // Tailwind's text-sm
      color: "#BEB5C3",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.875rem", // Tailwind's text-sm
    }),
    input: (provided) => ({
      ...provided,
      outline: "none",
      border: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0E9F6E"
        : state.isFocused
        ? "#0E9F6E"
        : null,
      color: state.isSelected || state.isFocused ? "#ffffff" : provided.color,
      "&:hover": {
        backgroundColor: state.isSelected ? "#0E9F6E" : "#0e9f6f8d",
        color: "#ffffff",
      },
    }),
  };

  const next = () => {
    if (
      !updateContext.userLanguages ||
      updateContext.userLanguages.length === 0
    ) {
      toast.error("Please add at least one language.");
    } else if (
      !updateContext.userSkills ||
      updateContext.userSkills.length === 0
    ) {
      toast.error("Please add at least one skill.");
    } else {
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <div className="scroll flex flex-col items-center justify-center gap-3 bg-[#F9F9F9] min-h-[84vh]">
      <div className=" xs-b:w-full md-b:w-2/3 lg-b:w-3/5 bg-[#fff] px-10 py-8 mt-5 rounded-2xl mb-11">
        <h2 className="text-lg md-b:text-4xl font-bold !text-[#333] text-left">
          Profile Details
        </h2>
        <h4 className="text-xs text-[#00000099] text-left">
          You can always change them later.
        </h4>
        <div className="form flex flex-col flex-wrap items-center gap-5 mt-5 mx-auto w-full">
          <div className="w-full flex flex-wrap justify-between items-center">
            {/* Languages Section */}
            <div className="mt-6 w-full sm:w-[46%] bg-white px-5 py-4 rounded-lg">
              <div className="flex justify-between items-center w-full border-b border-[#e0e0e0] pb-3 mb-5">
                <h2 className="text-lg md:text-xl font-bold text-[#333]">
                  Languages
                </h2>
                <button
                  onClick={() => setShowAddLanguageModal(true)}
                  className="text-[#0E9F6E] flex items-center justify-center border rounded-[50%] border-[#0E9F6E] p-1 hover:bg-[#0E9F6E] hover:text-white"
                >
                  <PiPlusBold />
                </button>
              </div>
              <div className="pl-3 w-full max-w-[450px] mx-auto mt-1">
                {updateContext.userLanguages.length > 0 ? (
                  <div className="text-sm w-2/3 ">
                    {updateContext.userLanguages.map((lang, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        <div>
                          <p className="font-semibold">
                            {lang.language}:{" "}
                            <span className="text-[#676767] font-normal">
                              {lang.proficiency}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => openEditLanguageModal(index)}
                            className="text-[#0E9F6E] flex items-center justify-center border rounded-[50%] border-[#0E9F6E] p-1 hover:bg-[#0E9F6E] hover:text-white mr-2"
                          >
                            <MdOutlineEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteLanguage(index)}
                            className="text-[#0E9F6E] flex items-center justify-center border rounded-[50%] border-[#0E9F6E] p-1 hover:bg-[#0E9F6E] hover:text-white"
                          >
                            <GoTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No languages added</p>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6 w-full sm:w-[46%] bg-white px-5 py-4 rounded-lg">
              <div className="flex justify-between items-center w-full border-b border-[#e0e0e0] pb-3 mb-5">
                <h2 className="text-lg md:text-xl font-bold text-[#333]">
                  Skills
                </h2>
                <button
                  onClick={() => setShowAddSkillModal(true)}
                  className="text-[#0E9F6E] flex items-center justify-center border rounded-[50%] border-[#0E9F6E] p-1 hover:bg-[#0E9F6E] hover:text-white"
                >
                  <PiPlusBold />
                </button>
              </div>
              <div className="w-full max-w-[450px] mt-5 text-left">
                {updateContext.userSkills.length > 0 ? (
                  <div>
                    {updateContext.userSkills.map((skill, index) => (
                      <div key={index} className="inline-block mr-1 mb-3">
                        <span className="bg-[#0E9F6E] text-white px-3 py-1 rounded-2xl ">
                          {skill}
                          <button
                            onClick={() => handleDeleteSkill(index)}
                            className="text-white"
                          >
                            <FaPlus className="rotate-45 text-xs ml-1" />
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No skills added</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-5 w-full">
            {/* Education Section */}
            <div className="mt-6 w-full sm:w-[44%] bg-white px-5 py-4 rounded-lg">
              <div className="flex justify-between items-center w-full border-b border-[#e0e0e0] pb-3 mb-5">
                <h2 className="text-lg md:text-xl font-bold text-[#333]">
                  Education
                </h2>
                <button
                  onClick={() => setShowAddEducationModal(true)}
                  className="text-[#0E9F6E] flex items-center justify-center border rounded-full border-[#0E9F6E] p-1 hover:bg-[#0E9F6E] hover:text-white"
                >
                  <PiPlusBold />
                </button>
              </div>
              <div className="w-full mx-auto mt-5">
                {updateContext.userEducation.length > 0 ? (
                  <div>
                    {updateContext.userEducation.map((edu, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        {/* Education List */}
                        <div className="relative w-full">
                          <div className="pl-[50px] relative">
                            <div className="bg-[#f1fcfa] rounded-full text-[11px] font-bold h-[30px] leading-[30px] left-0 absolute text-center w-[30px] text-[#5bbb7b] before:absolute before:content-[''] before:border-l before:border-dashed before:border-[#5bbb7b] before:bottom-0 before:h-[140px] before:left-[15px] before:top-[40px] before:w-[1px]">
                              M
                            </div>
                            <div className="relative mb-[40px]">
                              <div className="xl-b:absolute xl-b:right-0 mb-[15px] relative">
                                <div className="flex flex-wrap">
                                  <button
                                    className="bg-[#ffede8] rounded-[4px] text-[#1f4b3f] h-[40px] leading-[45px] text-center w-[40px] mr-2 cursor-pointer transition-all duration-300 ease-linear flex justify-center items-center"
                                    id="edit"
                                    onClick={() =>
                                      openEditEducationModal(index)
                                    }
                                  >
                                    <Tooltip
                                      anchorSelect="#edit"
                                      className="ui-tooltip"
                                    >
                                      Edit
                                    </Tooltip>
                                    <MdOutlineEdit className="text-xl" />
                                  </button>
                                  <button
                                    className="bg-[#ffede8] rounded-[4px] text-[#1f4b3f] h-[40px] leading-[45px] text-center w-[40px] cursor-pointer transition-all duration-300 ease-linear flex justify-center items-center"
                                    id="delete"
                                    onClick={() => handleDeleteEducation(index)}
                                  >
                                    <Tooltip
                                      anchorSelect="#delete"
                                      className="ui-tooltip"
                                    >
                                      Delete
                                    </Tooltip>
                                    <GoTrash className="text-xl" />
                                  </button>
                                </div>
                              </div>
                              <span className="bg-[#ffede8] rounded-full inline-block text-[13px] py-[5px] px-[20px] text-[#222] font-medium leading-[28px]">
                                {edu.dataSchoolFrom} - {edu.dataSchoolTo}
                              </span>
                              <h5 className="mt-4 text-[17px] font-medium text-[#222] leading-[1.3125] mb-2">
                                {edu.degree}
                              </h5>
                              <h6 className="text-thm text-[#5bbb7b] text-[15px] font-medium leading-[1.3125] mt-0 mb-2">
                                {edu.school}
                              </h6>
                              <p className="my-0 mr-[15px] text-[#6b7177] leading-[1.85] font-normal">
                                {edu.descEducation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No education added</p>
                )}
              </div>
            </div>

            {/* Work & Experience Section */}
            <div className="mt-6 w-full sm:w-[44%] bg-white px-5 py-4 rounded-lg">
              <div className="flex justify-between items-center w-full border-b border-[#e0e0e0] pb-3 mb-5">
                <h2 className="text-lg md:text-xl font-bold text-[#333]">
                  Work & Experience
                </h2>
                <button
                  onClick={() => setShowAddWorkModal(true)}
                  className="text-[#0E9F6E] flex items-center justify-center border rounded-full border-[#0E9F6E] p-1 hover:bg-[#0E9F6E] hover:text-white"
                >
                  <PiPlusBold />
                </button>
              </div>
              <div className="w-full mx-auto mt-5">
                {updateContext.workExperience.length > 0 ? (
                  <div>
                    {updateContext.workExperience.map((wrk, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap justify-between items-start mb-4"
                      >
                        {/* Work List */}
                        <div className="relative w-full">
                          <div className="pl-14 relative">
                            <div className="bg-[#f1fcfa] rounded-full text-[11px] font-bold h-8 leading-8 left-0 absolute text-center w-8 text-[#5bbb7b] before:absolute before:content-[''] before:border-l before:border-dashed before:border-[#5bbb7b] before:bottom-0 before:h-36 before:left-4 before:top-10 before:w-px">
                              M
                            </div>
                            <div className="relative mb-10">
                              <div className="xl-b:absolute xl-b:right-0 mb-4">
                                <div className="flex flex-wrap">
                                  <button
                                    className="bg-[#ffede8] rounded-[4px] text-[#1f4b3f] h-10 w-10 mr-2 cursor-pointer transition-all duration-300 ease-linear flex justify-center items-center"
                                    id="edit"
                                    onClick={() => openEditWorkModal(index)}
                                  >
                                    <Tooltip
                                      anchorSelect="#edit"
                                      className="ui-tooltip"
                                    >
                                      Edit
                                    </Tooltip>
                                    <MdOutlineEdit className="text-xl" />
                                  </button>
                                  <button
                                    className="bg-[#ffede8] rounded-[4px] text-[#1f4b3f] h-10 w-10 cursor-pointer transition-all duration-300 ease-linear flex justify-center items-center"
                                    id="delete"
                                    onClick={() => handleDeleteWork(index)}
                                  >
                                    <Tooltip
                                      anchorSelect="#delete"
                                      className="ui-tooltip"
                                    >
                                      Delete
                                    </Tooltip>
                                    <GoTrash className="text-xl" />
                                  </button>
                                </div>
                              </div>
                              <span className="bg-[#ffede8] rounded-full inline-block text-[13px] py-1.5 px-5 text-[#222] font-medium leading-[28px]">
                                {wrk.dateWorkFrom} - {wrk.dateWorkTo}
                              </span>
                              <h5 className="mt-4 text-[17px] font-medium text-[#222] leading-[1.3125] mb-2">
                                {wrk.jobRole}
                              </h5>
                              <h6 className="text-thm text-[#5bbb7b] text-[15px] font-medium leading-[1.3125] mt-0 mb-2">
                                {wrk.companyName}
                              </h6>
                              <p className="my-0 text-[#6b7177] leading-[1.85] font-normal">
                                {wrk.descWork}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No Work added</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between">
            <button
              className="border mt-3 w-fit font-semibold px-5 py-[5px] text-lg border-[#1DBF73] !bg-white ud-btn btn-thm btn-white hover:!bg-[#046c4e] text-[#1DBF73] hover:text-white rounded-md"
              type="button"
              onClick={() =>
                updateContext.setStep(updateContext.currentPage - 1)
              }
            >
              Previous
            </button>
            <button
              className="border ud-btn btn-thm btn-white mt-3 w-fit font-semibold px-5 py-[5px] text-lg border-[#1DBF73] !bg-[#0E9F6E] hover:!bg-[#046c4e] text-white rounded-md"
              type="button"
              onClick={next}
            >
              Next
            </button>
          </div>
        </div>

        {/* Add Language Modal */}
        {showAddLanguageModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold">Add Language</h3>
                <button
                  onClick={() => setShowAddLanguageModal(false)}
                  className="text-gray-600 hover:text-gray-900 !text-5xl"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label>Language</label>
                <Select
                  options={getAvailableLanguages()}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  className=" w-full"
                  styles={customStyles}
                />
              </div>
              <div className="mb-4">
                <label>Proficiency</label>
                <Select
                  options={proficiencyOptions}
                  value={selectedProficiency}
                  onChange={setSelectedProficiency}
                  styles={customStyles}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAddLanguageModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLanguage}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Language Modal */}
        {showEditLanguageModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Language</h3>
                <button
                  onClick={() => setShowEditLanguageModal(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label>Proficiency</label>
                <Select
                  options={proficiencyOptions}
                  value={selectedProficiency}
                  onChange={setSelectedProficiency}
                  styles={customStyles}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowEditLanguageModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditLanguage}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Skill Modal */}
        {showAddSkillModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold">Add Skill</h3>
                <button
                  onClick={() => setShowAddSkillModal(false)}
                  className="text-gray-600 hover:text-gray-900 !text-5xl"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label>Skill</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                  placeholder="Ex: HTML5, CSS3, JavaScript, Design, ..etc"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAddSkillModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSkill}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Skill Modal */}
        {showEditSkillModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Skill</h3>
                <button
                  onClick={() => setShowEditSkillModal(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label>Skill</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowEditSkillModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Education Modal */}
        {showAddEducationModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold">Add education</h3>
                <button
                  onClick={() => setShowAddEducationModal(false)}
                  className="text-gray-600 hover:text-gray-900 !text-5xl"
                >
                  &times;
                </button>
              </div>
              <div className="px-3 overflow-x-auto min-h-[400px]">
                <div className="mb-7">
                  <label>School</label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                    placeholder="Ex: Djillali Bounama University"
                  />
                </div>
                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  {/* Date Start Input */}
                  <div className="w-[44%] mt-1 leading-normal">
                    <label htmlFor="date_start">
                      Dates Attended (Optional)
                    </label>
                    <select
                      id="date_start"
                      name="date_start"
                      className="block w-full input focus:outline-none focus:border-[#2525258a]  focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      value={dataSchoolFrom}
                      onChange={(e) => setDataSchoolFrom(e.target.value)}
                    >
                      <option value="">from</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[44%] mt-1 leading-normal">
                    <label
                      htmlFor="date_end"
                      className="text-[#344054] bg-[#ffffff] text-xs font-normal mb-1 inline-block"
                    ></label>
                    <select
                      id="date_end"
                      name="date_end"
                      className="block w-full input focus:outline-none focus:border-[#2525258a] focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      onChange={(e) => setDataSchoolTo(e.target.value)}
                      value={dataSchoolTo}
                    >
                      <option value="">To (or expected graduation year)</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  <div className="w-[44%] mt-1 leading-normal">
                    <label className="mb-4">Degree (Optional)</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                      placeholder="Ex: Master of Philosofy (MPhil)"
                    />
                  </div>

                  <div className="w-[44%] mt-1 leading-normal">
                    <label>Area of Study (Optional)</label>
                    <input
                      type="text"
                      value={areaOfStudy}
                      onChange={(e) => setAreaOfStudy(e.target.value)}
                      className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                      placeholder="Ex: Computer Science"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full text-left !h-24">
                  <label htmlFor="descEducation">Description (Optional)</label>
                  <textarea
                    name="descEducation"
                    id="descEducation"
                    value={descEducation}
                    onChange={(e) => setDescEducation(e.target.value)}
                    className="block w-full !h-96 input focus:outline-none focus:border-[#2525258a] bg-white focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] !p-2 !h-24`}"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAddEducationModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEducation}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Education Modal */}
        {showEditEducationModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold">Edit education</h3>
                <button
                  onClick={() => setShowEditEducationModal(false)}
                  className="text-gray-600 hover:text-gray-900 !text-5xl"
                >
                  &times;
                </button>
              </div>
              <div className="px-3 overflow-x-auto min-h-[400px]">
                <div className="mb-7">
                  <label>School</label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                    placeholder="Ex: Djillali Bounama University"
                    required
                  />
                </div>
                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  {/* Date Start Input */}
                  <div className="w-[44%] mt-1 leading-normal">
                    <label htmlFor="date_start">
                      Dates Attended (Optional)
                    </label>
                    <select
                      id="date_start"
                      name="date_start"
                      className="block w-full input focus:outline-none focus:border-[#2525258a]  focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      value={dataSchoolFrom}
                      onChange={(e) => setDataSchoolFrom(e.target.value)}
                    >
                      <option value="">from</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[44%] mt-1 leading-normal">
                    <label
                      htmlFor="date_end"
                      className="text-[#344054] bg-[#ffffff] text-xs font-normal mb-1 inline-block"
                    ></label>
                    <select
                      id="date_end"
                      name="date_end"
                      className="block w-full input focus:outline-none focus:border-[#2525258a] focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      onChange={(e) => setDataSchoolTo(e.target.value)}
                      value={dataSchoolTo}
                    >
                      <option value="">To (or expected graduation year)</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  <div className="w-[44%] mt-1 leading-normal">
                    <label className="mb-4">Degree (Optional)</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                      placeholder="Ex: Master of Philosofy (MPhil)"
                    />
                  </div>

                  <div className="w-[44%] mt-1 leading-normal">
                    <label>Area of Study (Optional)</label>
                    <input
                      type="text"
                      value={areaOfStudy}
                      onChange={(e) => setAreaOfStudy(e.target.value)}
                      className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                      placeholder="Ex: Computer Science"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full text-left !h-24">
                  <label htmlFor="descEducation">Description (Optional)</label>
                  <textarea
                    name="descEducation"
                    id="descEducation"
                    value={descEducation}
                    onChange={(e) => setDescEducation(e.target.value)}
                    className="block w-full !h-96 input focus:outline-none focus:border-[#2525258a] bg-white focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] !p-2 !h-24`}"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowEditEducationModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditEducation}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Work Modal */}
        {showAddWorkModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold">Add Work</h3>
                <button
                  onClick={() => setShowAddWorkModal(false)}
                  className="text-gray-600 hover:text-gray-900 !text-5xl"
                >
                  &times;
                </button>
              </div>
              <div className="px-3 overflow-x-auto min-h-[400px]">
                <div className="mb-7">
                  <label>Company name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                    placeholder="Ex: Google"
                  />
                </div>
                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  {/* Date Start Input */}
                  <div className="w-[44%] mt-1 leading-normal">
                    <label htmlFor="date_start">
                      Dates Attended (Optional)
                    </label>
                    <select
                      id="date_start"
                      name="date_start"
                      className="block w-full input focus:outline-none focus:border-[#2525258a]  focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      value={dateWorkFrom}
                      onChange={(e) => setDateWorkFrom(e.target.value)}
                    >
                      <option value="">from</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[44%] mt-1 leading-normal">
                    <label
                      htmlFor="date_end"
                      className="text-[#344054] bg-[#ffffff] text-xs font-normal mb-1 inline-block"
                    ></label>
                    <select
                      id="date_end"
                      name="date_end"
                      className="block w-full input focus:outline-none focus:border-[#2525258a] focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      onChange={(e) => setDateWorkTo(e.target.value)}
                      value={dateWorkTo}
                    >
                      <option value="">To (or expected year)</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  <label className="mb-4">Job name</label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                    placeholder="Ex: Software Engineer"
                  />
                </div>

                <div className="flex flex-col w-full text-left !h-24">
                  <label htmlFor="descEducation">Description (Optional)</label>
                  <textarea
                    name="descWork"
                    id="descWork"
                    value={descWork}
                    onChange={(e) => setDescWork(e.target.value)}
                    className="block w-full !h-96 input focus:outline-none focus:border-[#2525258a] bg-white focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] !p-2 !h-24`}"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAddWorkModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWork}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Work Modal */}
        {showEditWorkModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-[740px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold">Edit work</h3>
                <button
                  onClick={() => setShowEditWorkModal(false)}
                  className="text-gray-600 hover:text-gray-900 !text-5xl"
                >
                  &times;
                </button>
              </div>
              <div className="px-3 overflow-x-auto min-h-[400px]">
                <div className="mb-7">
                  <label>Company name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                    placeholder="Ex: Djillali Bounama University"
                    required
                  />
                </div>
                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  {/* Date Start Input */}
                  <div className="w-[44%] mt-1 leading-normal">
                    <label htmlFor="date_start">
                      Dates Attended (Optional)
                    </label>
                    <select
                      id="date_start"
                      name="date_start"
                      className="block w-full input focus:outline-none focus:border-[#2525258a]  focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      value={dateWorkFrom}
                      onChange={(e) => setDateWorkFrom(e.target.value)}
                    >
                      <option value="">from</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[44%] mt-1 leading-normal">
                    <label
                      htmlFor="date_end"
                      className="text-[#344054] bg-[#ffffff] text-xs font-normal mb-1 inline-block"
                    ></label>
                    <select
                      id="date_end"
                      name="date_end"
                      className="block w-full input focus:outline-none focus:border-[#2525258a] focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] bg-[#ffffff]"
                      onChange={(e) => setDateWorkTo(e.target.value)}
                      value={dateWorkTo}
                    >
                      <option value="">To (or expected year)</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap w-full text-left mb-7">
                  <label className="mb-4"> Job name</label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="block p-4 w-full input bg-[#ffffff] focus:outline-none focus:border-[#2525258a] 
                   focus-within:outline-none focus-within:border  placeholder:text-sm placeholder:text-[#BEB5C3]"
                    placeholder="Ex: Master of Philosofy (MPhil)"
                  />
                </div>

                <div className="flex flex-col w-full text-left !h-24">
                  <label htmlFor="descWork">Description (Optional)</label>
                  <textarea
                    name="descWork"
                    id="descWprl"
                    value={descEducation}
                    onChange={(e) => setDescWork(e.target.value)}
                    className="block w-full !h-96 input focus:outline-none focus:border-[#2525258a] bg-white focus-within:outline-none placeholder:text-sm placeholder:text-[#BEB5C3] !p-2 !h-24`}"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowEditWorkModal(false)}
                  className="px-4 py-2  mr-2 text-[#0E9F6E] "
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditWork}
                  className="px-5 py-2 bg-[#0E9F6E] text-white rounded-3xl hover:bg-[#046c4e]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default FormFive5;
