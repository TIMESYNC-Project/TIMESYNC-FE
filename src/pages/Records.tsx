import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/all";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import moment from "moment";
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
interface DataType {
  attendance?: string;
  attendance_date?: string;
  attendance_status?: string;
  clock_in?: string;
  clock_in_location?: string;
  clock_in_map_location?: string;
  clock_out?: string;
  clock_out_location?: string;
  clock_out_map_location?: string;
  id?: number;
  work_time?: string;
}

const Records = () => {
  //state datepicker
  const [inStartDate, setInStartDate] = useState<string>("");
  const [inEndDate, setInEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState(null);

  const [employees, setEmployees] = useState<EmployeesType[]>([]);
  const [records, setRecords] = useState<DataType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setInStartDate(moment(start).format("YYYY-MM-DD"));
    setInEndDate(moment(end).format("YYYY-MM-DD"));
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

  function getRecordsEmployee() {
    axios
      .get(
        `https://shirayuki.site/record/${cookie.id}?date_from=${inStartDate}&date_to=${inEndDate}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        const { record } = data;
        setRecords(record);
      })
      .catch((err) => {});
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
              <FlexyCard parentSet="active:scale-95" key={data.id}>
                <div
                  key={data.id}
                  className="flex justify-center items-center hover:cursor-pointer "
                  onClick={() => onClickDetail(data.id)}
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
              <div className="flex justify-center items-center border-2 rounded-xl h-14">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="input input-borderd border-2"
                />
                <div
                  className="btn btn-ghost"
                  onClick={() => getRecordsEmployee()}
                >
                  <BsSearch size={27} />
                </div>
              </div>
            </>
          }
        >
          {records.length === 0 ? (
          <p className="text-center text-3xl font-bold animate-pulse text-gray-300 capitalize">
            add date first
          </p>
        ) : (
          records.map((data) => {
            return (
              <FlexyCard key={data.id}>
                <div className="flex justify-center items-center w-full">
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize ">
                      {new Date(`${data.attendance_date}`)
                        .toString()
                        .substring(3, 15)}
                    </p>
                  </div>
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize ">{data.clock_in}</p>
                  </div>
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize ">{data.clock_out}</p>
                  </div>
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize ">{data.attendance}</p>
                  </div>
                </div>
              </FlexyCard>
            );
          }))}
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Records;
