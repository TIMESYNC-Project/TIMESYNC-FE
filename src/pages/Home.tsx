import { AiOutlineMessage } from "react-icons/ai";
import { useState, useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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
interface LocationType {
  city?: string;
  country?: string;
  postal_code?: string;
  state?: string;
  street?: string;
  url_osm?: string;
}
interface SettingsType {
  annual_leave?: number;
  id?: number;
  tolerance?: number;
  working_hour_end?: string;
  working_hour_start?: string;
}
interface AttendancesType {
  attendance?: string;
  attendance_date?: string;
  attendance_status?: string;
  clock_in?: string;
  clock_in_location?: string;
  clock_in_osm?: string;
  clock_out?: string;
  clock_out_location?: string;
  clock_out_osm?: string;
  work_time?: string;
  id?: number;
}
const Home = () => {
  const [attendances, setAttendances] = useState<AttendancesType>({});
  const [presences, setPresences] = useState<PresenceType[]>([]);
  const [setting, setSetting] = useState<SettingsType>({});
  const [location, setLocation] = useState<LocationType>({});
  const [inbox, setInbox] = useState<InboxType[]>([]);
  const [latitut, setLatitut] = useState<number>();
  const [longitut, setLongitut] = useState<number>();
  const [data, setData] = useState<DataType[]>([]);
  const [hari, setHari] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [eror, setEror] = useState<string>("");
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    presencesToday();
    newDate();
    getEmployee();
    getInbox();
    locationMaps();
    getSetting();
    getPresences()
  }, []);

  function newDate() {
    const jam = new Date().toString();
    const tanggal = moment().format("LL");
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date();
    const day = weekday[d.getDay()];
    setHari(day);
    setHour(jam.substring(15, 21));
    setDate(tanggal.substring(0, 27));
  }
  // function for admin
  function getEmployee() {
    axios
      .get(`employees`, {
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
      .get(`presences/total`, {
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

  // function for employee
  async function locationMaps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios
          .get(
            `attendances/location?latitude=${latitude}&longitude=${longitude}`
          )
          .then((res) => {
            const { data } = res.data;
            setLocation(data);
            setLatitut(latitude);
            setLongitut(longitude);
          })
          .catch((err) => {});
      });
    }
  }

  function getSetting() {
    axios
      .get(`setting`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setSetting(data);
      })
      .catch((err) => {});
  }

  function clockIn() {
    axios
      .post(
        `attendances`,
        {
          latitude: latitut?.toString(),
          longitude: longitut?.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        presencesToday();
      })
      .catch((err) => {
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  }

  function clockOut() {
    axios
      .put(
        `attendances`,
        {
          latitude: latitut?.toString(),
          longitude: longitut?.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        presencesToday();
      })
      .catch((err) => {
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  }

  function presencesToday() {
    axios
      .get(`presences`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setAttendances(data);
      })
      .catch((err) => {
        const { data } = err.response;
        const { message } = data;
        setEror(message);
      });
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
            <p className="text-xl">
              {hari}, {date}
            </p>
          </div>
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <GoLocation size={25} />
              <p className="mx-2 capitalize text-black text-center">
                {location.street ? location.street + ", " + "" : ""}{" "}
                {location.state ? location.state + ", " + "" : ""}{" "}
                {location.city ? location.city + ", " + "" : ""}{" "}
                {location.country ? location.country + ", " + "" : ""}
                {location.postal_code ? location.postal_code + "." + "" : ""}
              </p>
            </div>
            <p className="text-black font-semibold text-center mt-5">
              Office Hours
            </p>
            <p className="text-black text-3xl font-bold text-center mt-2">
              {setting.working_hour_start} - {setting.working_hour_end}
            </p>
            <div className="flex justify-center items-center my-7">
              <Button
                id="btn-clockin"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-md hover:bg-navy w-1/6 mx-2"
                label="Clock In"
                onClick={() => clockIn()}
              />
              <Button
                id="btn-clockout"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-md hover:bg-navy w-1/6 mx-2"
                label="Clock out"
                onClick={() => clockOut()}
              />
            </div>
            <hr className="mx-7 my-3 border-[1.5px] border-sky" />
            <div className="my-3 mx-7 flex">
              <div className="w-1/2">
                <p className="text-black text-left font-medium">Logs today</p>
              </div>
              <div className="w-1/2">
                <Link id="btn-see-more" to={"/records"}>
                  <p className="text-black text-right capitalize font-medium">
                    See more..
                  </p>
                </Link>
              </div>
            </div>
            <p className="text-center text-2xl capitalize my-5 font-bold text-gray-400 animate-pulse">
              {eror}
            </p>
            {Object.keys(attendances).length ===
            0 ? null : attendances.clock_in == "" ? null : (
              <FlexyCard>
                <div className="flex">
                  <div className="w-1/3">
                    <p className="text-lg text-black font-semibold">
                      {attendances.clock_in}
                    </p>
                    <p className="text-sm text-black">
                      {attendances.attendance_date}
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-center text-lg text-black font-semibold">
                      clock in
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-right text-lg text-black font-semibold">
                      {attendances.attendance}
                    </p>
                  </div>
                </div>
              </FlexyCard>
            )}
            {Object.keys(attendances).length ===
            0 ? null : attendances.clock_out === "" ? null : (
              <FlexyCard>
                <div className="flex">
                  <div className="w-1/3">
                    <p className="text-lg text-black font-semibold">
                      {attendances.clock_out}
                    </p>
                    <p className="text-sm text-black">
                      {attendances.attendance_date}
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-center text-lg text-black font-semibold">
                      clock out
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-right text-lg text-black font-semibold">
                      {attendances.attendance}
                    </p>
                  </div>
                </div>
              </FlexyCard>
            )}
          </FlexyCard>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Home;
