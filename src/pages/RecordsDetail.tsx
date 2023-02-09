import React, { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";

import { WrappingCard, FlexyCard } from "components/Card";
import { Modals1, Modals2 } from "components/Modals";
import { CustomInput } from "components/CustomInput";
import Layout from "components/Layout";

import "react-datepicker/dist/react-datepicker.css";

interface DataType {
  attendance: string;
  attendance_date: string;
  attendance_status: string;
  clock_in: string;
  clock_in_location: string;
  clock_in_map_location: string;
  clock_out: string;
  clock_out_location: string;
  clock_out_map_location: string;
  id: number;
  work_time: string;
}

const RecordsDetail = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState(null);

  const [date, setDate] = useState<string>("");
  const [records, setRecords] = useState<DataType[]>([]);
  const [name, setName] = useState<string>("");
  const [date2, setDate2] = useState<Date>();
  const [cookie, setCookie] = useCookies();
  const { id } = useParams();

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(typeof start);
    console.log(typeof end);
    console.log("date", typeof dates);
  };

  useEffect(() => {
    newDate();
    getRecordsEmployee();
  }, []);

  function newDate() {
    const tanggal = moment().format();
    const tanggal2 = new Date();
    setDate(tanggal.substring(0, 10));
    setDate2(tanggal2);
  }
  // https://shirayuki.site/record/${id}?date_from=${startDate}&date_to=${endDate}
  // https://shirayuki.site/record/17?date_from=2023-02-05&date_to=2023-02-11
  function getRecordsEmployee() {
    axios
      .get(
        `https://shirayuki.site/record/${id}?date_from=2023-02-05&date_to=2023-02-11`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        const { record, employee_name } = data;
        setName(employee_name);
        setRecords(record);
      })
      .catch((err) => {});
  }

  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Details Records"
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
                minDate={date2}
              />
            </div>

            {/* modal add Attendance start*/}
            <label
              id="btn-add-attendance"
              htmlFor={`my-modal-1`}
              className={`normal-case bg-transparent`}
            >
              <div className="flex flex-col cursor-pointer items-center justify-center h-full">
                <div className="flex  mx-5 text-sky">
                  <BiAddToQueue size={30} />
                </div>
              </div>
            </label>
            <Modals1 no={1} titleModal={"Create Attendance"}>
              <form>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-center w-1/3 mx-2">
                    <p className="font-semibold text-black text-center">
                      Attendance
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-2/3 mx-2">
                    <select
                      name="attendance"
                      id="select-attendance"
                      className="select select-bordered border-sky w-full text-black"
                      // onChange={()=>}
                    >
                      <option value="" id="option-attendance">
                        Attendance
                      </option>
                      <option value="Annual Leave" id="option-annual-leave">
                        Annual Leave
                      </option>
                      <option value="On Leave" id="option-on-leave">
                        On Leave
                      </option>
                      <option value="Sick Leave" id="option-sick-leave">
                        Sick Leave
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-center w-1/3 mx-2">
                    <p className="font-semibold text-black text-center">
                      Date Start
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-2/3 mx-2">
                    <CustomInput
                      id="input-date-start"
                      type="date"
                      inputSet="border-sky text-black"
                      min={date}
                    />
                  </div>
                </div>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-center w-1/3 mx-2">
                    <p className="font-semibold text-black text-center">
                      Date End
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-2/3 mx-2">
                    <CustomInput
                      id="input-date-end"
                      type="date"
                      inputSet="border-sky text-black"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <label
                    id="btn-cancel-attendance"
                    htmlFor="my-modal-1"
                    className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                  >
                    Cancel
                  </label>
                  <button
                    id="btn-submit-attendance"
                    type="submit"
                    className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                  >
                    Update
                  </button>
                </div>
              </form>
            </Modals1>
            {/* modal add Attendance end*/}
          </>
        }
      >
        <div className="pb-5">
          <p className="text-xl font-bold text-navy">{name}</p>
        </div>
        {records.map((data) => {
          return (
            <label
              htmlFor={data.id == 0 ? "" : "my-modal-2"}
              id={`btn-detail-records-${data.attendance_date}`}
              key={data.attendance_date}
            >
              <FlexyCard parentSet="hover:cursor-pointer">
                <div className="flex justify-center items-center w-full">
                  <div className="flex justify-center w-1/4 mx-2">
                    <p className="text-black capitalize ">
                      {data.attendance_date}
                    </p>
                  </div>
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize">{data.clock_in}</p>
                  </div>
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize">{data.clock_out}</p>
                  </div>
                  <div className="flex justify-center w-1/4">
                    <p className="text-black capitalize">{data.attendance}</p>
                  </div>
                </div>
              </FlexyCard>
            </label>
          );
        })}

        {/* modal detail records start*/}
        <Modals1 no={2} titleModal={"Details Records"}>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Date</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">January 31, 2023</p>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Clock In</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">07.20</p>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Clock Out</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">17.20</p>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Location</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">
                Jl. Jalandikuburan No.13, Kec. Mangga Dua, Kel.Cimanggis, Duren
                Sawit, Jakarta Timur
              </p>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Status</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">On Time</p>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Attendance</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">Presence</p>
            </div>
          </div>
          <div className="flex py-2 w-full">
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black mx-10">Total Hours Working</p>
            </div>
            <div className="flex items-center justify-start w-1/2 mx-2">
              <p className="text-black">8h 40m</p>
            </div>
          </div>
          <div className="modal-action">
            <label
              id="btn-cancel-detail"
              htmlFor="my-modal-2"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
          </div>
        </Modals1>
        {/* modal detail records end*/}
      </WrappingCard>
    </Layout>
  );
};

export default RecordsDetail;
