import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Navigation from "./Navigation.jsx";
import useStickyMenu from "./useStickyMenu.js";
import MobileNavigation from "./MobileNavigation.jsx";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RiNotification3Line } from "react-icons/ri";
import { HiOutlineSupport } from "react-icons/hi";
import {
  IoBriefcaseOutline,
  IoAddCircleOutline,
  IoBagCheckOutline,
  IoChatbubbleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
  IoRefreshCircleOutline,
  IoBriefcaseOutline as IoBriefcase,
} from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BiUserCircle } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext.jsx";
function NavbarF() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const sticky = useStickyMenu(50);
  const [open, setOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null); // state to manage which dropdown is open

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: <IoCheckmarkCircleOutline className="text-green-500" />,
      message: "Delivery Successful to Toot",
      details: "Order #34567 had been placed.",
      time: "5 min",
    },
    {
      id: 2,
      icon: <IoRefreshCircleOutline className="text-blue-500" />,
      message: "Process refund from Micky",
      details: "Reference number #10321",
      time: "12 min",
    },
    {
      id: 3,
      icon: <IoInformationCircleOutline className="text-blue-500" />,
      message: "Survey Completed",
      details: "134 Customers Answers finished...",
      time: "17 min",
    },
    {
      id: 4,
      icon: <IoCloseCircleOutline className="text-red-500" />,
      message: "Payment failed from Sandra",
      details: "Reference number #10321",
      time: "23 min",
    },
    {
      id: 5,
      icon: <IoCheckmarkCircleOutline className="text-green-500" />,
      message: "Delivery Successful to Sandra",
      details: "Order #34567 had been placed.",
      time: "23 min",
    },
  ]);

  const [searchFilterOpen, setSearchFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Talent");

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setSearchFilterOpen(false);
  };

  const handleLogout = async () => {
    try {
      await newRequest.put(`/users/${currentUser._id}`, {
        isOnline,
      });
      await newRequest.post("/auth/logout");
      //localStorage.setItem("currentUser", null);
      //setCurrentUser(null); // Update state to reflect logout
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".dropdown") === null) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*  const handleLinkClick = () => {
    setOpenDropdown(null);
    setOpen(false);
  };
