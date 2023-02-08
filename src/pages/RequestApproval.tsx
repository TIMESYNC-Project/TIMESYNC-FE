import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import { CardWithLogo, WrappingCard } from "components/Card";
import { TextArea } from "components/CustomInput";
import Button from "components/Button";
import Layout from "components/Layout";
import { useCookies } from "react-cookie";

const RequestApproval = () => {
  const [addTitle, setAddTitle] = useState<string>("");
  const [addStart, setAddStart] = useState<string>("");
  const [addEnd, setAddEnd] = useState<string>("");
  const [addDesc, setAddDesc] = useState<string>("");
  const [addImg, setAddImg] = useState<any>();
  const [date, setDate] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    newDate();
  }, []);

  function newDate() {
    const tanggal = moment().format();
    setDate(tanggal.substring(0, 10));
  }

  function reqApproval(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("approval_title", addTitle);
    formData.append("approval_start_date", addStart);
    formData.append("approval_end_date", addEnd);
    formData.append("approval_description", addDesc);
    formData.append("approval_image", addImg);
    axios
      .post(`approvals`, formData, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        console.log("yey: ", res);
        const { message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/approval");
      })
      .catch((err) => {
        console.log("nay", err);
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  }
  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Request Approval"
        rightSide={
          <>
            <Button
              id="btn-back"
              buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs hover:bg-navy w-1/4"
              label="Back"
              onClick={() => navigate(-1)}
            />
          </>
        }
      >
        <CardWithLogo>
          <form onSubmit={reqApproval}>
            <select
              id="select-approval-type"
              name="approval-type"
              className="select select-bordered border-sky w-1/3"
              onChange={(e) => setAddTitle(e.target.value)}
            >
              <option id="option-approval-type" value="">
                Approval Type
              </option>
              <option id="option-annual-leave" value="Annual Leave">
                Annual Leave
              </option>
              <option id="option-on-leave" value="On Leave">
                On Leave
              </option>
              <option id="option-sick-leave" value="Sick Leave">
                Sick Leave
              </option>
            </select>
            <div className="flex my-5">
              <input
                id="input-start-date"
                type="date"
                min={date}
                className="input input-bordered border-sky mr-5 w-1/3"
                onChange={(e) => setAddStart(e.target.value)}
              />
              <input
                id="input-end-date"
                type="date"
                min={addStart}
                className="input input-bordered border-sky mr-5 w-1/3"
                onChange={(e) => setAddEnd(e.target.value)}
              />
            </div>
            <TextArea
              id="input-description"
              parentSet="my-5"
              inputSet="textarea textarea-bordered border-sky h-48"
              placeholder="Description"
              onChange={(e) => setAddDesc(e.target.value)}
            />
            <input
              id="input-picture"
              type="file"
              className="file-input file-input-bordered w-full border-1 border-sky max-w-xs file:bg-sky file:border-none file:capitalize file:text-md text-base"
              onChange={(e) => setAddImg(e.target.files?.[0])}
            />
            <div className="flex justify-end">
              <Button
                id="btn-submit"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-md hover:bg-navy w-1/4 my-5"
                label="Submit"
                type="submit"
              />
            </div>
          </form>
        </CardWithLogo>
      </WrappingCard>
    </Layout>
  );
};

export default RequestApproval;
