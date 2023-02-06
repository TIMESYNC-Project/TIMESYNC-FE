import { AiOutlineMessage } from "react-icons/ai";
import { useState, useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { MiniCard, FlexyCard, WrappingCard } from "components/Card";
import Layout from "components/Layout";
import Button from "components/Button";

interface DataType {
  id: number;
  name: string;
  nip: string;
  position: string;
  profile_picture: string;
}
interface PresenceType {
  id: number;
  name: string;
  nip: string;
  position: string;
  profile_picture: string;
}
interface InboxType {
  id: number;
  announcement_title: string;
  announcement_description: string;
}

const Home = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [presences, setPresences] = useState<PresenceType[]>([]);
  const [inbox, setInbox] = useState<InboxType[]>([]);
  const [hour, setHour] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    newDate();
    getEmployee();
    getInbox();
  }, []);

  function newDate() {
    const jam = new Date().toString();
    const tanggal = moment().format("LLLL");
    setHour(jam.substring(15, 21));
    setDate(tanggal.substring(0, 27));
  }

  function getEmployee() {
    axios
      .get(`https://shirayuki.site/employees`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {});
  }

  function getPresences() {
    axios
      .get(`https://shirayuki.site/presences`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setPresences(data);
      })
      .catch((err) => {});
  }

  function getInbox() {
    axios
      .get(`https://shirayuki.site/announcements`, {
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
    <Layout homeSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {cookie.role === "admin" ? (
        <WrappingCard judul="Dashboard">
          <div className="flex">
            <div className="w-2/3">
              <div className="grid grid-cols-2">
                {/* card total employees start */}
                <Link id="card-total-employees" to="/employees">
                  <MiniCard
                    judul="total employees"
                    titleSet="text-center text-lg"
                  >
                    <p className="text-7xl text-black font-bold text-center">
                      {`${data.length}`}
                      <span className="capitalize text-xl font-normal">
                        person
                      </span>
                    </p>
                  </MiniCard>
                </Link>

                {/* card total employees end */}

                {/* card total presence today start */}
                <MiniCard
                  judul="total presence today"
                  titleSet="text-center text-lg"
                >
                  <p className="text-7xl text-black font-bold text-center">
                    {`${presences.length}`}
                    <span className="capitalize text-xl font-normal">
                      person
                    </span>
                  </p>
                </MiniCard>
                {/* card total presence today end */}
              </div>

              {/* graph 1 start */}
              <div className="mx-20 my-10">
                <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
                  <div className="mx-10 mt-10">
                    <p className="capitalize text-lg font-extrabold text-center">
                      Traffic total working hours by weekly
                    </p>
                  </div>
                  <hr className="mx-10 my-3 border-[1.5px] border-sky" />
                  <div className={`pt-5 pb-10 px-5`}>Tabelll</div>
                </div>
              </div>
              {/* graph 1 end */}

              {/* graph 2 start */}
              <div className="mx-20 my-10">
                <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
                  <div className="mx-10 mt-10">
                    <p className="capitalize text-lg font-extrabold text-center">
                      Traffic total late employees by weekly
                    </p>
                  </div>
                  <hr className="mx-10 my-3 border-[1.5px] border-sky" />
                  <div className={`pt-5 pb-10 px-5`}>Tabelll</div>
                </div>
              </div>
              {/* graph 2 end */}
            </div>
            <div className="w-1/3">
              {/* card employees start */}
              <Link id="card-list-employees" to="/employees">
                <MiniCard judul="employees" titleSet="text-center text-xl">
                  {data.slice(0, 5).map((data) => {
                    return (
                      <div className="flex flex-col my-3" key={data.id}>
                        <div className="flex flex-row justify-start">
                          <div className="h-1/2">
                            <img
                              src={data.profile_picture}
                              className="w-[40px] h-[40px]  rounded-full"
                            />
                          </div>
                          <div className="flex justify-start items-center mx-2">
                            <p className="text-xl text-black font-bold capitalize">
                              {data.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </MiniCard>
              </Link>
              {/* card employees end */}

              {/* card inbox start */}
              <Link id="card-list-inbox" to="/inbox">
                <MiniCard judul="inbox" titleSet="text-center text-xl">
                  {inbox.slice(0, 5).map((data) => {
                    return (
                      <div className="flex flex-col my-3" key={data.id}>
                        <div className="flex flex-row justify-start">
                          <div className="h-1/2">
                            <AiOutlineMessage size={25} />
                          </div>
                          <div className="flex justify-start items-center mx-2">
                            <p className="text-xl text-black font-bold capitalize">
                              {data.announcement_title}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </MiniCard>
              </Link>
              {/* card inbox end */}
            </div>
          </div>
        </WrappingCard>
      ) : (
        <WrappingCard judul="Attendance">
          <div className="flex justify-center">
            <p className="text-7xl font-bold">{hour}</p>
          </div>
          <div className="flex justify-center">
            <p className="text-xl">{date}</p>
          </div>
          <FlexyCard>
            <div className="flex justify-center items-center">
              <GoLocation />
              <p className="mx-2 capitalize text-black">
                Jl. Jalandikuburan No.13, Duren Sawit, Jakarta Timur
              </p>
            </div>
            <p className="text-black font-semibold text-center mt-5">
              Office Hours
            </p>
            <p className="text-black text-3xl font-bold text-center mt-2">
              08.00 - 17.00
            </p>
            <div className="flex justify-center items-center my-7">
              <Button
                id="btn-clockin"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-md hover:bg-navy w-1/6 mx-2"
                label="Clock In"
                onClick={() => setCookie("role", "admin")}
              />
              <Button
                id="btn-clockout"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-md hover:bg-navy w-1/6 mx-2"
                label="Clock out"
                // onClick={() => setCookie("role", "admin")}
              />
            </div>
            <hr className="mx-7 my-3 border-[1.5px] border-sky" />
            <div className="my-3 mx-7 flex">
              <div className="w-1/2">
                <p className="text-black text-left">Logs today</p>
              </div>
              <div className="w-1/2">
                <Link id="btn-see-more" to={"/records"}>
                  <p className="text-black text-right capitalize">See more..</p>
                </Link>
              </div>
            </div>
            <FlexyCard>
              <div className="flex">
                <div className="w-1/3">
                  <p className="text-lg text-black font-semibold">07.40</p>
                  <p className="text-sm text-black">Jan 21</p>
                </div>
                <div className="w-1/3">
                  <p className="capitalize text-center text-lg text-black font-semibold">
                    clock in
                  </p>
                </div>
                <div className="w-1/3">
                  <p className="capitalize text-right text-lg text-black font-semibold">
                    Presence
                  </p>
                </div>
              </div>
            </FlexyCard>
            <FlexyCard>
              <div className="flex">
                <div className="w-1/3">
                  <p className="text-lg text-black font-semibold">17.40</p>
                  <p className="text-sm text-black">Jan 21</p>
                </div>
                <div className="w-1/3">
                  <p className="capitalize text-center text-lg text-black font-semibold">
                    clock out
                  </p>
                </div>
                <div className="w-1/3">
                  <p className="capitalize text-right text-lg text-black font-semibold">
                    Presence
                  </p>
                </div>
              </div>
            </FlexyCard>
          </FlexyCard>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Home;
