import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { CardWithLogo, WrappingCard } from "components/Card";
import { TextArea } from "components/CustomInput";
import Button from "components/Button";
import Layout from "components/Layout";

const RequestApproval = () => {
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    newDate();
  }, []);

  function newDate() {
    const tanggal = moment().format();
    setDate(tanggal.substring(0, 10));
  }

  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Request Approval"
        rightSide={
          <>
            <Button
              buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs hover:bg-navy w-1/4"
              label="Back"
              onClick={() => navigate(-1)}
            />
          </>
        }
      >
        <CardWithLogo>
          <form>
            <select
              name="approval-type"
              id=""
              className="select select-bordered border-sky w-1/3"
              // onChange={()=>}
            >
              <option value="">Approval Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="On Leave">On Leave</option>
              <option value="Sick Leave">Sick Leave</option>
            </select>
            <div className="flex my-5">
              <input
                type="date"
                min={date}
                className="input input-bordered border-sky mr-5 w-1/3"
              />
              <input
                type="date"
                min={date}
                className="input input-bordered border-sky mr-5 w-1/3"
              />
            </div>
            <TextArea
              parentSet="my-5"
              inputSet="textarea textarea-bordered border-sky h-48"
              placeholder="Description"
            />
            <input
              type="file"
              className="file-input file-input-bordered w-full border-1 border-sky max-w-xs file:bg-sky file:border-none file:capitalize file:text-md text-base"
            />
            <div className="flex justify-end">
              <Button
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-md hover:bg-navy w-1/4 my-5"
                label="Submit"
                type="submit"
                // onClick={() => setCookie("role", "admin")}
              />
            </div>
          </form>
        </CardWithLogo>
      </WrappingCard>
    </Layout>
  );
};

export default RequestApproval;
