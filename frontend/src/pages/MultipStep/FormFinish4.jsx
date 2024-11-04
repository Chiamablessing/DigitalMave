import React, { useContext, useState, useEffect } from "react";
import AppContext from "./Context";
import "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";
import { AuthContext } from "../../context/AuthContext";

const FormFinish = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const userInfo = currentUser;

  const navigate = useNavigate();

  // If the user is not found in the local storage, redirect to the login page
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const [error, setError] = useState(null);
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;

  const name = updateContext.userName;

  const userProfile =
    [
      {
        userEducation: (updateContext.userEducation || []).map((education) => ({
          school: `${education.school}`,
          degree: `${education.degree}`,
          fieldOfStudy: `${education.areaOfStudy}`,
          startYear: `${education.dataSchoolFrom}`,
          endYear: `${education.dataSchoolTo}`,
          description: `${education.descEducation}`,
        })),
        // This is just an array of strings
        userSkills: (updateContext.userSkills || []).map((skill) => ({
          skill: `${skill}`,
        })),
        workExperience: (updateContext.workExperience || []).map((work) => ({
          title: `${work.jobRole}`,
          company: `${work.companyName}`,
          startYear: `${work.dateWorkFrom}`,
          endYear: `${work.dateWorkTo}`,
          description: `${work.descWork}`,
        })),
        userLanguages: (updateContext.userLanguages || []).map((language) => ({
          language: `${language.language}`,
          proficiency: `${language.proficiency}`,
        })),
      },
    ] || [];

  const finish = async (e) => {
    e.preventDefault();
    try {
      const storeImg = await updateContext.storeImg;
      const img = await updateContext.userImg;
      const dataFinal = {
        _id: `${userInfo._id}`,
        username: `${updateContext.userName}`,
        displayName: `${updateContext.userDisplayName}`,
        dob: `${updateContext.userDOB}`,
        desc: `${updateContext.userDescription}`,
        gender: `${updateContext.userGender}`,
        phone: `${updateContext.userPhone}`,
        isSeller: `${updateContext.isSeller}`,
        userIdType: `${updateContext.userIdType}`,
        userIdNumber: `${updateContext.userIdNumber}`,
        userIssuedD: `${updateContext.userIssuedD}`,
        userExpiredD: `${updateContext.userExpiredD}`,
        userOccupation: `${updateContext.userOccupation}`,
        freelancerType: `${updateContext.freelancerType}`,
        city: `${updateContext.city}`,
        state: `${updateContext.state}`,
        userProfile: userProfile ? userProfile : [],
        userStore: {
          storeImg: `${storeImg ? storeImg : ""}`,
          storeName: `${updateContext.userStoreName}`,
          storeLocation: `${updateContext.userStoreLocation}`,
          storeCat: `${updateContext.userStoreCategory}`,
          storeDesc: `${updateContext.userStoreDescription}`,
        },
        ...(img === null ? { img: `${userInfo.img}` } : { img: `${img}` }),
      };
      updateUser({ ...currentUser, ...dataFinal });

      await newRequest.post("/stepper/welcome", dataFinal);
      currentUser.isSeller
        ? navigate("/homefreelancer")
        : navigate("/homeclient");

      toast.success("welcome", { position: "top-right" });
    } catch (err) {
      setError(err.response.data);
      toast.error(error, { position: "top-right" });
    }
  };

  return (
    <>
      <div className="scroll flex flex-col items-center justify-center gap-3 bg-[#F9F9F9] min-h-[84vh]">
        <form onSubmit={finish} className="px-4 md-b:max-w-[700px] text-center">
          <div className="w-full flex items-center justify-center my-5 overflow-hidden ">
            <img
              className="done mx-auto w-40 h-40 z-20"
              src="/src/assets/success.png"
              alt="success"
            />
            <img
              className="done mx-auto w-72 h-64 absolute z-10"
              src="/src/assets/party.png"
              alt="success"
            />
          </div>
          <h2 className="text-lg md-b:text-xl font-bold !text-[#333] !z-30 relative">
            Congratulation {name} ! You are all set up now 👌
          </h2>
          <h4 className="text-xs text-[#00000099]">
            You have completed your profile set up successfully, you can now
            start using the FreelySlah ✨
          </h4>

          <button className="border mt-8 w-fit font-bold px-7 py-[5px] text-lg   border-[#1DBF73] !bg-[#0E9F6E]  hover:!bg-[#046c4e] text-white rounded-md   ">
            Finish
          </button>
          {/* Handle notifications */}
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default FormFinish;
