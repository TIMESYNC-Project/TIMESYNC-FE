import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { FlexyCard, WrappingCard } from "components/Card";
import { Modals1, Modals2 } from "components/Modals";
import Button from "components/Button";
import Layout from "components/Layout";
import Logo from "assets/logo.png";
import index from "routes";

interface ApprovalType {
  id: number;
  employee_name: string;
  created_at: string;
  approval_title: string;
  approval_status: string;
  approval_start_date: string;
  approval_end_date: string;
  approval_image: string;
}

const Approval = () => {
  const [attendance, setAttendance] = useState<string[]>([]);
  const [approvalsData, setApprovalsData] = useState<ApprovalType[]>([]);
  const [color, setColor] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    getApproval();
  }, []);

  function getApproval() {
    {
      cookie.role === "admin" &&
        axios
          .get(`approvals`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((res) => {
            const { data } = res.data;
            setApprovalsData(data);
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    {
      cookie.role === "employee" &&
        axios
          .get(`employee/approvals`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((res) => {
            const { data } = res.data;
            setApprovalsData(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white ">
      {cookie.role === "admin" ? (
        <WrappingCard judul="Approval Requests">
          {approvalsData.map((data) => {
            return (
              <FlexyCard parentSet="active:scale-95" key={data.id}>
                <label
                  htmlFor="my-modal-1"
                  // modals klo approve or reject button ganti cancel
                  // data.approval_status === "rejected" || data.approval_status === "approved"? undefined : "my-modal-1"
                  id={`btn-approval-detail-${data.id}`}
                >
                  <div className="flex justify-center items-center w-full hover:cursor-pointer">
                    <div className="text-center w-1/4">
                      <p className="text-black capitalize font-semibold">
                        {data.created_at}
                      </p>
                    </div>
                    <div className="text-center w-1/4">
                      <p className="text-black capitalize font-medium">
                        {data.employee_name}
                      </p>
                    </div>
                    <div className="text-center w-1/4">
                      <p className="text-black capitalize font-medium">1 day</p>
                      <p className="text-black capitalize font-medium">
                        {data.approval_title}
                      </p>
                    </div>
                    <div className="text-center w-1/4">
                      <p
                        className={`${
                          data.approval_status === "rejected"
                            ? "text-red-500"
                            : "text-orange-500" &&
                              data.approval_status === "approved"
                            ? "text-green-500"
                            : "text-orange-500"
                        } capitalize font-bold`}
                      >
                        {data.approval_status}
                      </p>
                    </div>
                  </div>
                </label>
              </FlexyCard>
            );
          })}

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
                    <img
                      src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                      className="w-[50%]"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <button
                  id={`btn-reject-modals`}
                  type="submit"
                  className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-white font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                >
                  Reject
                </button>
                <button
                  id={`btn-approve-modals`}
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
                id="btn-request-approval"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs hover:bg-navy w-1/3"
                label="Request Approval"
                onClick={() => navigate("/approval/request")}
              />
            </>
          }
        >
          {approvalsData.map((data) => {
            return (
              <FlexyCard parentSet="active:scale-95" key={data.id}>
                <label
                  htmlFor="my-modal-2"
                  id={`btn-detail-approval-${data.id}`}
                >
                  <div className="flex justify-center items-center w-full">
                    <div className="text-start w-1/3 mx-5">
                      <p className="text-black capitalize font-semibold">
                        {data.approval_end_date}
                      </p>
                    </div>
                    <div className="text-center w-1/3 mx-5">
                      <p className="text-black capitalize font-medium">1 day</p>
                      <p className="text-black capitalize font-medium">
                        {data.approval_title}
                      </p>
                    </div>
                    <div className="text-end w-1/3 mx-5">
                      <p
                        className={`${
                          data.approval_status === "rejected"
                            ? "text-red-500"
                            : "text-orange-500" &&
                              data.approval_status === "approved"
                            ? "text-green-500"
                            : "text-orange-500"
                        } capitalize font-bold`}
                      >
                        {data.approval_status}
                      </p>
                    </div>
                  </div>
                </label>
              </FlexyCard>
            );
          })}

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
                  <img
                    src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                    className="w-[50%]"
                  />
                </div>
              </div>
            </div>
            <div className="modal-action">
              <label
                id={`btn-close-modals`}
                htmlFor="my-modal-2"
                className="w-24 text-sm text-center border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-navy  active:scale-90"
              >
                Close
              </label>
            </div>
          </Modals1>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Approval;
