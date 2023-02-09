import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/all";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import axios from "axios";

import { CustomInput } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import { FlexyCard } from "components/Card";
import Layout from "components/Layout";

import "react-datepicker/dist/react-datepicker.css";

interface EmployeesType {
  id: number;
  name: string;
  nip: string;
  position: string;
  profile_picture: string;
}

const Records = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState(null);

  const [employees, setEmployees] = useState<EmployeesType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start);
    console.log(end);
  };

  useEffect(() => {
    getEmployees();
  }, [search]);

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

  function onClickDetail(id: number) {
    navigate(`/records/details/${id}`);
  }

  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {cookie.role === "admin" ? (
        <WrappingCard
          judul="Records"
          rightSide={
            <div className="flex justify-end">
              <form
                className="flex justify-end"
                id="form-search"
                onSubmit={searchEmployees}
              >
                <CustomInput
                  inputSet="border-sky"
                  placeholder="Search"
                  id="input-search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-ghost mx-1 text-sky"
                  type="submit"
                  id="btn-search"
                >
                  <BsSearch size={27} />
                </button>
              </form>
            </div>
          }
        >
          {employees.map((data) => {
            return (
              <FlexyCard parentSet="active:scale-95">
                <div
                  key={data.id}
                  className="flex justify-center items-center hover:cursor-pointer "
                  onClick={() => onClickDetail(2)}
                  id="btn-detail-records"
                >
                  <div className="flex w-1/2">
                    <img
                      src={data.profile_picture}
                      className="w-[50px] h-[50px]  rounded-full"
                    />
                    <div className="mx-7">
                      <p className="font-medium text-lg text-navy">
                        {data.nip}
                      </p>
                      <p className="font-bold text-lg text-navy">{data.name}</p>
                    </div>
                  </div>
                  <div className="flex w-1/2 justify-end">
                    <div className="mx-5">
                      <p className="font-bold text-lg text-navy">
                        {data.position}
                      </p>
                    </div>
                  </div>
                </div>
              </FlexyCard>
            );
          })}
        </WrappingCard>
      ) : (
        <WrappingCard
          judul="Records"
          rightSide={
            <>
              <div className="flex justify-center items-center">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </div>
            </>
          }
        >
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize ">jan 30, 2023</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p>07.25</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p>17.20</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p>presence</p>
              </div>
            </div>
          </FlexyCard>
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize ">jan 30, 2023</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize">07.25</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize">17.20</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize">presence</p>
              </div>
            </div>
          </FlexyCard>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Records;
