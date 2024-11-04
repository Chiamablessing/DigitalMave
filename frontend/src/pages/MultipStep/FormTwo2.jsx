import React, { useContext, useState, useEffect } from "react";
import AppContext from "./Context";
import "./styles.module.css";
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormTwo2 = () => {
  const myContext = useContext(AppContext);
  const updateContext = myContext.userDetails;
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const getCountryIsoCode = (countryName) => {
      const countries = Country.getAllCountries();
      const country = countries.find(
        (c) => c.name.toLowerCase() === countryName.toLowerCase()
      );
      return country ? country.isoCode : "N/A";
    };
  const userCountry = getCountryIsoCode(userInfo.country);


  // Function to get the state name from the state code and country ISO code
  const getStateName = (stateCode, countryIsoCode) => {
    const state = State.getStateByCodeAndCountry(stateCode, countryIsoCode);
    return state ? state.name : "N/A";
  };



  const [state, setState] = useState("");
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    if (userCountry) {
      setStatesData(State.getStatesOfCountry(userCountry));
    } else {
      setStatesData([]);
      setState("");
      setCitiesData([]);
    }
  }, [userCountry]);

  useEffect(() => {
    if (state) {
      setCitiesData(City.getCitiesOfState(userCountry, state));
    } else {
      setCitiesData([]);
    }
  }, [state, userCountry]);

  const next = () => {
    if (!updateContext.userDOB) {
      toast.error("Please enter your Date of Birth");
    } else if (
      !updateContext.userPhone ||
      updateContext.userPhone.length < 10
    ) {
      toast.error("Please enter your phone number correctly");
    } else if (!updateContext.city) {
      toast.error("Please enter your City");
    } else if (!updateContext.state) {
      toast.error("Please enter your State");
      // add the state name rather than the state isoCode
    } else if (!updateContext.userGender) {
      toast.error("Please enter your gender");
    } else if (!updateContext.userOccupation) {
      toast.error("Please enter your Occupation");
    } else {
      updateContext.setState(getStateName(updateContext.state, userCountry));
      updateContext.setStep(updateContext.currentPage + 1);
    }
  };

  return (
    <>
      <div className="scroll flex flex-col items-center justify-center gap-3 bg-[#F9F9F9] min-h-[84vh]">
        <div className="px-4 md-b:max-w-[700px] text-center">
          <h2 className="text-lg md-b:text-xl font-bold !text-[#333]">
            Personal Details Requested: Tell Us About Yourself
          </h2>
          <h4 className="text-xs text-[#00000099]">
            You can always change them later.
          </h4>
          <form className="form flex flex-col items-center w-full gap-5 mt-5 max-w-[450px] mx-auto">
            <div className="flex justify-between flex-wrap w-full text-left">
              {/* Date of Birth */}
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  className="block p-4 w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Date of Birth"
                  required
                  onChange={(e) => updateContext.setDOB(e.target.value)}
                />
              </div>
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="phone"
                >
                  Mobile Number
                </label>
                <PhoneInput
                  country={"dz"}
                  value={updateContext.userPhone}
                  onChange={(phone) => updateContext.setPhone(phone)}
                  inputClass="!block !w-full !input focus:!outline-none focus:!border-[#0e9f6e] focus-within:!outline-none focus-within:!border-[#0e9f6e] placeholder:!text-sm placeholder:!text-[#BEB5C3]"
                  maxLength="13"
                />
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-full text-left">
              {/* State Input */}
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  htmlFor="state"
                  className="text-[#344054] text-xs font-normal mb-1 inline-block"
                >
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  onChange={(e) => {
                    setState(e.target.value);
                    updateContext.setState(e.target.value);
                  }}
                  className="block w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  disabled={!userCountry}
                >
                  <option value="">Select State</option>
                  {statesData.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* City Input */}
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  htmlFor="city"
                  className="text-[#344054] text-xs font-normal mb-1 inline-block"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  onChange={(e) => updateContext.setCity(e.target.value)}
                  className="block w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  disabled={!state}
                >
                  <option value="">Select City</option>
                  {citiesData.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-full text-left">
              {/* Gender */}
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="block w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  name="gender"
                  id="gender"
                  onChange={(e) => updateContext.setGender(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* Occupation */}
              <div className="w-[44%] mx-auto mt-1 leading-normal">
                <label
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-[#333]"
                  htmlFor="occupation"
                >
                  Occupation
                </label>
                <input
                  className="block p-4 w-full input focus:outline-none focus:border-[#0e9f6e] focus-within:outline-none focus-within:border-[#0e9f6e] placeholder:text-sm placeholder:text-[#BEB5C3]"
                  type="text"
                  name="occupation"
                  id="occupation"
                  placeholder="e.g. Software Developer"
                  required
                  onChange={(e) => updateContext.setOccupation(e.target.value)}
                />
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
            {/* Handle notifications */}
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormTwo2;
