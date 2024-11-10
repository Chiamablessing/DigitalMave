import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import {
  IoBriefcaseOutline,
  IoAddCircleOutline,
  IoChatbubbleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
  IoRefreshCircleOutline,
  IoBriefcaseOutline as IoBriefcase,
} from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import newRequest from "../../utils/newRequest";

function MobileNavigation() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage which dropdown is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("currentUserUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("currentUserUpdated", handleStorageChange);
    };
  }, []);

  const [selectedFilter, setSelectedFilter] = useState("Talent");

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      setCurrentUser(null); // Update state to reflect logout
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null); // Close all dropdowns when menu is toggled
  };

  return (
    <header className="bg-white border-b border-gray-300 py-4 px-4 lg:hidden">
      <div className="flex items-center justify-between">
        <Link
          className="text-2xl font-semibold text-[#222]"
          to={!currentUser.isSeller ? "/homeclient" : "/homefreelancer"}
        >
          DigitalMave
        </Link>
        <button onClick={handleMenuToggle} className="text-2xl">
          <IoIosMenu />
        </button>
      </div>
      {isMenuOpen && (
        <nav className="mt-4">
          <ul className="space-y-4">
            <li>
              <Link
                className="flex items-center text-[#6B7177] hover:text-[#434d48]"
                to="/freelancers"
              >
                <IoBriefcaseOutline className="text-xl mr-2" />
                My projects
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center text-[#6B7177] hover:text-[#1DBF73]"
                to="/inbox"
              >
                <IoChatbubbleOutline className="text-xl mr-2" />
                Inbox
              </Link>
            </li>
            {!currentUser?.isSeller && (
              <li>
                <Link
                  className="flex items-center bg-[#1DBF73] text-white px-4 py-2 rounded-md"
                  to="/addproject"
                >
                  <IoAddCircleOutline className="text-xl mr-2" />
                  Post a project
                </Link>
              </li>
            )}
            <li className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "searchFilter" ? null : "searchFilter"
                  )
                }
                className="w-full text-left flex items-center text-[#6B7177] hover:text-[#242826]"
              >
                {selectedFilter} <IoIosArrowDown className="ml-2" />
              </button>
              {openDropdown === "searchFilter" && (
                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setSelectedFilter("Talent");
                      setOpenDropdown(null);
                    }}
                  >
                    <GoPeople className="mr-2 text-xl" />
                    Talent
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setSelectedFilter("Projects");
                      setOpenDropdown(null);
                    }}
                  >
                    <IoBriefcase className="mr-2" />
                    Projects
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setSelectedFilter("Product");
                      setOpenDropdown(null);
                    }}
                  >
                    <BsBoxSeam className="mr-2" />
                    Product
                  </li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "notifications" ? null : "notifications"
                  )
                }
                className="w-full text-left flex items-center text-[#6B7177] hover:text-[#1DBF73] relative"
              >
                <RiNotification3Line className="text-xl mr-2" />
                Notifications
                {notifications.length > 0 && (
                  <span className="ml-2 bg-[#EB5A46] text-white rounded-full text-center text-sm w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
                <IoIosArrowDown className="ml-2" />
              </button>
              {openDropdown === "notifications" && (
                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-sm text-[#0f100f] hover:text-[#484a49] focus:outline-none"
                    >
                      Clear All
                    </button>
                  </div>
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="px-4 py-2 border-b border-gray-200 flex items-start"
                    >
                      <span className="mr-2">{notification.icon}</span>
                      <div>
                        <p className="font-semibold">{notification.message}</p>
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
              )}
            </li>
            <li className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "account" ? null : "account")
                }
                className="w-full text-left flex items-center text-[#6B7177] hover:text-[#353837]"
              >
                <img
                  src={currentUser.img || "/images/default-avatar.jpg"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                {currentUser?.username}
                <IoIosArrowDown className="ml-2" />
              </button>
              {openDropdown === "account" && (
                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      navigate("/settings");
                      setOpenDropdown(null);
                    }}
                  >
                    <IoSettingsOutline className="mr-2 text-xl" />
                    <span>Settings</span>
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline className="mr-2 text-xl" />
                    <span>Logout</span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default MobileNavigation;
