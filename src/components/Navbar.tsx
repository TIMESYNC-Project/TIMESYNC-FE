import React, { FC, LabelHTMLAttributes } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import {
  TbLogout,
  TbHome,
  TbUser,
  TbUsers,
  TbAddressBook,
  TbNotebook,
  TbMail,
  TbSettings,
} from "react-icons/tb";

import Logo from "assets/logo-yellow.png";
import Sidebar from "components/Sidebar";

interface NavbarProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  homeSet?: string;
  profileSet?: string;
  employeesSet?: string;
  recordsSet?: string;
  approvalSet?: string;
  inboxSet?: string;
  settingsSet?: string;
}

const Navbar: FC<NavbarProps> = ({
  children,
  homeSet,
  profileSet,
  employeesSet,
  recordsSet,
  approvalSet,
  inboxSet,
  settingsSet,
}) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const checkRole = cookie.role;
  const admin = checkRole == "admin";

  function onLogout() {
    Swal.fire({
      title: "Are you sure want to logout?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        removeCookie("token");
        removeCookie("email");
        removeCookie("id");
        removeCookie("name");
        removeCookie("nip");
        removeCookie("position");
        removeCookie("role");
        navigate("/");
      }
    });
  }

  return (
    <div className="flex flex-col">
      <section className="navbar h-10 bg-[#0F4C75] shadow-md shadow-gray-900 sticky top-0 mb-[-4rem] z-50">
        <div className="navbar-start">
          <Link
            id="btn-navbar-logo"
            to="/home"
            className="btn btn-ghost normal-case text-md md:ml-11"
          >
            <img src={Logo} alt="logo-app" className="w-[42px]" />
          </Link>
        </div>
        <div className="navbar-center ml-60 hidden md:flex">
          <p className="uppercase text-xl font-bold text-[#FFC909]">timesync</p>
        </div>
        <div className="navbar-end md:mr-14">
          <p className="capitalize text-md font-normal text-[#FFC909] hidden md:flex">
            Hi, {cookie.name ? cookie.name : "Stranger"}
          </p>
          <div className="dropdown dropdown-end md:hidden">
            <label id="btn-navbar-menu" tabIndex={0} className="btn btn-ghost">
              <p className="capitalize text-md font-normal text-[#FFC909]">
                Hi, {cookie.name ? cookie.name : "Stranger"}
              </p>
            </label>
            <ul
              tabIndex={0}
              className="z-40 mt-3 py-2 px-4 shadow menu-compact dropdown-content border-2 border-sky bg-white rounded-2xl w-fit"
            >
              <li>
                <Link
                  id="btn-navbar-home-mobile"
                  to="/home"
                  className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                >
                  <TbHome size={25} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  id="btn-navbar-profile-mobile"
                  to={admin ? "/profile/company" : "/profile"}
                  className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                >
                  <TbUser size={25} />
                  Profile
                </Link>
              </li>
              <li>
                {admin && (
                  <Link
                    id="btn-navbar-employees-mobile"
                    to="/employees"
                    className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                  >
                    <TbUsers size={25} />
                    Employees
                  </Link>
                )}
              </li>
              <li>
                <Link
                  id="btn-navbar-records-mobile"
                  to="/records"
                  className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                >
                  <TbAddressBook size={25} />
                  Records
                </Link>
              </li>
              <li>
                <Link
                  id="btn-navbar-approval-mobile"
                  to="/approval"
                  className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                >
                  <TbNotebook size={25} />
                  Approval
                </Link>
              </li>
              <li>
                <Link
                  id="btn-navbar-inbox-mobile"
                  to="/inbox"
                  className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                >
                  <TbMail size={25} />
                  Inbox
                </Link>
              </li>
              <li>
                {admin && (
                  <Link
                    id="btn-navbar-settings-mobile"
                    to="/settings"
                    className="flex gap-2 items-center duration-300 hover:cursor-pointer active:scale-90"
                  >
                    <TbSettings size={25} />
                    Settings
                  </Link>
                )}
              </li>
              <li>
                <div
                  id="btn-navbar-logout-mobile"
                  onClick={() => onLogout()}
                  className="flex items-center mx- mt-2 py-1 gap-2 font-bold duration-300 hover:cursor-pointer active:scale-90"
                >
                  <p>
                    <TbLogout size={25} />
                  </p>
                  <p>Logout</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="flex">
        <Sidebar
          homeSet={homeSet}
          profileSet={profileSet}
          employeesSet={employeesSet}
          recordsSet={recordsSet}
          approvalSet={approvalSet}
          inboxSet={inboxSet}
          settingsSet={settingsSet}
        />
        <div className="h-full w-full overflow-auto mt-20">{children}</div>
      </section>
    </div>
  );
};

export default Navbar;
