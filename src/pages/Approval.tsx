import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useCookies } from "react-cookie";

import { FlexyCard, WrappingCard } from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";

const Approval = () => {  
  const [attendance, setAttendance] = useState<string>("approved");
  const [color, setColor] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate()

  useEffect(() => {
    textColor();
  }, []);

  function textColor() {
    if (attendance === "pending") setColor("text-orange-500");
    if (attendance === "rejected") setColor("text-red-500");
    if (attendance === "approved") setColor("text-green-500");
  }
  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {cookie.role === "admin" ? (
        <WrappingCard judul="Approval Requests">
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
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
                <p className="text-black capitalize font-medium">sick leave</p>
              </div>
              <div className="text-center w-1/4">
                <p className={`${color} capitalize font-bold`}>{attendance}</p>
              </div>
            </div>
          </FlexyCard>
        </WrappingCard>
      ) : (
        <WrappingCard
          judul="Approval"
          rightSide={
            <>
              <Button
                label="Request Approval"
                buttonSet="shadow-xl rounded-xl text-white"
                onClick={() => navigate('/approval/request')}
              />
            </>
          }
        >
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
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Approval;
