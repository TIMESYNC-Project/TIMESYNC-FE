import React, { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useParams } from "react-router-dom";
import moment from "moment";

import { WrappingCard, FlexyCard } from "components/Card";
import Layout from "components/Layout";
import { Modals1, Modals2 } from "components/Modals";
import { CustomInput } from "components/CustomInput";

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
              id=""
              className="select select-bordered border-sky w-1/3"
              // onChange={()=>}
            >
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            {/* modal add Attendance start*/}
            <label
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
                      name="Month"
                      id=""
                      className="select select-bordered border-sky w-full text-black"
                      // onChange={()=>}
                    >
                      <option value="">Attendance</option>
                      <option value="Presence">Presence</option>
                      <option value="Absence">Absence</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="On Leave">On Leave</option>
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
                    <CustomInput type="date" inputSet="border-sky text-black" />
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
        <label htmlFor="my-modal-2">
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
              htmlFor="my-modal-2"
              className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
          </div>
        </Modals1>

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
    </Layout>
  );
};

export default RecordsDetail;
