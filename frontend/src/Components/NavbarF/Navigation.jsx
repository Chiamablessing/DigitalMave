import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const clientNavigation = [
  // client-specific navigation items
  {
    id: 1,
    name: "Client Dashboard",
    children: [
      { id: 1, name: "Overview", path: "/client/overview" },
      { id: 2, name: "My Projects", path: "/client/projects" },
      { id: 3, name: "Messages", path: "/client/messages" },
    ],
  },
  // other client-specific sections
];

const freelancerNavigation = [
  {
    id: 1,
    name: "Find Work",
    children: [
      { id: 1, name: "Find Work", path: "/homefreelancer" },
      { id: 2, name: "Saved Projects", path: "/savedprojects" },
      { id: 3, name: "Proposals", path: "/" },
      { id: 4, name: "Profile", path: "/editmyprofile" },
      { id: 5, name: "My Status", path: "/" },
      { id: 6, name: "My Projects Dashboard", path: "/manageservices" },
    ],
  },
  {
    id: 2,
    name: "My Jobs",
    children: [
      { id: 1, name: "My Jobs", path: "/" },
      { id: 2, name: "All Contracts", path: "/" },
      { id: 3, name: "Work Diary", path: "/" },
    ],
  },
  {
    id: 3,
    name: "Reports",
    children: [
      { id: 1, name: "Overview", path: "/overview" },
      { id: 2, name: "My Reports", path: "/proposal" },
      { id: 3, name: "Billings & Earnings", path: "/saved" },
      { id: 4, name: "Connects History", path: "/message" },
      { id: 5, name: "Transiction History", path: "/reviews" },
      { id: 6, name: "Certificate of Earnings", path: "/invoice" },
    ],
  },
  {
    id: 4,
    name: "Messages",
    path: "/messages",
  },
];

const Navigation = (props) => {
  const navigation =
    props.role === "client" ? clientNavigation : freelancerNavigation;

  return (
    <>
      <ul className="ace-responsive-menu ui-navigation max-[768px]:float-left w-full list-none m-0 p-0 bg-transparent md-b:w-auto">
        {navigation.map((item, i) => (
          <li
            key={i}
            className={`visible_list menu-active border-0 inline-block m-0 p-0 text-left list-none max-[768px]:border-b max-[768px]:border-[#242424]  max-[768px]:float-none ${
              item.id === 1 ? "home-menu-parent" : ""
            }`}
          >
            {item.children ? (
              <a className="cursor-pointer border-0 m-0 !py-[18px] relative capitalize text-[#222] font-medium rounded-[60px] text-center 2xl-b: max-[1199px]:px-[8px] max-[1399px]:px-[11px] before:content-none before:h-[2px] before:absolute before:-top-[7px] before:w-0 before:transition-all before:duration-500 before:ease-linear !flex justify-center items-center hover:text-[#5BBB7B]">
                <span className="title">{item.name}</span>{" "}
                {item.children && <IoIosArrowDown />}
              </a>
            ) : (
              <Link
                to={item.path}
                className="list-item cursor-pointer border-0 m-0 !py-[18px] relative capitalize text-[#222] font-medium rounded-[60px] text-center 2xl-b: max-[1199px]:px-[8px] max-[1399px]:px-[11px] before:content-none before:h-[2px] before:absolute before:-top-[7px] before:w-0 before:transition-all before:duration-500 before:ease-linear"
              >
                <span className="title">{item.name}</span>
              </Link>
            )}

            {item.children && (
              <ul
                className={`sub-menu bg-white rounded-[12px] !shadow-na py-[15px] px-0 z-[9999] w-[260px] hidden list-none clear-both m-0 max-[768px]:static absolute ${
                  item.id === 1 ? "home-menu" : ""
                }`}
              >
                {item.children?.map((item2, i2) => (
                  <li
                    key={i2}
                    className="menu-active border-l-2 border-l-transparent py-1 px-[30px] transition-all duration-500 ease-linear relative list-none hover:bg-[#F0EFEC] hover:border-l-[#5BBB7B] cursor-pointer"
                  >
                    <Link to={item2.path}>
                      <span className="title">{item2.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

Navigation.propTypes = {
  role: PropTypes.string,
};

export default Navigation;