*/
  return (
    <>
      <header
        className={`header-nav nav-homepage-style stricky main-menu animated bg-white  border-[#E9E9E9] py-[15px] border px-0 max-[992px]:hidden lg-b:block  text-[15px] font-normal text-[#6B7177] leading-[28px] transition-all duration-300 ease-linear z-[99] ${
          sticky ? "slideInDown sticky top-0" : "slideIn"
        }`}
      >
        <nav className="relative">
          <div className="relative w-full px-4 mx-auto">
            <div className="items-center justify-between flex flex-wrap mt-0 -mx-3 ">
              <div className="!pr-0 max-w-full px-3 mr-0 !flex-initial !flex-shrink-0 !w-auto">
                <div className="flex items-center ">
                  <Link
                    className="header-logo logo1 outline-none 2xl-b:pr-[30px] border-r border-[#E9E9E9] cursor-pointer text-[#222] !pr-[8px] flex justify-between items-center"
                    to={
                      currentUser &&
                      (!currentUser.isSeller
                        ? "/homeclient"
                        : "/homefreelancer")
                    }
                  >
                    {/* <img
                      src="/src/assets/logo.svg"
                      alt="logo"
                      className="w-9 h-auto mr-4"
                    /> */}
                    <span className=" -ml-1 text-[20px] font-bold !text-xl !text-[#022C22] playfair-display-regular relative">
                      <span className="playfair-display-regular">Digital</span>{" "}
                      <span className="!text-base z-10 relative text-[#022C22] -ml-[2px] dancing-script-regular  bg-[#BEF264] w-full h-full">
                        Slah
                      </span>
                    </span>
                  </Link>
                  {currentUser && (
                    <div className="home1_style ml-4">
                      <Navigation
                        role={currentUser?.isSeller ? "seller" : "client"}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className=" w-auto  max-w-full flex-initial !flex-shrink-0 px-3 mt-0 ">
                <div className="flex  items-center">
                  <div className="relative mr-1">
                    <div className="hidden xl:flex items-center border border-gray-300 rounded-3xl hover:bg-[#E9E9E9]   group2 text-[#333] transition-all duration-500 ease-linear 2xl-b:mr-6 ">
                      <div className="px-2 py-[6px] outline-none xl-b:w-[200px] lg-b:w-[150px] 2xl-b:w-[300px]  hover:bg-[#F9F9F9] flex items-center justify-start group rounded-3xl  focus:bg-[#F9F9F9] focus:rounded-3xl  focus:shadow-md focus:border focus:border-[#A4A4A4] focus-within:border-2 focus-within:border-[#A4A4A4] focus-within:rounded-3xl focus-within:shadow-md focus-within:py-1">
                        <GoSearch className="text-[#222] text-[20px] mx-2" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="outline-none bg-transparent group-hover:bg-[#F9F9F9] w-full placeholder:text-[#333] "
                        />
                      </div>
                      <div className="relative w-1/3">
                        <button
                          onClick={() => {
                            setOpenDropdown(
                              openDropdown === "searchFilter"
                                ? null
                                : "searchFilter"
                            );
                            setSearchFilterOpen(!searchFilterOpen);
                          }}
                          className="flex items-center justify-center px-2 before:content-[''] before:absolute before:left-0 before:h-[23px] before:w-[1px] before:bg-[#E9E9E9] before:top-1/2  before:mr-2  before:-translate-y-1/2 before:z-[1]

                        hover:bg-[#F9F9F9] hover:rounded-3xl py-1 group-hover:border-l-0 group-hover:border-r-0 w-full group-hover:rounded-3xl group-focus:rounded-3xl group-focus:border-r-0 group-focus:border-l-0 focus-within:border-2 focus-within:border-[#A4A4A4] focus-within:rounded-3xl focus-within:shadow-md z-10 group-focus-within:before:hidden "
                        >
                          {selectedFilter} <IoIosArrowDown className="ml-2" />
                        </button>
                        {searchFilterOpen && (
                          <div className="absolute right-0 mt-1 w-[150px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-base font-medium text-[#333]">
                            <ul>
                              <li
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                onClick={() => selectFilter("Talent")}
                              >
                                <GoPeople className="mr-2 text-xl" />
                                <span>Talent</span>
                              </li>
                              <li
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                onClick={() => selectFilter("Projects")}
                              >
                                <IoBriefcase className="mr-2" />
                                <span>Projects</span>
                              </li>
                              <li
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                onClick={() => selectFilter("Product")}
                              >
                                <BsBoxSeam className="mr-2" />
                                <span>Product</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* {!currentUser?.isSeller && (
                    <Link
                      className={`mx-[15px] xl-b:mx-[15px] text-[15px]  text-[#222] font-medium transition-all duration-500 ease-linear cursor-pointer outline-none`}
                      to="/become-seller"
                    >
                      <span className="hidden xl-b:inline-block">Become a Seller</span>{" "}
                      Seller
                    </Link>
                  )} */}
                  {/* {!currentUser && (
                    <Link
                      className={`mx-[10px] xl-b:mx-[10px] text-[15px]  text-[#222] font-medium transition-all duration-500 ease-linear cursor-pointer outline-none `}
                      to="/login"
                    >
                      Sign in
                    </Link>
                  )} */}
                  {/* Notification */}
                  {currentUser && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === "notifications"
                              ? null
                              : "notifications"
                          )
                        }
                        className="relative mx-[10px] xl:mx-[18px] text-[#6B7177] hover:text-[#1DBF73] font-semibold leading-[16px] text-[14px] md-b:text-[16px] py-[12px] dropdown"
                      >
                        <RiNotification3Line className="text-xl" />
                        {notifications.length > 0 && (
                          <span className="absolute top-0 right-0 w-[20px] h-[20px] bg-[#EB5A46] text-white rounded-full text-center text-[12px] leading-[20px]">
                            {notifications.length}
                          </span>
                        )}
                      </button>
                      {openDropdown === "notifications" && (
                        <div className="absolute right-0 mt-1 w-[300px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-base font-medium text-[#333] dropdown">
                          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                              Notifications
                            </h3>
                            <button
                              onClick={() => setNotifications([])}
                              className="text-sm text-[#1DBF73] hover:text-[#159e63] focus:outline-none"
                            >
                              Clear All
                            </button>
                          </div>
                          <ul>
                            {notifications.map((notification) => (
                              <li
                                key={notification.id}
                                className="px-4 py-2 border-b border-gray-200 flex items-start"
                              >
                                <span className="mr-2 text-3xl  transform translate-y-4">
                                  {notification.icon}
                                </span>
                                <div>
                                  <p className="font-semibold">
                                    {notification.message}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {notification.details}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {notification.time} ago
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {/* {!currentUser && (
                    <Link
                      className="ud-btn btn-thm btn-white relative add-joining text-[15px] h-[40px] py-[13px] px-[25px] xxs-b:py-[5px] xxs-b:px-[30px] font-medium transition-all duration-500 ease-linear cursor-pointer outline-none bg-[#161816] border-2 border-[#5BBB7B] text-white hover:!text-white hover:border-[#1F4B3F] "
                      to="/signup"
                    >
                      Join
                    </Link>
                  )} */}
                  {/* user img */}
                  {currentUser && (
                    <div
                      className="user flex items-center gap-2 cursor-pointer relative mr-10 hover:bg-[#F9F9F9] rounded-full p-2 border-[1px] border-[#E9E9E9]"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={
                          currentUser.img || "https://via.placeholder.com/150"
                        }
                        alt=""
                      />
                      <div className="flex items-center justify-between">
                        {currentUser?.displayName || currentUser?.fname}
                        <IoIosArrowDown
                          className={`${
                            open ? "rotate-180 " : ""
                          } ml-2 transition-all duration-300 ease-linear`}
                        />
                      </div>
                      {/* Dropdown user start from here */}
                      {open && (
                        <div className="options absolute top-[50px] right-0 bg-white rounded-lg border border-gray-300 flex flex-col w-[250px] font-light z-50 shadow-md">
                          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                            <div className="relative rounded-full w-1/3">
                              <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={
                                  currentUser.img ||
                                  "https://via.placeholder.com/150"
                                }
                                alt=""
                              />
                              <span
                                className={`absolute top-[0px] left-[1px] w-[11px] h-[11px] rounded-full border-[2.5px] !border-white ${
                                  currentUser.isOnline
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                            </div>
                            <div className="flex flex-col overflow-hidden">
                              <p className="font-medium text-gray-800 truncate text-lg ">
                                {currentUser?.displayName || currentUser?.fname}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {currentUser?.email}
                              </p>
                            </div>
                          </div>
                          <div className="py-2">
                            {currentUser?.isSeller && (
                              <>
                                <Link
                                  className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium"
                                  to="/editmyprofile"
                                >
                                  <BiUser className="mr-4 text-xl" />
                                  <span>Profile</span>
                                </Link>
                                <Link
                                  className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium "
                                  to="/manageservices"
                                >
                                  <IoBriefcaseOutline className="mr-4 text-lg" />
                                  <span>Manage Services</span>
                                </Link>
                                {/* <Link
                                  className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium"
                                  to="/createservice"
                                >
                                  <IoAddCircleOutline className="mr-4 text-lg" />
                                  <span>Create new Service</span>
                                </Link> */}
                              </>
                            )}

                            {!currentUser?.isSeller && (
                              <>
                                <Link
                                  className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium "
                                  to="/manageprojects"
                                >
                                  <IoBriefcaseOutline className="mr-4 text-lg" />
                                  <span>Manage Projects</span>
                                </Link>
                              </>
                            )}
                            {/* <Link
                              className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium"
                              to="/orders"
                            >
                              <IoBagCheckOutline className="mr-4 text-lg" />
                              <span>Orders</span>
                            </Link> */}
                            {/* <Link
                              className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium"
                              to="/messages"
                            >
                              <IoChatbubbleOutline className="mr-4 text-lg" />
                              <span>Messages</span>
                            </Link> */}
                            <Link
                              className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium"
                              to="/settings"
                            >
                              <IoSettingsOutline className="mr-4 text-lg" />
                              <span>Settings</span>
                            </Link>
                            <Link
                              className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium border-t border-gray-200"
                              to="/support"
                            >
                              <HiOutlineSupport className="mr-4 text-xl" />
                              <span>Support</span>
                            </Link>
                            <button
                              className="link px-4 py-3 hover:bg-gray-100 flex items-center text-black text-base font-medium w-full text-left"
                              onClick={handleLogout}
                            >
                              <IoLogOutOutline className="mr-4 text-lg" />
                              <span>Log out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* <MobileNavigation /> */}
    </>
  );
}

export default NavbarF;
