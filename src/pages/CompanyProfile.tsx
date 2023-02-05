import { IoReturnUpBack } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import building from "assets/building.svg";
import { CustomInput, TextArea } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";

const CompanyProfile = () => {
  const [cookie, setCookie] = useCookies();
  const admin = cookie.role === "admin";

  return (
    <Layout profileSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Company Profile"
        rightSide={
          admin ? null : (
            <>
              <Link id="btn-back" to="/profile">
                <Button
                  buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs hover:bg-navy"
                  icon={<IoReturnUpBack size={20} />}
                  label="Back to Employee's Profile"
                />
              </Link>
            </>
          )
        }
      >
        <div className="flex w-full">
          <div className="w-2/6 flex flex-col items-center gap-4">
            <img
              className="w-60 border-2 border-sky rounded-xl "
              src={building}
              alt="photo"
            />
            {admin && (
              <form>
                <label id="btn-update-profile" htmlFor="my-modal-1">
                  <p className="w-48 btn tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black">
                    Update Profile
                  </p>
                </label>
                <input
                  type="checkbox"
                  id="my-modal-1"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box pt-80 border-2 border-sky flex flex-col justify-center text-sky">
                    <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                      Edit Company's Profile
                    </p>
                    <div className="flex justify-center gap-5">
                      <div className="flex flex-col gap-10 pt-5">
                        <p>Name:</p>
                        <p>Tagline:</p>
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
                          className="input input-bordered input-md w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <CustomInput
                          id="input-tagline"
                          type="text"
                          placeholder="Type tagline"
                          className="input input-bordered input-md w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <CustomInput
                          id="input-phone"
                          type="text"
                          placeholder="Type phone here"
                          className="input input-bordered input-md w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <CustomInput
                          id="input-email"
                          type="email"
                          placeholder="Type email here"
                          className="input input-bordered input-md w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <CustomInput
                          id="input-social-media"
                          type="text"
                          placeholder="Type social media here"
                          className="input input-bordered input-md w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <TextArea
                          id="input-address"
                          placeholder="Type address here"
                          className="input input-bordered input-sm h-28 w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <TextArea
                          id="input-description"
                          placeholder="Type description here"
                          className="input input-bordered input-sm h-40 w-80 max-w-xs border-2 border-sky focus:border-lightYellow"
                        />
                        <CustomInput
                          id="input-picture"
                          type="file"
                          className="file-input file-input-bordered w-full border-2 border-sky max-w-xs focus:border-lightYellow"
                        />
                      </div>
                    </div>
                    <div className="modal-action">
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
          <div className="w-4/6 flex flex-col">
            <p className="font-bold text-3xl">Timesync Company</p>
            <p className="text-lg pb-8">Technology and Software Consultant</p>
            <table className="table-auto text-xl font-bold flex flex-col gap-4">
              <tr className="flex">
                <td className="w-2/5">Phone</td>
                <td className="w-full">081299998888</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Email</td>
                <td className="w-full">aryoyudhanto@gmail.com</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Social Media</td>
                <td className="w-full">@timesync</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Address</td>
                <td className="w-full">
                  Jl. Jalandikuburan No.13, Kec. Mangga Dua, Kel.Cimanggis,
                  Duren Sawit, Jakarta Timur
                </td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Desc</td>
                <td className="w-full">
                  We are a company that moves in technology and software
                  industry.
                </td>
              </tr>
            </table>
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default CompanyProfile;
