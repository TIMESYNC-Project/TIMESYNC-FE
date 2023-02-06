import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import React from "react";
import {
  AiOutlineFileAdd,
  AiOutlineUserAdd,
  AiOutlineDelete,
} from "react-icons/ai";

import { CustomInput, TextArea } from "components/CustomInput";
import { FlexyCard, WrappingCard } from "components/Card";
import { Modals1 } from "components/Modals";
import Layout from "components/Layout";

const Employee = () => {
  const navigate = useNavigate();

  function onClickDetail(id: number) {
    navigate(`/employee/profile/${id}`);
  }
  return (
    <Layout employeesSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Employees"
        rightSide={
          <>
            <div className="flex justify-end">
              <form className="flex justify-end">
                <CustomInput
                  id="input-search"
                  inputSet="border-sky"
                  placeholder="Search"
                />
                <button
                  id="btn-search-submit"
                  className="mx-2 ml-4 text-sky"
                  type="submit"
                >
                  <BsSearch size={27} />
                </button>
              </form>
              <label
                id="btn-import-file"
                htmlFor={`my-modal-1`}
                className="flex justify-center items-center"
              >
                <div className="mx-2 text-sky hover:cursor-pointer">
                  <AiOutlineFileAdd size={27} />
                </div>
              </label>
              <label
                id="btn-add-employee"
                htmlFor={`my-modal-2`}
                className="flex justify-center items-center"
              >
                <div className="mx-2 text-sky hover:cursor-pointer">
                  <AiOutlineUserAdd size={27} />
                </div>
              </label>
            </div>
          </>
        }
      >
        {[...Array(3)].map((data, index) => (
          <FlexyCard parentSet="duration-300 hover:cursor-pointer active:scale-95">
            <div
              id={`btn-employee-${index}`}
              className="flex justify-center items-center"
            >
              <div className="flex w-1/2">
                <img
                  src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                  className="w-[50px] h-[50px]  rounded-full"
                  onClick={() => onClickDetail(2)}
                />
                <div className="mx-7">
                  <p
                    className="font-medium text-lg text-navy"
                    onClick={() => onClickDetail(2)}
                  >
                    0001
                  </p>
                  <p
                    className="font-bold text-lg text-navy"
                    onClick={() => onClickDetail(2)}
                  >
                    James Shelby
                  </p>
                </div>
              </div>
              <div className="flex w-1/2 justify-end">
                <div className="mx-5">
                  <p
                    className="font-bold text-lg text-navy"
                    onClick={() => onClickDetail(2)}
                  >
                    Product Engineer
                  </p>
                </div>
                <label
                  id="btn-edit-employee-card"
                  htmlFor={`my-modal-3`}
                  className="flex justify-center items-center"
                >
                  <div
                    className="mx-3 text-sky hover:cursor-pointer"
                    //   onClick={()=>console.log("hai")}
                  >
                    <BiEdit size={27} />
                  </div>
                </label>
                <button
                  id="btn-delete-employee-card"
                  className="mx-3 text-sky"
                  //   onClick={()=>console.log("hai")}
                >
                  <AiOutlineDelete size={27} />
                </button>
              </div>
            </div>
          </FlexyCard>
        ))}
      </WrappingCard>

      {/* Modal create employee import csv start */}
      <Modals1 no={1} titleModal="Import by CSV">
        <form>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="w-24 font-semibold text-black text-center">
                Select file:
              </p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <input
                id="input-import-file"
                type="file"
                className="file-input file-input-bordered w-full border-1 border-sky max-w-xs file:bg-sky file:border-none file:capitalize file:text-md text-base"
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              id="btn-file-submit"
              type="submit"
              className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Submit
            </button>
            <label
              id="btn-file-cancel"
              htmlFor="my-modal-1"
              className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
          </div>
        </form>
      </Modals1>
      {/* Modal create employee import csv end */}

      {/* Modal create employee manual start */}
      <Modals1 no={2} parentSet="pt-48" titleModal="Create Employee">
        <form>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Name</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-add-name"
                type="text"
                inputSet="border-sky text-black"
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center  w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Email</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-add-email"
                type="email"
                inputSet="border-sky text-black"
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Password</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-add-password"
                type="text"
                inputSet="border-sky text-black"
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Phone</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-add-phone"
                type="text"
                inputSet="border-sky text-black"
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Position</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                id="select-add-position"
                name="position"
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option id="option-add-position" value="">
                  Position
                </option>
                <option id="option-add-frontend" value="Frontend Engineer">
                  Frontend Engineer
                </option>
                <option id="option-add-backend" value="Backend Engineeer">
                  Backend Engineeer
                </option>
                <option id="option-add-quality" value="Quality Engineer">
                  Quality Engineer
                </option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Gender</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                id="select-add-gender"
                name="gender"
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option id="option-add-gender" value="">
                  Gender
                </option>
                <option id="option-add-male" value="Male">
                  Male
                </option>
                <option id="option-female" value="Male">
                  Female
                </option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Birthdate</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-add-birthdate"
                type="date"
                inputSet="border-sky text-black"
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Addres</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <TextArea
                id="input-add-address"
                inputSet="h-24 border-sky text-black"
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              id="btn-add-submit"
              type="submit"
              className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Submit
            </button>
            <label
              id="btn-add-cancel"
              htmlFor="my-modal-2"
              className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
          </div>
        </form>
      </Modals1>
      {/* Modal create employee manual end */}

      {/* Modal update employee start */}
      <Modals1 no={3} parentSet="pt-48" titleModal="Edit Employee Profile">
        <form>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Name</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-edit-name"
                type="text"
                inputSet="border-sky text-black"
                defaultValue={"ss"}
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center  w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Email</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-edit-email"
                type="email"
                inputSet="border-sky text-black"
                defaultValue={"ss"}
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Password</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-edit-password"
                type="text"
                inputSet="border-sky text-black"
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Phone</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-edit-phone"
                type="text"
                inputSet="border-sky text-black"
                defaultValue={"ss"}
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Position</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                id="select-edit-position"
                name="position"
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option id="option-edit-position" value="">
                  Position
                </option>
                <option id="option-edit-frontend" value="Frontend Engineer">
                  Frontend Engineer
                </option>
                <option id="option-edit-backend" value="Backend Engineeer">
                  Backend Engineeer
                </option>
                <option id="option-edit-quality" value="Quality Engineer">
                  Quality Engineer
                </option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Gender</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                id="select-edit-gender"
                name="gender"
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option id="option-edit-gender" value="">
                  Gender
                </option>
                <option id="option-edit-male" value="Male">
                  Male
                </option>
                <option id="option-edit-female" value="Male">
                  Female
                </option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Birthdate</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-edit-birthdate"
                type="date"
                inputSet="border-sky text-black"
                defaultValue={"ss"}
              />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Addres</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <TextArea
                id="input-edit-address"
                inputSet="h-24 border-sky text-black"
                defaultValue={"ss"}
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              id="btn-edit-submit"
              type="submit"
              className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Submit
            </button>
            <label
              id="btn-edit-cancel"
              htmlFor="my-modal-3"
              className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
          </div>
        </form>
      </Modals1>
      {/* Modal update employee end */}

      {/* Modal delete employee start */}
      <Modals1 no={4} titleModal="Delete Employee">
        <form>
          <div className="flex justify-center gap-5">
            <p>Are you sure want to delete this employee?</p>
          </div>
          <div className="modal-action">
            <button
              id="btn-delete-confirm"
              type="submit"
              className="w-28 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Yes, delete it.
            </button>
            <label
              id="btn-delete-cancel"
              htmlFor="my-modal-4"
              className="w-28 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              No, cancel it.
            </label>
          </div>
        </form>
      </Modals1>
      {/* Modal delete employee end */}
    </Layout>
  );
};

export default Employee;
