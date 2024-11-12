import React, { useState, useEffect, useContext } from "react";
import "./styles.module.css";
import AppContext from "./Context";
import FormOne1 from "./FormOne1";
import FormTwo2 from "./FormTwo2";
import FormThree3 from "./FormThree3.jsx";
import FormFinish4 from "./FormFinish4";
// import Navbar from "../../Components/NavbarF/NavbarF.jsx";
import MultiStep from "../MultipStep/MultiStep.jsx";
import FormFreelancer from "./FormFreelancer.jsx";
import { Link,useNavigate} from "react-router-dom";
import FormFive5 from "./FormFive5.jsx";
import FormSix6 from "./FormSix6.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const StepForm1 = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // if currentUser has no description then navigate to login page
  useEffect(() => {
    if (currentUser?.desc !== null && currentUser?.isSeller === true) {
      navigate("/");
    } else if (currentUser?.desc === null && currentUser?.isSeller === false) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const [step, setStep] = useState(0);
  const [username, setUserName] = useState(null);
  const [userDisplayName, setDisplayName] = useState(null);
  const [userDescription, setDescription] = useState(null);
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [gender, setGender] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [userIdType, setIdType] = useState(null);
  const [userIdNumber, setIdNumber] = useState(null);
  const [userIssuedD, setIssuedD] = useState(null);
  const [userExpiredD, setExpiredD] = useState(null);
  const [img, setImg] = useState(null);
  const [userDOB, setDOB] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [freelancerType, setFreelancerType] = useState(null);
  const [userLanguages, setLanguages] = useState([]);
  const [userSkills, setSkills] = useState([]);
  const [userEducation, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [userStoreName, setStoreName] = useState(null);
  const [userStoreDescription, setStoreDescription] = useState(null);
  const [userStoreCategory, setStoreCategory] = useState(null);
  const [userStoreLocation, setStoreLocation] = useState(null);
  const [storeImg, setStoreImg] = useState(null);

  // set userDetails

  const userDetails = {
    currentPage: step,
    userName: username,
    userDisplayName: userDisplayName,
    userDescription: userDescription,
    userPhone: phone,
    userCountry: country,
    userGender: gender,
    userOccupation: occupation,
    userIdType: userIdType,
    userIdNumber: userIdNumber,
    userIssuedD: userIssuedD,
    userExpiredD: userExpiredD,
    userDOB: userDOB,
    userImg: img,
    isSeller: isSeller,
    freelancerType: freelancerType,
    userLanguages: userLanguages,
    userSkills: userSkills,
    userEducation: userEducation,
    workExperience: workExperience,
    city: city,
    state: state,
    userStoreName: userStoreName,
    userStoreDescription: userStoreDescription,
    userStoreCategory: userStoreCategory,
    userStoreLocation: userStoreLocation,
    storeImg: storeImg,

    setUserName,
    setDisplayName,
    setPhone,
    setStep,
    setCountry,
    setCity,
    setGender,
    setOccupation,
    setIdType,
    setIdNumber,
    setIssuedD,
    setExpiredD,
    setDescription,
    setImg,
    setDOB,
    setIsSeller,
    setFreelancerType,
    setLanguages,
    setSkills,
    setEducation,
    setWorkExperience,
    setState,
    setStoreName,
    setStoreDescription,
    setStoreCategory,
    setStoreLocation,
    setStoreImg,
  };

  return (
    <AppContext.Provider value={{ userDetails }}>
      <div className="main">
        {/* <Navbar /> */}

        {/* <ProgressBar /> */}
        {step === 0 && <MultiStep />}
        {step === 1 && <FormFreelancer />}
        {step === 2 && <FormFive5 />}
        {step === 3 && <FormSix6 />}
        {step === 4 && <FormOne1 />}
        {step === 5 && <FormTwo2 />}
        {step === 6 && <FormThree3 />}
        {step === 7 && <FormFinish4 />}
      </div>
    </AppContext.Provider>
  );
};

export default StepForm1;
