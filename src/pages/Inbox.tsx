import { BsPlusSquare, BsTrash } from "react-icons/bs";
import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

import { CustomInput, TextArea } from "components/CustomInput";
import { FlexyCard, WrappingCard } from "components/Card";
import Layout from "components/Layout";

interface InboxType {
  id: number;
  announcement_title: string;
  announcement_description: string;
  created_at: string
}

const Inbox = () => {
  const [inbox, setInbox] = useState<InboxType[]>([])
  const [cookie, setCookie] = useCookies();
  const checkRole = cookie.role;
  const admin = checkRole == "admin";

  useEffect(() => {
    getInbox()
  }, [])
  
  function getInbox() {
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
      .catch((err) => {});
  }

  return (
    <Layout inboxSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Inbox"
        rightSide={
          admin && (
            <form>
              <label id="btn-create-inbox" htmlFor="my-modal-1">
                <p className="text-sky font-medium duration-300 hover:cursor-pointer active:scale-90">
                  <BsPlusSquare size={35} />
                </p>
              </label>
              <input type="checkbox" id="my-modal-1" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
                  <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                    Create Inbox
                  </p>
                  <div className="flex justify-center gap-5">
                    <div className="flex flex-col gap-5">
                      <p className="py-3">To:</p>
                      <p className="py-3">Title:</p>
                      <p className="py-3">Message:</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <CustomInput
                        id="input-inbox-receiver"
                        type="text"
                        placeholder="Type receiver's NIP"
                        className="input input-bordered input-md w-80 max-w-xs border-2 border-sky"
                      />
                      <CustomInput
                        id="input-inbox-title"
                        type="text"
                        placeholder="Type message title"
                        className="input input-bordered input-md w-80 max-w-xs border-2 border-sky"
                      />
                      <TextArea
                        id="input-inbox-message"
                        placeholder="Type broadcast message"
                        className="input input-bordered input-sm h-40 w-80 max-w-xs border-2 border-sky"
                      />
                    </div>
                  </div>
                  <div className="modal-action">
                    <button
                      id="btn-inbox-submit"
                      type="submit"
                      className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                    >
                      Submit
                    </button>
                    <label
                      id="btn-inbox-cancel"
                      htmlFor="my-modal-1"
                      className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </form>
          )
        }
      >
        {inbox.map((data) => (
          <div className="flex justify-center gap-4" >
            <FlexyCard parentSet="w-fit mx-0">
              <div className="flex items-center">
                <label id={`btn-detail-${data.id}`} htmlFor="my-modal-3">
                  <div className="flex justify-center w-full gap-5 duration-300 hover:cursor-pointer active:scale-95">
                    <div className="flex justify-center w-1/5">
                      <p className="text-black capitalize">{moment(`${data.created_at}`).format('LL')}</p>
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="text-black capitalize font-extrabold">
                        {data.announcement_title}
                      </p>
                      <p className="w-[35rem]">{data.announcement_description.substring(0, 75)+"..."}</p>
                    </div>
                  </div>
                </label>
                {admin && (
                  <label id={`btn-delete-${data.id}`} htmlFor="my-modal-2">
                    <p className="text-red-600 duration-300 hover:cursor-pointer active:scale-90">
                      <BsTrash size={30} />
                    </p>
                  </label>
                )}
              </div>
            </FlexyCard>

            <form>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-2 border-sky flex flex-col justify-center ">
                  <p className="mb-5 pb-2 text-2xl border-b-2 font-bold text-black">
                    Detail Inbox
                  </p>
                  <div className="flex flex-col justify-center gap-5">
                    <p>Jan 23, 2023</p>
                    <p className="font-extrabold">HUT RI</p>
                    <p className="text-justify">
                      Dalam rangka memperingati Hari Ulang Tahun Republik
                      Indonesia yang ke 1000 tahun, kita semua libur setahun!
                      Dalam rangka memperingati Hari Ulang Tahun Republik
                      Indonesia yang ke 1000 tahun, kita semua libur setahun!
                      Dalam rangka memperingati Hari Ulang Tahun Republik
                      Indonesia yang ke 1000 tahun, kita semua libur setahun!
                    </p>
                  </div>
                  <div className="modal-action">
                    <label
                      id={`btn-close-${data.id}`}
                      htmlFor="my-modal-3"
                      className="w-28 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                    >
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </form>

            <form>
              <input type="checkbox" id="my-modal-2" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
                  <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                    Delete Message
                  </p>
                  <div className="flex justify-center gap-5">
                    <p>Are you sure?</p>
                  </div>
                  <div className="modal-action">
                    <button
                      id={`btn-delete-confirm-${data.id}`}
                      type="submit"
                      className="w-28 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                    >
                      Yes, delete it.
                    </button>
                    <label
                      id={`btn-delete-cancel-${data.id}`}
                      htmlFor="my-modal-2"
                      className="w-28 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                    >
                      No, cancel it.
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ))}
      </WrappingCard>
    </Layout>
  );
};

export default Inbox;
