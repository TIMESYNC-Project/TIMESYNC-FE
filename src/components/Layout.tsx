import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="z-0 w-full h-screen flex flex-col overflow-auto bg-white">
      <div className="h-full overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
