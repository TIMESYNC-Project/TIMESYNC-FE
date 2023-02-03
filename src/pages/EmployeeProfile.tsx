import React from "react";

import user from "assets/user.svg";
import Button from "components/Button";
import Layout from "components/Layout";

const EmployeeProfile = () => {
  return (
    <Layout>
      <section className="flex flex-col items-center m-12 border-2 border-sky p-10 rounded-3xl">
        <p className="w-full font-extrabold text-4xl border-b-2 border-sky mb-14 pb-3">
          Employee's Profile
        </p>
        <div className="flex w-full">
          <div className="w-2/6 flex flex-col items-center gap-4">
            <img
              className="w-60 border-2 border-sky rounded-xl "
              src={user}
              alt="photo"
            />
            <form>
              <label htmlFor="my-modal-1">
                <p className="w-48 btn tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black">
                  Update Photo
                </p>
              </label>
              <input type="checkbox" id="my-modal-1" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
                  <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                    Update Photo
                  </p>
                  <div className="flex justify-center gap-5">
                    <div className="flex flex-col gap-5">
                      <p className="py-3">Select Photo:</p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <input
                        type="file"
                        className="file-input file-input-bordered w-full border-2 border-sky max-w-xs"
                      />
                    </div>
                  </div>
                  <div className="modal-action">
                    <button
                      type="submit"
                      className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                    >
                      Update
                    </button>
                    <label
                      htmlFor="my-modal-1"
                      className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <form>
              <label htmlFor="my-modal-2">
                <p className="w-48 btn tracking-wider bg-[#3282B8] text-white hover:border-white font-medium rounded-2xl capitalize border-4 border-white shadow-md shadow-black">
                  Update Password
                </p>
              </label>
              <input type="checkbox" id="my-modal-2" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
                  <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                    Update Password
                  </p>
                  <div className="flex justify-center items-center gap-5">
                    <div className="flex flex-col gap-5">
                      <p className="py-3">New Password:</p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <input
                        type="password"
                        className="input input-bordered input-md w-full max-w-xs border-2 border-sky"
                      />
                    </div>
                  </div>
                  <div className="modal-action">
                    <button
                      type="submit"
                      className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                    >
                      Update
                    </button>
                    <label
                      htmlFor="my-modal-2"
                      className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="w-4/6 flex flex-col">
            <p>00001</p>
            <p className="font-bold text-3xl">Aryo Yudhanto</p>
            <p className="text-lg">IT Support</p>
            <p className="underline font-semibold text-2xl pt-2 pb-8">
              Timesync Company
            </p>
            <table className="table-auto text-xl font-bold flex flex-col gap-4">
              <tr className="flex">
                <td className="w-2/5">Gender</td>
                <td className="w-full">Male</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Birthdate</td>
                <td className="w-full">Feb 26, 2002</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Phone</td>
                <td className="w-full">081299998888</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Email</td>
                <td className="w-full">aryoyudhanto@gmail.com</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Address</td>
                <td className="w-full">
                  Jl. Jalandikuburan No.13, Kec. Mangga Dua, Kel.Cimanggis,
                  Duren Sawit, Jakarta Timur
                </td>
              </tr>
            </table>
            <p className="text-xl font-bold pt-8">
              Annual Leaves Available : 14 Days
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmployeeProfile;
