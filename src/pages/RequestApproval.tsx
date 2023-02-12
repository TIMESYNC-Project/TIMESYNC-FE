import React, { useState, useEffect } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import { CardWithLogo, WrappingCard } from "components/Card";
import { TextArea } from "components/CustomInput";
import Button from "components/Button";
import Layout from "components/Layout";
import Loader from "components/Loader";

const RequestApproval = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<string>("");
  const [addStart, setAddStart] = useState<string>("");
  const [addDesc, setAddDesc] = useState<string>("");
  const [addEnd, setAddEnd] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [addImg, setAddImg] = useState<any>();
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    newDate();
  }, []);

  useEffect(() => {
    if (addTitle && addStart && addEnd && addDesc) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [addTitle, addStart, addEnd, addDesc]);

  function newDate() {
    const tanggal = moment().format();
    setDate(tanggal.substring(0, 10));
    console.log(date);
  }

  //function for employee
  function reqApproval(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
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
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {loading ? (
        <Loader />
      ) : (
        <WrappingCard
          judul="Request Approval"
          rightSide={
            <>
              <Button
                id="btn-back"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-1 px-3 py-1 lg:py-2 text-xs hover:bg-navy"
                label="Back"
                icon={<IoReturnUpBack size={20} />}
                onClick={() => navigate(-1)}
              />
            </>
          }
        >
          <CardWithLogo>
            <form onSubmit={reqApproval}>
              <p className="text-xs lg:text-base">Approval Type: </p>
              <div className="flex gap-2 items-center">
                <select
                  id="select-approval-type"
                  name="approval-type"
                  className="select select-bordered text-xs lg:text-base border-sky"
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
              </div>

              <p className="text-xs lg:text-base mt-5">
                Date Range: (start - end)
              </p>
              <div className="flex gap-2 items-center">
                <input
                  id="input-start-date"
                  type="date"
                  min={date}
                  max={addEnd ? addEnd : undefined}
                  className="input input-bordered border-sky text-xs lg:text-base"
                  onChange={(e) => setAddStart(e.target.value)}
                />
                <p>-</p>
                <input
                  id="input-end-date"
                  type="date"
                  min={addStart ? addStart : date}
                  className="input input-bordered border-sky text-xs lg:text-base"
                  onChange={(e) => setAddEnd(e.target.value)}
                />
              </div>

              <TextArea
                id="input-description"
                parentSet="my-5"
                inputSet="my-5 textarea textarea-bordered border-sky h-48 text-sm lg:text-base"
                placeholder="Description"
                onChange={(e) => setAddDesc(e.target.value)}
              />
              <input
                id="input-picture"
                type="file"
                accept="image/png, image/jpeg"
                className="file-input file-input-bordered w-full border-1 border-sky max-w-xs file:bg-sky file:border-none file:capitalize file:text-xs text-xs lg:file:text-base lg:text-base file:w-20 lg:file:w-fit disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                onChange={(e) => setAddImg(e.target.files?.[0])}
              />
              <div className="flex justify-end mt-3">
                <Button
                  id="btn-submit"
                  buttonSet="border-2 border-white shadow-md rounded-full capitalize font-medium gap-2 px-5 py-1 text-sm tracking-tighter lg:tracking-normal lg:text-base hover:bg-navy my-5 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                  label="Submit"
                  type="submit"
                  disabled={disabled || loading}
                />
              </div>
            </form>
          </CardWithLogo>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default RequestApproval;
