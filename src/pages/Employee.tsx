import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import axios from "axios";
import {
  AiOutlineFileAdd,
  AiOutlineUserAdd,
  AiOutlineDelete,
} from "react-icons/ai";

import { CustomInput, TextArea } from "components/CustomInput";
import { FlexyCard, WrappingCard } from "components/Card";
import { Modals1 } from "components/Modals";
import Layout from "components/Layout";

interface EmployeesType {
  id: number;
  name: string;
  nip: string;
  position: string;
  profile_picture: string;
}

const Employee = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [employees, setEmployees] = useState<EmployeesType[]>([]);

  const [name, setName] = useState<string>("");
  const [birth_of_date, setBirthOfDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onClickDetail(id: number) {
    navigate(`/employee/profile/${id}`);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (
      name &&
      birth_of_date &&
      email &&
      gender &&
      position &&
      phone &&
      address &&
      password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, birth_of_date, email, gender, position, phone, address, password]);

  function getEmployees() {
    axios
      .get(`employees`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setEmployees(data);
      })
      .catch((err) => {});
  }

  const handleCreateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = new FormData();
    body.append("name", name);
    body.append("birth_of_date", birth_of_date);
    body.append("email", email);
    body.append("gender", gender);
    body.append("position", position);
    body.append("phone", phone);
    body.append("address", address);
    body.append("password", password);
    await axios
      .post(`register`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        console.log(res);
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
        console.log(err);
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      })
      .finally(() => setLoading(false));
  };

  function handleDeleteEmployee(id: number) {
    Swal.fire({
      title: "Are you sure want to delete this employee?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`employees/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Delete successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            getEmployees();
          })
          .catch((err) => {});
      }
    });
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
                <div className="mx-2 text-sky hover:cursor-pointer hover:text-green-700">
                  <AiOutlineFileAdd size={27} />
                </div>
              </label>
              <label
                id="btn-add-employee"
                htmlFor={`my-modal-2`}
                className="flex justify-center items-center"
              >
                <div className="mx-2 text-sky hover:cursor-pointer hover:text-gray-600">
                  <AiOutlineUserAdd size={27} />
                </div>
              </label>
            </div>
          </>
        }
      >
        {employees.map((data) => (
          <FlexyCard key={data.id}>
            <div className="flex justify-center items-center">
              <div className="flex w-1/2">
                <img
                  src={data.profile_picture}
                  className="w-[50px] h-[50px] rounded-full duration-300 hover:cursor-pointer active:scale-95"
                  id={`btn-img-${data.id}`}
                  onClick={() => onClickDetail(data.id)}
                />
                <div className="mx-7">
                  <p
                    className="font-medium text-lg text-navy duration-300 hover:cursor-pointer active:scale-95"
                    id={`btn-nip-${data.id}`}
                    onClick={() => onClickDetail(data.id)}
                  >
                    {data.nip}
                  </p>
                  <p
                    className="font-bold text-lg text-navy duration-300 hover:cursor-pointer active:scale-95"
                    id={`btn-name-${data.id}`}
                    onClick={() => onClickDetail(data.id)}
                  >
                    {data.name}
                  </p>
                </div>
              </div>
              <div className="flex w-1/2 justify-end items-center">
                <div className="mx-5">
                  <p
                    className="font-bold text-lg text-navy duration-300 hover:cursor-pointer active:scale-95"
                    id={`btn-position-${data.id}`}
                    onClick={() => onClickDetail(data.id)}
                  >
                    {data.position}
                  </p>
                </div>
                <label
                  id={`btn-edit-employee-${data.id}`}
                  htmlFor={`my-modal-3`}
                  className="mx-3 text-sky hover:cursor-pointer hover:text-orange-600"
                >
                  <BiEdit size={27} />
                </label>
                <button
                  id={`btn-delete-employee-${data.id}`}
                  className="mx-3 text-sky hover:cursor-pointer hover:text-red-600"
                  onClick={() => handleDeleteEmployee(data.id)}
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
        <form onSubmit={(e) => handleCreateEmployee(e)}>
          <div className="flex py-2 w-full">
            <div className="flex items-center w-1/4 mx-5">
              <p className="font-semibold text-black text-center">Name</p>
            </div>
            <div className="flex items-center justify-center w-full mx-2">
              <CustomInput
                id="input-add-name"
                type="text"
                inputSet="border-sky text-black"
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setPosition(e.target.value)}
              >
                <option
                  key="option-add-option"
                  id="option-add-position"
                  value=""
                >
                  Position
                </option>
                <option
                  key="option-add-frontend"
                  id="option-add-frontend"
                  value="Frontend Engineer"
                >
                  Frontend Engineer
                </option>
                <option
                  key="option-add-backend"
                  id="option-add-backend"
                  value="Backend Engineeer"
                >
                  Backend Engineeer
                </option>
                <option
                  key="option-add-quality"
                  id="option-add-quality"
                  value="Quality Engineer"
                >
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
                onChange={(e) => setGender(e.target.value)}
              >
                <option key="option-add-gender" id="option-add-gender" value="">
                  Gender
                </option>
                <option key="option-add-male" id="option-add-male" value="Male">
                  Male
                </option>
                <option key="option-female" id="option-female" value="Male">
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
                onChange={(e) => setBirthOfDate(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              id="btn-add-submit"
              type="submit"
              className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
              disabled={loading || disabled}
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
                <option
                  key="option-edit-frontend"
                  id="option-edit-frontend"
                  value="Frontend Engineer"
                >
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
    </Layout>
  );
};

export default Employee;
