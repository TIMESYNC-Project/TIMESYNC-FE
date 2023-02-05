import { Link, useNavigate } from "react-router-dom";
import { FC, LabelHTMLAttributes } from "react";
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
          onClick={() => onLogout()}
          className="flex justify-center items-center mx-7 px-5 py-3 border-2 border-white rounded-xl shadow-md shadow-black gap-1 font-bold text-yellow-400 duration-300 hover:cursor-pointer active:scale-90"
        >
          <p>
            <TbLogout size={25}  />
          </p>
          <p>Logout</p>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
