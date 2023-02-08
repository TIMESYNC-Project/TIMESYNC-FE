import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { WrappingCard } from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";

interface ProfileType {
  id?: number;
  profile_picture?: string;
  name?: string;
  birth_of_date?: string;
  nip?: string;
  email?: string;
  gender?: string;
  position?: string;
  phone?: string;
  address?: string;
  annual_leave?: number;
}
interface CompanyData {
  company_name?: string;
}

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookie, setCookie] = useCookies();
  const [data, setData] = useState<ProfileType>({});
  const [company, setCompany] = useState<CompanyData>({});
  const [image, setImage] = useState<any>();
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    companyData();
    profileData();
  }, []);

  function profileData() {
    if (cookie.role === "admin") {
      axios
        .get(`employees/${id}`, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        })
        .then((res) => {
          const { data } = res.data;
          setData(data);
        })
        .catch((err) => {});
    } else if (cookie.role === "employee") {
      axios
        .get(`employees/profile`, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        })
        .then((res) => {
          const { data } = res.data;
          console.log(data);
          setData(data);
        })
        .catch((err) => {});
    }
  }

  function companyData() {
    axios
      .get(`companies`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setCompany(data);
      })
      .catch((err) => {});
  }

  function handleEditProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = new FormData();
    body.append("profile_picture", image);
    body.append("password", password);
    axios
      .put(`employees`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(0);
      })
      .catch((err) => {
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  }

  return (
    <Layout
      profileSet={`${
        cookie.role === "admin"
          ? null
          : "w-full bg-gradient-to-r from-white to-navy hover:text-white"
      }`}
      employeesSet={`${
        cookie.role === "admin"
          ? "w-full bg-gradient-to-r from-white to-navy hover:text-white"
          : null
      }`}
    >
      <WrappingCard
        judul="Employee's Profile"
        rightSide={
          cookie.role === "admin" ? (
            <Button
              id="btn-back"
              buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs hover:bg-navy w-1/4"
              label="Back"
              onClick={() => navigate(-1)}
            />
          ) : null
        }
      >
        <div className="flex w-full">
          <div className="w-2/6 flex flex-col items-center gap-4">
            <img
              className="w-60 h-60 border-2 border-sky rounded-xl "
              src={data.profile_picture}
              alt="photo"
            />
            {cookie.role === "admin" ? null : (
              <>
                <label id="btn-update-photo" htmlFor="my-modal-1">
                  <p className="w-48 btn tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black">
                    Update Photo
                  </p>
                </label>
                <input
                  type="checkbox"
                  id="my-modal-1"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
                    <form onSubmit={handleEditProfile}>
                      <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                        Update Photo
                      </p>
                      <div className="flex justify-center gap-5">
                        <div className="flex flex-col gap-5">
                          <p className="py-3">Select Photo:</p>
                        </div>
                        <div className="flex flex-col gap-5">
                          <input
                            id="input-photo"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="file-input file-input-bordered w-full border-2 file:bg-sky file:border-0 border-sky max-w-xs"
                            onChange={(e) => setImage(e.target.files?.[0])}
                          />
                        </div>
                      </div>
                      <div className="modal-action">
                        <button
                          id="btn-photo-submit"
                          type="submit"
                          className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                        >
                          Update
                        </button>
                        <label
                          id="btn-photo-cancel"
                          htmlFor="my-modal-1"
                          className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                        >
                          Cancel
                        </label>
                      </div>
                    </form>
                  </div>
                </div>

                <label id="btn-update-password" htmlFor="my-modal-2">
                  <p className="w-48 btn tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black">
                    Update Password
                  </p>
                </label>
                <input
                  type="checkbox"
                  id="my-modal-2"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
                    <form onSubmit={handleEditProfile}>
                      <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                        Update Password
                      </p>
                      <div className="flex justify-center items-center gap-5">
                        <div className="flex flex-col gap-5">
                          <p className="py-3">New Password:</p>
                        </div>
                        <div className="flex flex-col gap-5">
                          <input
                            id="input-new-password"
                            type="password"
                            className="input input-bordered input-md w-full max-w-xs border-2 border-sky"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="modal-action">
                        <button
                          id="btn-password-submit"
                          type="submit"
                          className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                        >
                          Update
                        </button>
                        <label
                          id="btn-password-cancel"
                          htmlFor="my-modal-2"
                          className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                        >
                          Cancel
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="w-4/6 flex flex-col">
            <p>{data.nip}</p>
            <p className="font-bold text-3xl">{data.name}</p>
            <p className="text-lg">{data.position}</p>

            <span className="underline font-semibold text-2xl pt-2 pb-8">
              {cookie.role === "admin" ? (
                <p>{company.company_name}</p>
              ) : (
                <Link id="btn-company-profile" to="/profile/company">
                  {company.company_name}
                </Link>
              )}
            </span>

            <table className="table-auto text-xl font-bold flex flex-col gap-4">
              <tbody>
                <tr className="flex">
                  <td className="w-2/5">Gender</td>
                  <td className="w-full">{data.gender}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Birthdate</td>
                  <td className="w-full">{data.birth_of_date}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Phone</td>
                  <td className="w-full">{data.phone}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Email</td>
                  <td className="w-full">{data.email}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Address</td>
                  <td className="w-full">{data.address}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xl font-bold pt-8">
              Annual Leaves Available : {data.annual_leave}
            </p>
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default EmployeeProfile;
