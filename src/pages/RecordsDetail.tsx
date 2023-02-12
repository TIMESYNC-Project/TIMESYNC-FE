import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import { WrappingCard, FlexyCard } from "components/Card";
import { Modals1, Modals2 } from "components/Modals";
import { CustomInput } from "components/CustomInput";
import Layout from "components/Layout";
import Loader from "components/Loader";

import { DataRecordsType, ProfileType } from "utils/Type";
import "react-datepicker/dist/react-datepicker.css";

const RecordsDetail = () => {
  const [inStartDate, setInStartDate] = useState<string>("");
  const [inEndDate, setInEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState(null);

  const [addStart, setAddStart] = useState<string>("");
  const [addAtt, setAddAtt] = useState<string>("");
  const [addEnd, setAddEnd] = useState<string>("");

  const [records, setRecords] = useState<DataRecordsType[]>([]);
  const [detail, setDetail] = useState<DataRecordsType>({});
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<ProfileType>({});
  const [date, setDate] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setInStartDate(moment(start).format("YYYY-MM-DD"));
    setInEndDate(moment(end).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    newDate();
    getName();
  }, []);

  useEffect(() => {
    if (addAtt && addStart && addEnd) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [addAtt, addEnd, addStart]);

  function newDate() {
    const tanggal = moment().format();
    setDate(tanggal.substring(0, 10));
  }

  //function for admin
  function getName() {
    setLoading(true);
    axios
      .get(`employees/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setName(data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }

  //function for admin and employee
  function getRecordsEmployee() {
    setLoading(true);
    axios
      .get(
        `https://shirayuki.site/record/${id}?date_from=${inStartDate}&date_to=${inEndDate}`,
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

  async function presencesDetail(id: number) {
    await axios
      .get(`https://shirayuki.site/presences/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDetail(data);
      })
      .catch((err) => {});
  }

  function addAttendances(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        `https://shirayuki.site/attendances/${id}`,
        {
          attendance: addAtt,
          date_start: addStart,
          date_end: addEnd,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
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
      .catch((err) => {})
      .finally(() => setLoading(false));
  }

  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {loading ? (
        <Loader />
      ) : (
        <WrappingCard
          judul="Records"
          rightSide={
            <div className="flex items-center gap-2 xl:gap-4">
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
                  className="input input-borderd border-2 w-24 md:w-48 xl:w-full text-xs md:text-base"
                  id="input-date-range-picker"
                />
                <div
                  className="btn btn-ghost"
                  onClick={() => getRecordsEmployee()}
                  id="btn-date-range-picker"
                >
                  <BsSearch size={27} />
                </div>
              </div>

              {/* modal add Attendance start*/}
              <label
                id="btn-add-attendance"
                htmlFor={`my-modal-1`}
                className={`normal-case bg-transparent`}
              >
                <div className="flex flex-col cursor-pointer items-center justify-center h-full">
                  <div className="flex text-sky">
                    <BiAddToQueue size={30} />
                  </div>
                </div>
              </label>
              <Modals1 no={1} titleModal={"Create Attendance"}>
                <form onSubmit={addAttendances}>
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
                        onChange={(e) => setAddAtt(e.target.value)}
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
                        inputSet="border-sky text-black w-44 md:w-full"
                        min={date}
                        max={addEnd? addEnd : undefined}
                        onChange={(e) => setAddStart(e.target.value)}
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
                        inputSet="border-sky text-black w-44 md:w-full"
                        min={addStart? addStart : date}
                        onChange={(e) => setAddEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-action">
                    <button
                      disabled={disabled || loading}
                      id="btn-submit-attendance"
                      type="submit"
                      className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      Submit
                    </button>
                    <label
                      id="btn-cancel-attendance"
                      htmlFor={`${loading ? "" : "my-modal-1"}`}
                      className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      Cancel
                    </label>
                  </div>
                </form>
              </Modals1>
              {/* modal add Attendance end*/}
            </div>
          }
        >
          <div className="pb-5">
            <p className="text-xl font-bold text-navy">{name.name}</p>
          </div>
          {records.length === 0 ? (
            <p className="text-center text-3xl font-bold animate-pulse text-gray-300 capitalize">
              add date first
            </p>
          ) : (
            records.map((data) => {
              return (
                <label
                  htmlFor={data.id == 0 ? "" : "my-modal-2"}
                  id={`btn-detail-records-${data.attendance_date}`}
                  key={data.attendance_date}
                >
                  <FlexyCard parentSet="hover:cursor-pointer">
                    <div
                      className="flex justify-between items-center"
                      onClick={() => presencesDetail(data.id ? data.id : 1)}
                      id={`card-detail-records-${data.attendance_date}`}
                    >
                      <section className="flex justify-start w-1/3">
                        <p className="text-black capitalize ">
                          {new Date(`${data.attendance_date}`)
                            .toString()
                            .substring(3, 15)}
                        </p>
                      </section>
                      {data.clock_in && data.clock_out !== null && (
                        <section className="flex items-center">
                          <p className="text-black capitalize">
                            {data.clock_in}
                          </p>
                          <p className="mx-2 md:mx-6 lg:mx-16">-</p>
                          <p className="text-black capitalize">
                            {data.clock_out}
                          </p>
                        </section>
                      )}
                      <section className="flex justify-end w-1/3">
                        <p className="text-black capitalize">
                          {data.attendance}
                        </p>
                      </section>
                    </div>
                  </FlexyCard>
                </label>
              );
            })
          )}

          {/* modal detail records start*/}
          <Modals1 no={2} titleModal={"Details Records"}>
            <div className="flex py-2 w-full">
              <div className="flex items-center justify-start w-1/2 mx-2">
                <p className="text-black mx-10 font-medium">Date</p>
              </div>
              <div className="flex items-center justify-start w-1/2 mx-2">
                <p className="text-black">
                  {new Date(`${detail.attendance_date}`)
                    .toString()
                    .substring(3, 15)}
                </p>
              </div>
            </div>
            {detail.attendance !== "present" ? null : (
              <>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black mx-10 font-medium">Clock In</p>
                  </div>
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black">{detail.clock_in}</p>
                  </div>
                </div>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black mx-10 font-medium">Clock Out</p>
                  </div>
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black">{detail.clock_out}</p>
                  </div>
                </div>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black mx-10 font-medium">Location 1</p>
                  </div>
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black">{detail.clock_in_location}</p>
                  </div>
                </div>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black mx-10 font-medium">Location 2</p>
                  </div>
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black">{detail.clock_out_location}</p>
                  </div>
                </div>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black mx-10 font-medium">Status</p>
                  </div>
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black capitalize">
                      {detail.attendance_status}
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className="flex py-2 w-full">
              <div className="flex items-center justify-start w-1/2 mx-2">
                <p className="text-black mx-10 font-medium ">Attendance</p>
              </div>
              <div className="flex items-center justify-start w-1/2 mx-2">
                <p className="text-black capitalize">{detail.attendance}</p>
              </div>
            </div>
            {detail.attendance !== "present" ? null : (
              <>
                <div className="flex py-2 w-full">
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black mx-10 font-medium">
                      Total Hours Working
                    </p>
                  </div>
                  <div className="flex items-center justify-start w-1/2 mx-2">
                    <p className="text-black">{detail.work_time}</p>
                  </div>
                </div>
              </>
            )}

            <div className="modal-action">
              <label
                id="btn-cancel-detail"
                htmlFor="my-modal-2"
                className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
              >
                Close
              </label>
            </div>
          </Modals1>
          {/* modal detail records end*/}
        </WrappingCard>
      )}
    </Layout>
  );
};

export default RecordsDetail;
