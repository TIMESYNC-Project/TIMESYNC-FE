import { Link, useNavigate, useParams } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { WrappingCard } from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";

import { ProfileType, CompanyData } from "utils/Type";
import Loader from "components/Loader";

const EmployeeProfile = () => {
  const [company, setCompany] = useState<CompanyData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<ProfileType>({});
  const [image, setImage] = useState<any>();
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    companyData();
    profileData();
  }, []);

  function profileData() {
    if (cookie.role === "admin") {
      setLoading(true);
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
        .catch((err) => {})
        .finally(() => setLoading(false));
    } else if (cookie.role === "employee") {
      setLoading(true);
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
        .catch((err) => {})
        .finally(() => setLoading(false));
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
      {loading ? (
        <Loader />
      ) : (
        <WrappingCard
          judul="Employee's Profile"
          rightSide={
            cookie.role === "admin" ? (
              <Button
                id="btn-back"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium px-3 py-1 md:py-2 text-xs hover:bg-navy gap-2 w-full"
                icon={<IoReturnUpBack size={20} />}
                label="Back"
                onClick={() => navigate(-1)}
              />
            ) : null
          }
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 w-full">
            <div className="lg:w-2/6 flex flex-col items-center gap-2 lg:gap-4">
              <img
                className="w-40 h-40 md:w-52 md:h-52 xl:w-60 xl:h-60 border-2 border-sky rounded-xl "
                src={data.profile_picture}
                alt="photo"
              />
              {cookie.role === "admin" ? null : (
                <>
                  <label id="btn-update-photo" htmlFor="my-modal-1">
                    <p className="w-36 lg:w-48 text-xs lg:text-base text-center py-2 tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black duration-300 active:scale-90 hover:cursor-pointer">
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
                        <p className="mb-5 pb-2 lg:text-xl border-b-2 font-bold text-black">
                          Update Photo
                        </p>
                        <div className="flex justify-center gap-5">
                          <div className="flex flex-col gap-5">
                            <p className="py-3 w-24 text-sm lg:text-base lg:w-28 text-black">
                            Select Photo:
                          </p>
                          </div>
                          <div className="flex flex-col gap-5">
                            <input
                              id="input-photo"
                              type="file"
                              accept="image/png, image/jpeg"
                              className="file-input file-input-bordered w-full border-2 file:bg-sky file:border-0 border-sky max-w-xs file:w-24 file:text-xs text-xs lg:file:w-fit lg:file:text-sm lg:text-base"
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
                    <p className="w-36 lg:w-48 text-xs lg:text-base text-center py-2 tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black duration-300 active:scale-90 hover:cursor-pointer">
                    Edit Password
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
                        <p className="mb-5 pb-2 lg:text-xl border-b-2 font-bold text-black">
                          Edit Password
                        </p>
                        <div className="flex justify-center items-center gap-5">
                          <div className="flex flex-col gap-5">
                            <p className="py-3 w-28 text-sm lg:text-base lg:w-32 text-black">
                            New Password:
                          </p>
                          </div>
                          <div className="flex flex-col gap-5">
                            <input
                              id="input-new-password"
                              type="text"
                              className="input input-bordered input-md w-full max-w-xs border-2 border-sky text-sm lg:text-base"
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
            <div className="lg:w-4/6 flex flex-col">
              <p>{data.nip}</p>
              <p className="font-bold text-2xl lg:text-3xl">{data.name}</p>
              <p className=" text-lg lg:text-lg">{data.position}</p>

              <span className="underline font-semibold text-xl lg:text-2xl pt-2 pb-8">
                {cookie.role === "admin" ? (
                  <p>{company.company_name}</p>
                ) : (
                  <Link id="btn-company-profile" to="/profile/company">
                    {company.company_name}
                  </Link>
                )}
              </span>
              <table className="table-auto lg:text-xl font-bold flex flex-col gap-4">
                <tbody className="flex flex-col gap-2">
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
              <p className="lg:text-xl font-bold pt-4 lg:pt-6">
                Annual Leaves Available : {data.annual_leave}
              </p>
            </div>
          </div>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default EmployeeProfile;
