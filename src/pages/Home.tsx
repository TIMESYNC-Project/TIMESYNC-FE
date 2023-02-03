import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { GoLocation } from "react-icons/go";
import { AiOutlineMessage } from "react-icons/ai";

import { MiniCard, FlexyCard, WrappingCard } from "components/Card";
import Layout from "components/Layout";
import moment from "moment";
import Button from "components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const [cookie, setCookie] = useCookies();
  const [hour, setHour] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    newDate();
  }, []);

  function newDate() {
    const jam = new Date().toString();
    const tanggal = moment().format("LLLL");
    setHour(jam.substring(15, 21));
    setDate(tanggal.substring(0, 27));
  }
  console.log(date);

  return (
    <Layout homeSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {cookie.role === "admin" ? (
        <WrappingCard judul="Dashboard">
          <div className="flex">
            <div className="w-2/3">
              <div className="grid grid-cols-2">
                {/* card total employees start */}
                <MiniCard
                  judul="total employees"
                  titleSet="text-center text-lg"
                >
                  <p className="text-7xl text-black font-bold text-center">
                    8{" "}
                    <span className="capitalize text-xl font-normal">
                      person
                    </span>
                  </p>
                </MiniCard>
                {/* card total employees end */}

                {/* card total presence today start */}
                <MiniCard
                  judul="total presence today"
                  titleSet="text-center text-lg"
                >
                  <p className="text-7xl text-black font-bold text-center">
                    8{" "}
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
              <MiniCard judul="employees" titleSet="text-center text-xl">
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <img
                        src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                        className="w-[40px] h-[40px]  rounded-full"
                      />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        james shelby
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <img
                        src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                        className="w-[40px] h-[40px]  rounded-full"
                      />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        james shelby
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <img
                        src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                        className="w-[40px] h-[40px]  rounded-full"
                      />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        james shelby
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <img
                        src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                        className="w-[40px] h-[40px]  rounded-full"
                      />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        james shelby
                      </p>
                    </div>
                  </div>
                </div>
              </MiniCard>
              {/* card employees end */}

              {/* card inbox start */}
              <MiniCard judul="inbox" titleSet="text-center text-xl">
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <AiOutlineMessage size={25} />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        HUT RI
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <AiOutlineMessage size={25} />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        hari raya idul fitri
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <AiOutlineMessage size={25} />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        hari raya idul adha
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <div className="flex flex-row justify-start">
                    <div className="h-1/2">
                      <AiOutlineMessage size={25} />
                    </div>
                    <div className="flex justify-start items-center mx-2">
                      <p className="text-xl text-black font-bold capitalize">
                        james shelby
                      </p>
                    </div>
                  </div>
                </div>
              </MiniCard>
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
                label="Clock In"
                buttonSet="w-1/6 mx-2 hover:bg-navy"
                onClick={() => setCookie("role", "admin")}
              />
              <Button
                label="Clock out"
                buttonSet="w-1/6 mx-2 hover:bg-navy"
                // onClick={}
              />
            </div>
            <hr className="mx-7 my-3 border-[1.5px] border-sky" />
            <div className="my-3 mx-7 flex">
              <div className="w-1/2">
                <p className="text-black text-left">Logs today</p>
              </div>
              <div className="w-1/2">
                <Link to={"/"}>
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
