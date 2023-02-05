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
import { FC, LabelHTMLAttributes } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

interface SidebarProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  homeSet?: string;
  profileSet?: string;
  employeesSet?: string;
  recordsSet?: string;
  approvalSet?: string;
  inboxSet?: string;
  settingsSet?: string;
}

const Sidebar: FC<SidebarProps> = ({
  homeSet,
  profileSet,
  employeesSet,
  recordsSet,
  approvalSet,
  inboxSet,
  settingsSet,
}) => {
  const [cookie] = useCookies(["role"]);
  const checkRole = cookie.role;
  const admin = checkRole == "admin";

  return (
    <div className="bg-navy h-screen w-52 shadow-lg sticky top-0 z-40 flex pt-28 pb-16 flex-col justify-between items-center">
      <section className="w-full flex flex-col font-semibold text-white gap-2">
        <p className={`px-7 py-2 ${homeSet}`}>
          <Link
            id="btn-sidebar-home"
            to="/home"
            className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
          >
            <TbHome size={25} />
            Home
          </Link>
        </p>
        <p className={`px-7 py-2 ${profileSet}`}>
          <Link
            id="btn-sidebar-profile"
            to={admin ? "/profile/company" : "/profile"}
            className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
          >
            <TbUser size={25} />
            Profile
          </Link>
        </p>
        {admin && (
          <p className={`px-7 py-2 ${employeesSet}`}>
            <Link
              id="btn-sidebar-employees"
              to="/employees"
              className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
            >
              <TbUsers size={25} />
              Employees
            </Link>
          </p>
        )}
        <p className={`px-7 py-2 ${recordsSet}`}>
          <Link
            id="btn-sidebar-records"
            to="/records"
            className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
          >
            <TbAddressBook size={25} />
            Records
          </Link>
        </p>
        <p className={`px-7 py-2 ${approvalSet}`}>
          <Link
            id="btn-sidebar-approval"
            to="/approval"
            className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
          >
            <TbNotebook size={25} />
            Approval
          </Link>
        </p>
        <p className={`px-7 py-2 ${inboxSet}`}>
          <Link
            id="btn-sidebar-inbox"
            to="/inbox"
            className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
          >
            <TbMail size={25} />
            Inbox
          </Link>
        </p>
        {admin && (
          <p className={`px-7 py-2 ${settingsSet}`}>
            <Link
              id="btn-sidebar-settings"
              to="/settings"
              className="flex gap-2 items-center duration-300 hover:text-black/50 hover:cursor-pointer active:scale-90"
            >
              <TbSettings size={25} />
              Settings
            </Link>
          </p>
        )}
      </section>
      <section>
        <div
          id="btn-sidebar-logout"
          className="flex justify-center items-center mx-7 px-5 py-3 border-2 border-white rounded-xl shadow-md shadow-black gap-1 font-bold text-yellow-400 duration-300 hover:cursor-pointer active:scale-90"
        >
          <p>
            <TbLogout size={25} />
          </p>
          <p>Logout</p>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
