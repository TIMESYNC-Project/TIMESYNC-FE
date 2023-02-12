import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/all";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import { CustomInput } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import { FlexyCard } from "components/Card";
import Layout from "components/Layout";

import { EmployeesType, DataRecordsType } from "utils/Type";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "components/Loader";

const Records = () => {
  //state datepicker
  const [inStartDate, setInStartDate] = useState<string>("");
  const [inEndDate, setInEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState(null);

  const [employees, setEmployees] = useState<EmployeesType[]>([]);
  const [records, setRecords] = useState<DataRecordsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
  }, []);

  function getEmployees() {
    setLoading(true);
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
      .catch((err) => {})
      .finally(() => setLoading(false));
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
        const { data, message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setEmployees(data);
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
  }

  function onClickDetail(id: number) {
    navigate(`/records/details/${id}`);
  }

  function getRecordsEmployee() {
    setLoading(true);
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
        const { data, message } = res.data;
        const { record } = data;
        Swal.fire({
          position: "center",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setRecords(record);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Add date first",
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {cookie.role === "admin" ? (
        loading ? (
          <Loader />
        ) : (
          <WrappingCard
            judul="Records"
            rightSide={
              <div className="">
                <form
                  className="flex items-center gap-2"
                  id="form-search"
                  onSubmit={searchEmployees}
                >
                  <CustomInput
                    inputSet="border-sky w-36 md:w-full"
                    placeholder="Search"
                    id="input-search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="text-sky active:scale-75 duration-300"
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
                    className="flex justify-between items-center hover:cursor-pointer "
                    onClick={() => onClickDetail(data.id)}
                    id="btn-detail-records"
                  >
                    <div className="flex w-1/2 items-center gap-2 md:gap-4">
                      <img
                        src={data.profile_picture}
                        className="w-10 h-10 md:w-16 md:h-16 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium text-sm md:text-lg text-navy">
                          {data.nip}
                        </p>
                        <p className="font-bold text-sm md:text-lg text-navy">
                          {data.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end w-1/4 md:w-full text-right">
                      <p className="font-bold text-sm md:text-lg text-navy">
                        {data.position}
                      </p>
                    </div>
                  </div>
                </FlexyCard>
              );
            })}
          </WrappingCard>
        )
      ) : loading ? (
        <Loader />
      ) : (
        <WrappingCard
          judul="Records"
          rightSide={
            <>
              <div
                className="flex justify-center items-center border-2 rounded-xl h-14"
                id="card-date-range-picker"
              >
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="input input-borderd border-2"
                  id="input-date-range-picker"
                  maxDate={new Date()}
                />
                <div
                  className="btn btn-ghost"
                  onClick={() => getRecordsEmployee()}
                  id={`btn-date-range-picker`}
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
                  <div
                    className="flex justify-center items-center w-full"
                    id={`card-detail-records-${data.attendance_date}`}
                  >
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
                      <p className="text-black capitalize ">
                        {data.attendance}
                      </p>
                    </div>
                  </div>
                </FlexyCard>
              );
            })
          )}
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Records;
