import React, { FC, LabelHTMLAttributes } from "react";
import { Link } from "react-router-dom";

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
  return (
    <div className="flex flex-col">
      <section className="navbar h-10 bg-[#0F4C75] shadow-md shadow-gray-900 sticky top-0 mb-[-5rem] z-50">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-md ml-14">
            <img src={Logo} alt="logo-app" className="w-[42px]" />
          </Link>
        </div>
        <div className="navbar-center">
          <p className="uppercase text-xl font-bold text-[#FFC909]">timesync</p>
        </div>
        <div className="navbar-end mr-14">
          <p className="capitalize text-md font-normal text-[#FFC909]">
            aryo yudhanto
            {/* {
                cookie.name? cookie.name : null
              } */}
          </p>
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
