import React, { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useParams } from "react-router-dom";
import moment from "moment";

import { WrappingCard, FlexyCard } from "components/Card";
import { Modals1, Modals2 } from "components/Modals";
import { CustomInput } from "components/CustomInput";
import Layout from "components/Layout";

const RecordsDetail = () => {
  const [date, setDate] = useState<string>("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    newDate();
  }, []);

  function newDate() {
    const tanggal = moment().format();
    setDate(tanggal.substring(0, 10));
  }

  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Details Records"
        rightSide={
          <>
            <select
              name="Month"
              id="select-date-recods"
              className="select select-bordered border-sky w-1/3"
              // onChange={()=>}
            >
              <option value="" id="option-date-recods-month">
                Month
              </option>
              <option value="January" id="option-date-recods-january">
                January
              </option>
              <option value="February" id="option-date-recods-february">
                February
              </option>
              <option value="March" id="option-date-recods-march">
                March
              </option>
              <option value="April" id="option-date-recods-april">
                April
              </option>
              <option value="May" id="option-date-recods-may">
                May
              </option>
              <option value="June" id="option-date-recods-june">
                June
              </option>
              <option value="July" id="option-date-recods-july">
                July
              </option>
              <option value="August" id="option-date-recods-august">
                August
              </option>
              <option value="September" id="option-date-recods-september">
                September
              </option>
              <option value="October" id="option-date-recods-october">
                October
              </option>
              <option value="November" id="option-date-recods-november">
                November
              </option>
              <option value="December" id="option-date-recods-december">
                December
              </option>
            </select>

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
          <p className="text-xl font-bold text-navy">James Shelby</p>
        </div>
        <label htmlFor="my-modal-2" id={`btn-detail-records-${"data.id"}`}>
          <FlexyCard parentSet="hover:cursor-pointer">
            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center w-1/4 mx-2">
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
        </label>

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
