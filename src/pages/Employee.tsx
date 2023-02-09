import { BsPencilSquare, BsTrash, BsSearch, BsThreeDots } from "react-icons/bs";
import { AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

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

  const [search, setSearch] = useState<string>("");
  const [employees, setEmployees] = useState<EmployeesType[]>([]);

  const [employeeId, setEmployeeId] = useState<number>();
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeBirthdate, setEmployeeBirthdate] = useState<string>("");
  const [employeeEmail, setEmployeeEmail] = useState<string>("");
  const [employeeGender, setEmployeeGender] = useState<string>("");
  const [employeePosition, setEmployeePosition] = useState<string>("");
  const [employeePhone, setEmployeePhone] = useState<string>("");
  const [employeeAddress, setEmployeeAddress] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [birth_of_date, setBirthOfDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<any>();

  const [editName, setEditName] = useState<string>("");
  const [editBirthdate, setEditBirthdate] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editGender, setEditGender] = useState<string>("");
  const [editPosition, setEditPosition] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");
  const [editAddress, setEditAddress] = useState<string>("");
  const [editPassword, setEditPassword] = useState<string>("");

  function onClickDetail(id: number) {
    navigate(`/employee/profile/${id}`);
  }

  useEffect(() => {
    getEmployees();
  }, [search]);

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

  function getEmployeesId(id: number) {
    axios
      .get(`employees/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setEmployeeId(data.id);
        setEmployeeName(data.name);
        setEmployeeBirthdate(data.birth_of_date);
        setEmployeeEmail(data.email);
        setEmployeeGender(data.gender);
        setEmployeePosition(data.position);
        setEmployeePhone(data.phone);
        setEmployeeAddress(data.address);
      })
      .catch((err) => {});
  }

  function searchEmployees(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .get(`search?q=${search}`, {
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
      })
      .finally(() => setLoading(false));
  };

  function handleImportEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = new FormData();
    body.append("file", file);
    axios
      .post(`register/csv`, body, {
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

  function handleEditEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = new FormData();
    body.append("name", editName);
    body.append("birth_of_date", editBirthdate);
    body.append("email", editEmail);
    body.append("gender", editGender);
    body.append("position", editPosition);
    body.append("phone", editPhone);
    body.append("address", editAddress);
    body.append("password", editPassword);
    axios
      .put(`employees/${employeeId}`, body, {
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

  function handleDeleteEmployee(id: number) {
    Swal.fire({
      title: "Are you sure want to delete this employee?",
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
            <div className="hidden md:flex gap-4 items-center justify-end">
              <form
                className="flex gap-2 item-center"
                onSubmit={searchEmployees}
              >
                <CustomInput
                  id="input-search"
                  inputSet="border-sky w-28 md:w-48 xl:w-60"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  id="btn-search-submit"
                  className="text-sky"
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
                <div className="text-sky hover:cursor-pointer hover:text-green-700">
                  <AiOutlineFileAdd size={30} />
                </div>
              </label>
              <label
                id="btn-add-employee"
                htmlFor={`my-modal-2`}
                className="flex justify-center items-center"
              >
                <div className="text-sky hover:cursor-pointer hover:text-gray-600">
                  <AiOutlineUserAdd size={30} />
                </div>
              </label>
            </div>
            <div className="z-40 dropdown dropdown-end md:hidden">
              <label id="btn-mobile-menu" tabIndex={0}>
                <p className="capitalize text-md font-normal duration-300 hover:cursor-pointer active:scale-75">
                  <BsThreeDots size={27} />
                </p>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 py-2 px-4 shadow menu-compact dropdown-content border-2 border-sky bg-white rounded-2xl w-fit"
              >
                <li>
                  <label
                    id="btn-add-employee-mobile"
                    htmlFor={`my-modal-2`}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 text-sky hover:cursor-pointer hover:text-gray-600">
                      <AiOutlineUserAdd size={27} />
                      <p className="font-medium">Add Employee</p>
                    </div>
                  </label>
                </li>
                <li>
                  <label
                    id="btn-import-file-mobile"
                    htmlFor={`my-modal-1`}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 text-sky hover:cursor-pointer hover:text-green-700">
                      <AiOutlineFileAdd size={27} />
                      <p className="font-medium">Import File</p>
                    </div>
                  </label>
                </li>
                <li>
                  <form
                    className="flex gap-2 item-center"
                    onSubmit={searchEmployees}
                  >
                    <CustomInput
                      id="input-search-mobile"
                      inputSet="border-sky w-40"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      id="btn-search-submit-mobile"
                      className="text-sky"
                      type="submit"
                    >
                      <BsSearch size={27} />
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </>
        }
      >
        {employees.map((data) => (
          <FlexyCard key={data.id}>
            <div className="flex justify-between items-center">
              <div className="flex w-1/2 flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <img
                  src={data.profile_picture}
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full duration-300 hover:cursor-pointer active:scale-95"
                  id={`btn-img-${data.id}`}
                  onClick={() => onClickDetail(data.id)}
                />
                <div>
                  <p
                    className="font-medium xl:text-lg text-navy duration-300 hover:cursor-pointer active:scale-95"
                    id={`btn-nip-${data.id}`}
                    onClick={() => onClickDetail(data.id)}
                  >
                    {data.nip}
                  </p>
                  <p
                    className="font-bold xl:text-lg text-navy duration-300 hover:cursor-pointer active:scale-95"
                    id={`btn-name-${data.id}`}
                    onClick={() => onClickDetail(data.id)}
                  >
                    {data.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 xl:gap-6">
                <p
                  className="text-right font-bold xl:text-lg text-navy duration-300 hover:cursor-pointer active:scale-95"
                  id={`btn-position-${data.id}`}
                  onClick={() => onClickDetail(data.id)}
                >
                  {data.position}
                </p>
                <div className="flex justify-end items-center gap-4">
                  <label
                    id={`btn-edit-employee-${data.id}`}
                    htmlFor={`my-modal-3`}
                    className="text-sky hover:cursor-pointer hover:text-orange-500"
                    onClick={() => getEmployeesId(data.id)}
                  >
                    <BsPencilSquare size={27} />
                  </label>
                  <button
                    id={`btn-delete-employee-${data.id}`}
                    className="text-sky hover:cursor-pointer hover:text-red-600"
                    onClick={() => handleDeleteEmployee(data.id)}
                  >
                    <BsTrash size={27} />
                  </button>
                </div>
              </div>
            </div>
          </FlexyCard>
        ))}
      </WrappingCard>

      {/* Modal edit employee start */}
      <input type="checkbox" id={`my-modal-3`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pt-52 border-2 border-sky flex flex-col justify-center text-sky">
          <form onSubmit={handleEditEmployee}>
            <p className="mb-5 pb-2 text-xl border-b-2 font-bold text-sky ">
              Edit Employee
            </p>
            <div className="flex py-2 w-full">
              <div className="flex items-center w-1/4 mx-5">
                <p className="font-semibold text-black text-center">Name</p>
              </div>
              <div className="flex items-center justify-center w-full mx-2">
                <CustomInput
                  id="input-edit-name"
                  type="text"
                  inputSet="border-sky text-black"
                  defaultValue={employeeName}
                  onChange={(e) => setEditName(e.target.value)}
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
                  defaultValue={employeeEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
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
                  placeholder="****************"
                  onChange={(e) => setEditPassword(e.target.value)}
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
                  defaultValue={employeePhone}
                  onChange={(e) => setEditPhone(e.target.value)}
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
                  defaultValue={employeePosition}
                  onChange={(e) => setEditPosition(e.target.value)}
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
                  defaultValue={employeeGender}
                  onChange={(e) => setEditGender(e.target.value)}
                >
                  <option id="option-edit-gender" value="">
                    Gender
                  </option>
                  <option id="option-edit-male" value="Male">
                    Male
                  </option>
                  <option id="option-edit-female" value="Female">
                    Female
                  </option>
                </select>
              </div>
            </div>
            <div className="flex py-2 w-full">
              <div className="flex items-center w-1/4 mx-5">
                <p className="font-semibold text-black text-center">
                  Birthdate
                </p>
              </div>
              <div className="flex items-center justify-center w-full mx-2">
                <CustomInput
                  id="input-edit-birthdate"
                  type="date"
                  inputSet="border-sky text-black"
                  defaultValue={employeeBirthdate}
                  onChange={(e) => setEditBirthdate(e.target.value)}
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
                  defaultValue={employeeAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                id={`btn-edit-submit-${employeeId}`}
                type="submit"
                className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
              >
                Submit
              </button>
              <label
                id={`btn-edit-cancel-${employeeId}`}
                htmlFor="my-modal-3"
                className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
              >
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
      {/* Modal edit employee end */}

      {/* Modal create employee import csv start */}
      <Modals1 no={1} titleModal="Import by CSV">
        <form onSubmit={handleImportEmployee}>
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
                accept="text/csv"
                className="file-input file-input-bordered w-full border-1 border-sky max-w-xs file:bg-sky file:border-none file:capitalize file:text-md text-base"
                onChange={(e) => setFile(e.target.files?.[0])}
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
      <Modals1 no={2} parentSet="xl:pt-6" titleModal="Create Employee">
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
                <option key="option-female" id="option-female" value="Female">
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
            <label>
              <button
                id="btn-add-submit"
                type="submit"
                className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                disabled={loading || disabled}
              >
                Submit
              </button>
            </label>
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
    </Layout>
  );
};

export default Employee;
