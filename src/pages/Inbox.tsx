import { BsPlusSquare, BsTrash } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { CustomInput, TextArea } from "components/CustomInput";
import { FlexyCard, WrappingCard } from "components/Card";
import Layout from "components/Layout";
import Loader from "components/Loader";

import { CreateInboxType, InboxIdType } from "utils/Type";

const Inbox = () => {
  const [inboxEm, setInboxEm] = useState<CreateInboxType[]>([]);
  const [inbox, setInbox] = useState<CreateInboxType[]>([]);
  const [inboxId, setInboxId] = useState<InboxIdType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [addTitle, setAddtitle] = useState<string>("");
  const [addDesc, setAddDesc] = useState<string>("");
  const [addTo, setAddTo] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  const checkRole = cookie.role;
  const admin = checkRole == "admin";
  const employee = checkRole == "employee";

  useEffect(() => {
    getInbox();
    getInboxEm();
  }, []);

  //function for admin
  function getInbox() {
    setLoading(true);
    axios
      .get(`announcements`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setInbox(data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }

  function getInboxId(id: number) {
    axios
      .get(`announcements/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setId(data.id);
        setInboxId(data);
      })
      .catch((err) => {});
  }

  function addInbox() {
    setLoading(true);
    axios
      .post(
        `announcements`,
        {
          to: addTo,
          announcement_title: addTitle,
          announcement_description: addDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Success add inbox",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            getInbox();
          }
        });
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }

  //function for employee
  function getInboxEm() {
    setLoading(true);
    axios
      .get(`inbox`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setInboxEm(data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }


  function onDelete(id: number) {
    Swal.fire({
      title: "Are you sure want to delete inbox?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`announcements/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Delete successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            getInbox();
          })
          .catch((err) => {});
      }
    });
  }

  return (
    <Layout inboxSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {loading ? (
        <Loader />
      ) : (
        <WrappingCard
          judul="Inbox"
          rightSide={
            admin && (
              <>
                <label id="btn-create-inbox" htmlFor="my-modal-1">
                  <p className="text-sky font-medium duration-300 hover:cursor-pointer active:scale-90">
                    <BsPlusSquare size={30} />
                  </p>
                </label>
                <input
                  type="checkbox"
                  id="my-modal-1"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky w-full">
                    <form onSubmit={addInbox}>
                      <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                        Create Inbox
                      </p>
                      <div className="flex justify-center gap-5">
                        <div className="flex flex-col gap-5">
                          <p className="py-3 text-black">To:</p>
                          <p className="py-3 text-black">Title:</p>
                          <p className="py-3 text-black">Message:</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <CustomInput
                            id="input-inbox-receiver"
                            type="text"
                            placeholder="Type receiver's NIP"
                            className="input input-bordered input-md w-60 md:w-72 lg:w-80 max-w-xs border-2 border-sky text-black"
                            onChange={(e) => setAddTo(e.target.value)}
                          />
                          <CustomInput
                            id="input-inbox-title"
                            type="text"
                            placeholder="Type message title"
                            className="input input-bordered input-md w-60 md:w-72 lg:w-80 max-w-xs border-2 border-sky text-black"
                            onChange={(e) => setAddtitle(e.target.value)}
                          />
                          <TextArea
                            id="input-inbox-message"
                            placeholder="Type broadcast message"
                            className="input input-bordered input-sm h-40 w-60 md:w-72 lg:w-80 max-w-xs border-2 border-sky text-black"
                            onChange={(e) => setAddDesc(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="modal-action">
                        <button
                          disabled={loading}
                          id="btn-inbox-submit"
                          type="submit"
                          className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                          Submit
                        </button>
                        <label
                          id="btn-inbox-cancel"
                          htmlFor={`${loading ? "" : "my-modal-1"}`}
                          className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                          Cancel
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )
          }
        >
          {admin &&
            inbox.map((data) => (
              <div className="flex justify-center gap-4" key={data.id}>
                <FlexyCard parentSet="w-full">
                  <div
                    className="flex justify-between gap-2 items-center"
                    id={`card-inbox-${data.id}-${data.id}`}
                  >
                    <label
                      id={`btn-detail-${data.id}`}
                      htmlFor="my-modal-3"
                      onClick={() => getInboxId(data.id)}
                    >
                      <div className="flex justify-between duration-300 hover:cursor-pointer active:scale-95 gap-2">
                        <p className="flex items-center text-black capitalize">
                          {new Date(`${data.created_at}`)
                            .toString()
                            .substring(3, 15)}
                        </p>
                        <div className="flex flex-col w-44 md:w-[18rem] lg:w-[35rem] xl:w-[40rem]">
                          <p className="text-black capitalize font-extrabold">
                            {data.announcement_title}
                          </p>
                          <p className="">
                            {data.announcement_description.substring(0, 60) +
                              "..."}
                          </p>
                        </div>
                      </div>
                    </label>
                    {admin && (
                      <p
                        className="text-sky hover:text-red-600 duration-300 hover:cursor-pointer active:scale-90"
                        id={`btn-delete-${data.id}`}
                      >
                        <BsTrash size={27} onClick={() => onDelete(data.id)} />
                      </p>
                    )}
                  </div>
                </FlexyCard>
              </div>
            ))}
          {employee &&
            inboxEm.map((data) => (
              <div
                className="flex justify-center gap-4"
                key={data.id}
                id={`card-inbox-${data.id}`}
              >
                <FlexyCard parentSet="w-full">
                  <div className="flex items-center">
                    <label
                      id={`btn-detail-${data.id}`}
                      htmlFor="my-modal-3"
                      onClick={() => getInboxId(data.id)}
                    >
                      <div className="flex justify-center w-full gap-2 duration-300 hover:cursor-pointer active:scale-95">
                        <div className="flex justify-center w-20 items-center">
                          <p className="text-black capitalize">
                            {new Date(`${data.created_at}`)
                              .toString()
                              .substring(3, 15)}
                          </p>
                        </div>
                        <div className="flex flex-col w-48 md:w-72 xl:w-[35rem]">
                          <p className="text-black capitalize font-extrabold w-full">
                            {data.announcement_title}
                          </p>
                          <p className="w-full">
                            {data.announcement_description.substring(0, 65) +
                              "..."}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </FlexyCard>
              </div>
            ))}
        </WrappingCard>
      )}

      {/* Modal Inbox Detail Start */}
      <>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box border-2 border-sky flex flex-col justify-center ">
            <form>
              <p className="mb-5 pb-2 text-2xl border-b-2 font-bold text-black">
                Detail Inbox
              </p>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex">
                  <p>
                    {new Date(`${inboxId.created_at}`)
                      .toString()
                      .substring(3, 15)}
                  </p>
                </div>
                <p className="font-extrabold">{inboxId.announcement_title}</p>
                <p className="text-justify">
                  {inboxId.announcement_description}
                </p>
              </div>
              <div className="modal-action">
                <label
                  id={`btn-close-${id}`}
                  htmlFor="my-modal-3"
                  className="w-28 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                >
                  Close
                </label>
              </div>
            </form>
          </div>
        </div>
      </>
      {/* Modal Inbox Detail End */}

      {/* Modal Inbox Detail Start */}

      <>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box border-2 border-sky flex flex-col justify-center ">
            <form>
              <p className="mb-5 pb-2 text-2xl border-b-2 font-bold text-black">
                Detail Inbox
              </p>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex">
                  <p>
                    {new Date(`${inboxId.created_at}`)
                      .toString()
                      .substring(3, 15)}
                  </p>
                </div>
                <p className="font-extrabold">{inboxId.announcement_title}</p>
                <p className="text-justify">
                  {inboxId.announcement_description}
                </p>
              </div>
              <div className="modal-action">
                <label
                  id={`btn-close-${id}`}
                  htmlFor="my-modal-3"
                  className="w-28 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                >
                  Close
                </label>
              </div>
            </form>
          </div>
        </div>
      </>
      {/* Modal Inbox Detail End */}
    </Layout>
  );
};

export default Inbox;
