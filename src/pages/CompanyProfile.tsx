import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { CustomInput, TextArea } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";

import { CompanyData } from "utils/Type";

const CompanyProfile = () => {
  const [editAddress, setEditAddress] = useState<string>("");
  const [editSosmed, setEditSosmed] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPhone, setEditphone] = useState<string>("");
  const [editPicture, setEditPicture] = useState<any>();
  const [editDesc, setEditDesc] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [data, setData] = useState<CompanyData>({});
  const [cookie, setCookie] = useCookies();
  const admin = cookie.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    companyData();
  }, []);

  function companyData() {
    axios
      .get(`https://shirayuki.site/companies`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        console.log;
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {});
  }
  function editCompany(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("company_address", editAddress);
    formData.append("company_phone", editPhone);
    formData.append("company_email", editEmail);
    formData.append("company_name", editName);
    formData.append("company_picture", editPicture);
    formData.append("sosmed", editSosmed);
    formData.append("description", editDesc);
    axios
      .put(`https://shirayuki.site/companies`, formData, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Berhasil mengupdate product",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            companyData();
          }
        });
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
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
    <Layout profileSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Company Profile"
        titleSet="w-full"
        rightSide={
          admin ? null : (
            <>
              <Link id="btn-back" to="/profile">
                <Button
                  buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize md:font-medium gap-2 px-3 text-xs hover:bg-navy py-1 md:py-2 rounded-full"
                  icon={<IoReturnUpBack size={20} />}
                  label="Back"
                />
              </Link>
            </>
          )
        }
      >
        <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-5 xl:gap-0">
          <div className="lg:w-2/6 flex flex-col items-center gap-4">
            <img
              className="xl:w-60 xl:h-60 border-2 border-sky rounded-xl"
              src={data.company_picture}
              alt="photo"
            />
            {admin && (
              <form onSubmit={editCompany}>
                <label id="btn-update-profile" htmlFor="my-modal-1">
                  <p className="xl:w-48 btn tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black">
                    Update Profile
                  </p>
                </label>
                <input
                  type="checkbox"
                  id="my-modal-1"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom md:modal-middle">
                  <div className="modal-box pt-40 md:pt-72 xl:pt-64 border-2 border-sky flex flex-col justify-center text-sky">
                    <p className="mb-5 pb-2 text-lg md:text-xl border-b-2 font-bold text-black">
                      Edit Company's Profile
                    </p>
                    <div className="flex justify-center px-20 md:px-0 md:gap-5">
                      <div className="flex flex-col gap-11 pt-5 text-sm md:text-md font-medium text-black">
                        <p>Name:</p>
                        <p>Phone:</p>
                        <p>Email:</p>
                        <p className="w-28">Social Media:</p>
                        <p className="pb-16">Address:</p>
                        <p className="pb-28">Description:</p>
                        <p>Select Picture:</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <CustomInput
                          id="input-name"
                          type="text"
                          placeholder="Type name"
                          className="input input-bordered input-md w-56 md:w-80 max-w-xs border-2 border-sky text-black"
                          defaultValue={data.company_name}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                        <CustomInput
                          id="input-phone"
                          type="text"
                          placeholder="Type phone here"
                          className="input input-bordered input-md w-56 md:w-80 max-w-xs border-2 border-sky text-black"
                          defaultValue={data.company_phone}
                          onChange={(e) => setEditphone(e.target.value)}
                        />
                        <CustomInput
                          id="input-email"
                          type="email"
                          placeholder="Type email here"
                          className="input input-bordered input-md w-56 md:w-80 max-w-xs border-2 border-sky text-black"
                          defaultValue={data.company_email}
                          onChange={(e) => setEditEmail(e.target.value)}
                        />
                        <CustomInput
                          id="input-social-media"
                          type="text"
                          placeholder="Type social media here"
                          className="input input-bordered input-md w-56 md:w-80 max-w-xs border-2 border-sky text-black"
                          defaultValue={data.sosmed}
                          onChange={(e) => setEditSosmed(e.target.value)}
                        />
                        <TextArea
                          id="input-address"
                          placeholder="Type address here"
                          className="input input-bordered input-sm h-28 w-56 md:w-80 max-w-xs border-2 border-sky text-black"
                          defaultValue={data.company_address}
                          onChange={(e) => setEditAddress(e.target.value)}
                        />
                        <TextArea
                          id="input-description"
                          placeholder="Type description here"
                          className="input input-bordered input-sm h-40 w-56 md:w-80 max-w-xs border-2 border-sky text-black"
                          defaultValue={data.description}
                          onChange={(e) => setEditDesc(e.target.value)}
                        />
                        <CustomInput
                          id="input-picture"
                          type="file"
                          className="file-input file-input-bordered w-full border-2 border-sky max-w-xs text-black file:bg-sky file:text-xs md:file:text-sm file:border-0"
                          onChange={(e) => setEditPicture(e.target.files?.[0])}
                        />
                      </div>
                    </div>
                    <div className="modal-action pt-5">
                      <button
                        id="btn-company-submit"
                        type="submit"
                        className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                      >
                        Submit
                      </button>
                      <label
                        id="btn-company-cancel"
                        htmlFor="my-modal-1"
                        className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                      >
                        Cancel
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="lg:w-4/6 flex flex-col gap-3 md:gap-6">
            <p className="font-bold text-xl md:text-2xl lg:text-3xl mb-5">
              {data.company_name}
            </p>
            <table className="table-auto md:text-lg xl:text-xl font-bold flex flex-col">
              <tbody className="flex flex-col gap-2 md:gap-3 xl:gap-5">
                <tr className="flex">
                  <td className="w-2/5">Phone</td>
                  <td className="w-full">{data.company_phone}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Email</td>
                  <td className="w-full">{data.company_email}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Social Media</td>
                  <td className="w-full">{data.sosmed}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Address</td>
                  <td className="w-full">{data.company_address}</td>
                </tr>
                <tr className="flex">
                  <td className="w-2/5">Desc</td>
                  <td className="w-full">{data.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default CompanyProfile;
