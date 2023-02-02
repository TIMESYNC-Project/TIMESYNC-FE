import React, { FC, LabelHTMLAttributes } from "react";

import Navbar from "./Navbar";

interface LayoutProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  homeSet?: string;
  profileSet?: string;
  employeesSet?: string;
  recordsSet?: string;
  approvalSet?: string;
  inboxSet?: string;
  settingsSet?: string;
}

const Layout: FC<LayoutProps> = ({
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
    <div className="z-0 w-full h-screen flex flex-col overflow-auto bg-white">
      <div className="h-screen overflow-auto">
        <Navbar
          homeSet={homeSet}
          profileSet={profileSet}
          employeesSet={employeesSet}
          recordsSet={recordsSet}
          approvalSet={approvalSet}
          inboxSet={inboxSet}
          settingsSet={settingsSet}
        >
          {children}
        </Navbar>
      </div>
    </div>
  );
};

export default Layout;
