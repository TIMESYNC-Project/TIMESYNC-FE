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
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const navigate = useNavigate()

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
                <CustomInput inputSet="border-sky" placeholder="Search" />
                <button className="mx-2 ml-4 text-sky" type="submit">
                  <BsSearch size={27} />
                </button>
              </form>
              <label
                htmlFor={`my-modal-1`}
                className="flex justify-center items-center"
              >
                <div className="mx-2 text-sky hover:cursor-pointer">
                  <AiOutlineFileAdd size={27} />
                </div>
              </label>
              <label
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
        <FlexyCard>
          <div className="flex justify-center items-center" onClick={()=>onClickDetail(2)}>
            <div className="flex w-1/2">
              <img
                src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                className="w-[50px] h-[50px]  rounded-full"
              />
              <div className="mx-7">
                <p className="font-medium text-lg text-navy">0001</p>
                <p className="font-bold text-lg text-navy">James Shelby</p>
              </div>
            </div>
            <div className="flex w-1/2 justify-end">
              <div className="mx-5">
                <p className="font-bold text-lg text-navy">Product Engineer</p>
              </div>
              <label
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
                className="mx-3 text-sky"
                //   onClick={()=>console.log("hai")}
              >
                <AiOutlineDelete size={27} />
              </button>
            </div>
          </div>
        </FlexyCard>
      </WrappingCard>
      {/* Modal create employee manual start */}
      <Modals1 no={2} titleModal="Create Employee">
        <form>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Name</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput type="text" inputSet="border-sky text-black" />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center  w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Email</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput type="email" inputSet="border-sky text-black" />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Password</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput type="text" inputSet="border-sky text-black" />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Phone</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput type="text" inputSet="border-sky text-black" />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Position</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                name="position"
                id=""
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option value="">Position</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineeer">Backend Engineeer</option>
                <option value="Quality Engineer">Quality Engineer</option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Gender</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                name="gender"
                id=""
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Male">Female</option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Birthdate</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput type="date" inputSet="border-sky text-black" />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Addres</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <TextArea inputSet="h-24 border-sky text-black" />
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-2"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
            <button
              type="submit"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Submit
            </button>
          </div>
        </form>
      </Modals1>
      {/* Modal create employee manual end */}

      {/* Modal create employee import csv start */}
      <Modals1 no={1} titleModal="Import by CSV">
        <form>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Import</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <input
                type="file"
                className="file-input file-input-bordered w-full border-1 border-sky max-w-xs file:bg-sky file:border-none file:capitalize file:text-md text-base"
              />
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-1"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
            <button
              type="submit"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Submit
            </button>
          </div>
        </form>
      </Modals1>
      {/* Modal create employee import csv end */}

      {/* Modal update employee start */}
      <Modals1 no={3} titleModal="Create Employee">
        <form>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Name</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
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
              <CustomInput type="text" inputSet="border-sky text-black" />
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Phone</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
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
                name="position"
                id=""
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option value="">Position</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineeer">Backend Engineeer</option>
                <option value="Quality Engineer">Quality Engineer</option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Gender</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <select
                name="gender"
                id=""
                className="select select-bordered border-sky w-full text-black font-normal"
                // onChange={()=>}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Male">Female</option>
              </select>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Birthdate</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
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
                inputSet="h-24 border-sky text-black"
                defaultValue={"ss"}
              />
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-3"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
            <button
              type="submit"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
            >
              Update
            </button>
          </div>
        </form>
      </Modals1>
      {/* Modal update employee end */}
    </Layout>
  );
};

export default Employee;
