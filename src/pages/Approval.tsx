import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { CardWithLogo, FlexyCard, WrappingCard } from "components/Card";
import { Modals1, Modals2 } from "components/Modals";
import Button from "components/Button";
import Layout from "components/Layout";
import Logo from "assets/logo.png";

const Approval = () => {
  const [attendance, setAttendance] = useState<string>("approved");
  const [color, setColor] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    textColor();
  }, []);

  function textColor() {
    if (attendance === "pending") setColor("text-orange-500");
    if (attendance === "rejected") setColor("text-red-500");
    if (attendance === "approved") setColor("text-green-500");
  }
  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white ">
      {cookie.role === "admin" ? (
        <WrappingCard judul="Approval Requests">
          <label htmlFor="my-modal-1">
            <FlexyCard>
              <div className="flex justify-center items-center w-full hover:cursor-pointer">
                <div className="text-center w-1/4">
                  <p className="text-black capitalize font-semibold">
                    jan 30, 2023
                  </p>
                </div>
                <div className="text-center w-1/4">
                  <p className="text-black capitalize font-medium">
                    James Shelby
                  </p>
                </div>
                <div className="text-center w-1/4">
                  <p className="text-black capitalize font-medium">1 day</p>
                  <p className="text-black capitalize font-medium">
                    sick leave
                  </p>
                </div>
                <div className="text-center w-1/4">
                  <p className={`${color} capitalize font-bold`}>
                    {attendance}
                  </p>
                </div>
              </div>
            </FlexyCard>
          </label>
          {/* modal detail approval start*/}
          <Modals2 no={1} titleModal="Detail Approval">
            <form>
              <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
                <div className="flex">
                  <div className="w-1/2 flex items-center">
                    <p className="text-black font-semibold text-xl">
                      James Shelby
                    </p>
                  </div>
                  <div className="w-1/2 flex justify-end items-center">
                    <img src={Logo} alt="" width={40} />
                  </div>
                </div>
                <div className="py-5">
                  <p className="text-black font-normal text-md">
                    Januari 31, 2023 - February 1, 2023
                  </p>
                  <p className="text-black font-normal text-md">Sick Leave</p>
                  <p className="text-black font-normal text-md my-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus repudiandae assumenda consequuntur maiores. Alias
                    quaerat ab debitis enim nobis officiis delectus iure
                    voluptates ipsum autem!
                  </p>
                  <div className="flex justify-center w-full">
                    <img src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg" className="w-[50%]"/>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                >
                  Reject
                </button>
                <button
                  type="submit"
                  className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                >
                  Approve
                </button>
              </div>
            </form>
          </Modals2>
        </WrappingCard>
      ) : (
        <WrappingCard
          judul="Approval"
          rightSide={
            <>
              <Button
                label="Request Approval"
                buttonSet="shadow-xl rounded-xl text-white"
                onClick={() => navigate("/approval/request")}
              />
            </>
          }
        >
          <label htmlFor="my-modal-2">
            <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <div className="text-start w-1/3 mx-5">
                <p className="text-black capitalize font-semibold">
                  jan 30, 2023
                </p>
              </div>
              <div className="text-center w-1/3 mx-5">
                <p className="text-black capitalize font-medium">1 day</p>
                <p className="text-black capitalize font-medium">sick leave</p>
              </div>
              <div className="text-end w-1/3 mx-5">
                <p className={`${color} capitalize font-bold`}>{attendance}</p>
              </div>
            </div>
          </FlexyCard>
          </label>
          <Modals1 no={2} titleModal="Detail Approval">
          <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
                <div className="flex">
                  <div className="w-1/2 flex items-center">
                    <p className="text-black font-semibold text-xl">
                      James Shelby
                    </p>
                  </div>
                  <div className="w-1/2 flex justify-end items-center">
                    <img src={Logo} alt="" width={40} />
                  </div>
                </div>
                <div className="py-5">
                  <p className="text-black font-normal text-md">
                    Januari 31, 2023 - February 1, 2023
                  </p>
                  <p className="text-black font-normal text-md">Sick Leave</p>
                  <p className="text-black font-normal text-md my-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus repudiandae assumenda consequuntur maiores. Alias
                    quaerat ab debitis enim nobis officiis delectus iure
                    voluptates ipsum autem!
                  </p>
                  <div className="flex justify-center w-full">
                    <img src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg" className="w-[50%]"/>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <label 
                  htmlFor="my-modal-2"
                  className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                >
                  Approve
                </label>
              </div>
          </Modals1>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Approval;
