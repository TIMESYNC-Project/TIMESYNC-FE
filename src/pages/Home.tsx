import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AiOutlineMessage } from "react-icons/ai";
import { useState, useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import { MiniCard, FlexyCard, WrappingCard } from "components/Card";
import Layout from "components/Layout";
import Button from "components/Button";

import {
  EmployeesType,
  InboxType,
  LocationType,
  SettingsType,
  DataRecordsType,
  GrpahType,
} from "utils/Type";

const Home = () => {
  const [attendances, setAttendances] = useState<DataRecordsType>({});
  const [presences, setPresences] = useState<EmployeesType[]>([]);
  const [totalHour, setTotalHour] = useState<GrpahType[]>([]);
  const [totalLate, setTotalLate] = useState<GrpahType[]>([]);
  const [location, setLocation] = useState<LocationType>({});
  const [setting, setSetting] = useState<SettingsType>({});
  const [data, setData] = useState<EmployeesType[]>([]);
  const [inbox, setInbox] = useState<InboxType[]>([]);
  const [longitut, setLongitut] = useState<number>();
  const [latitut, setLatitut] = useState<number>();
  const [hari, setHari] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [eror, setEror] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  // graph start
  ChartJS.register(
    CategoryScale,
    Tooltip,
    LinearScale,
    BarElement,
    Title,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "January",
      },
    },
  };

  const dataGraph = {
    labels: totalHour.map(
      (data) => data.employee_nip + "-" + data.employee_name
    ),
    datasets: [
      {
        label: "Total Hours",
        data: totalHour.map((data) => data.monthly_total_working_hour),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(108, 070, 117)",
          "rgb(045, 087, 044)",
          "rgb(108, 059, 042)",
          "rgb(078, 084, 082)",
          "rgb(254, 000, 000)",
          "rgb(030, 089, 069)",
          "rgb(037, 109, 123)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const dataGraph2 = {
    labels: totalLate.map(
      (data) => data.employee_nip + "-" + data.employee_name
    ),
    datasets: [
      {
        label: "Late",
        data: totalLate.map((data) => data.monthly_total_employee_late),
        backgroundColor: [
          "rgb(217, 080, 048)",
          "rgb(040, 040, 040)",
          "rgb(052, 062, 064)",
          "rgb(106, 095, 049)",
          "rgb(087, 166, 057)",
          "rgb(255, 035, 001)",
          "rgb(203, 208, 204)",
          "rgb(000, 143, 057)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  // graph end

  useEffect(() => {
    if (cookie.role !== "admin") {
      locationMaps();
      getSetting();
      presencesToday();
    }
    if (!cookie.token) {
      navigate("/");
    }
    graphTotalLate();
    graphTotalHour();
    newDate();
    getEmployee();
    getInbox();
    getPresences();
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
  async function getEmployee() {
    await axios
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

  async function getPresences() {
    await axios
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

  async function getInbox() {
    await axios
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

  async function graphTotalHour() {
    await axios
      .get(`graph?type=mtwh&year_month=2023-01&limit=8`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setTotalHour(data);
      })
      .catch((err) => {});
  }

  async function graphTotalLate() {
    await axios
      .get(`graph?type=mtel&year_month=2023-01&limit=8`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setTotalLate(data);
      })
      .catch((err) => {});
  }

  // function for employee
  function locationMaps() {
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

  async function getSetting() {
    await axios
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
          <div className="flex flex-col-reverse xl:flex-row gap-6 xl:gap-0 w-full">
            <div className="w-full xl:w-2/3">
              <div className="grid grid-cols-2 gap-4 xl:gap-0">
                {/* card total employees start */}
                <Link id="card-total-employees" to="/employees">
                  <MiniCard
                    parentSet="h-full"
                    judul="total employees"
                    titleSet="flex justify-center items-center text-sm xl:text-lg h-10"
                  >
                    <p className="text-2xl xl:text-7xl text-black font-bold text-center">
                      {`${data.length}`}
                      <span className="capitalize text-xs xl:text-xl font-normal">
                        person
                      </span>
                    </p>
                  </MiniCard>
                </Link>

                {/* card total employees end */}

                {/* card total presence today start */}
                <MiniCard
                  parentSet="h-full"
                  judul="total presence today"
                  titleSet="justify-center items-center text-center text-sm xl:text-lg h-10"
                >
                  <p className="text-2xl xl:text-7xl text-black font-bold text-center">
                    {`${presences.length}`}
                    <span className="capitalize text-xs xl:text-xl font-normal">
                      person
                    </span>
                  </p>
                </MiniCard>
                {/* card total presence today end */}
              </div>

              {/* graph 1 start */}
              <div className="xl:mx-5 my-5 xl:my-10" id="graph-total-work">
                <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
                  <div className="mx-10 mt-10">
                    <p className="capitalize text-lg font-extrabold text-center">
                      Traffic total working hours by month
                    </p>
                  </div>
                  <hr className="mx-10 my-3 border-[1.5px] border-sky" />
                  <div className={`py-5 px-5`}>
                    <div className="w-full" id="graph-total-work-employee">
                      <Bar
                        className="!h-full !w-full"
                        options={options}
                        data={dataGraph}
                        id="graph-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* graph 1 end */}

              {/* graph 2 start */}
              <div className="xl:mx-5 my-5 xl:my-10" id="grap-total-late">
                <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
                  <div className="mx-10 mt-10">
                    <p className="capitalize text-lg font-extrabold text-center">
                      Traffic total late employees by month
                    </p>
                  </div>
                  <hr className="mx-10 my-3 border-[1.5px] border-sky" />
                  <div className={`pt-5 pb-10 px-5`}>
                    <div className="w-full" id="grap-total-late-employee">
                      <Bar
                        className="!h-full !w-full"
                        options={options}
                        data={dataGraph2}
                        id="graph-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* graph 2 end */}
            </div>
            <div className="xl:w-1/3">
              {/* card employees start */}

              <MiniCard
                parentSet=" overflow-auto h-full mb-4 xl:mb-0"
                judul="employees"
                titleSet="text-center h-fit text-md xl:text-xl"
              >
                {data.slice(0, 10).map((data) => {
                  return (
                    <div
                      className="flex flex-col my-3 mx-6 xl:mx-0"
                      key={data.id}
                    >
                      <Link
                        id={`card-list-employees-${data.id}`}
                        to={`/employee/profile/${data.id}`}
                      >
                        <div className="flex flex-row text-center xl:text-left xl:justify-start">
                          <div className="h-1/2">
                            <img
                              src={data.profile_picture}
                              className="w-8 h-8 xl:w-[40px] xl:h-[40px]  rounded-full"
                            />
                          </div>
                          <div className="flex justify-start items-center mx-2">
                            <p className="text-xs xl:text-lg text-black font-semibold capitalize">
                              {data.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </MiniCard>
              {/* card employees end */}

              {/* card inbox start */}
              <Link id="card-list-inbox" to="/inbox">
                <MiniCard
                  judul="inbox"
                  titleSet="text-center h-fit text-md xl:text-xl"
                >
                  {inbox.slice(0, 7).map((data) => {
                    return (
                      <div
                        className="flex flex-col my-3 mx-6 xl:mx-0"
                        key={data.id}
                      >
                        <div className="flex flex-row justify-start">
                          <div className="h-1/2">
                            <AiOutlineMessage size={25} />
                          </div>
                          <div className="flex justify-start items-center mx-2">
                            <p className="text-xs xl:text-lg text-black font-semibold capitalize">
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
            <p className="text-4xl lg:text-7xl font-bold">{hour}</p>
          </div>
          <div className="flex justify-center">
            <p className="text-sm lg:text-xl">
              {hari}, {date}
            </p>
          </div>
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <GoLocation size={25} />
              <p className="mx-2 capitalize text-black text-center text-sm lg:text-xl">
                {location.street ? location.street + ", " + "" : ""}{" "}
                {location.state ? location.state + ", " + "" : ""}{" "}
                {location.city ? location.city + ", " + "" : ""}{" "}
                {location.country ? location.country + ", " + "" : ""}
                {location.postal_code ? location.postal_code + "." + "" : ""}
              </p>
            </div>
            <p className="text-black font-semibold text-center mt-5 text-sm lg:text-xl">
              Office Hours
            </p>
            <p className="text-black text-2xl lg:text-3xl font-bold text-center mt-2">
              {setting.working_hour_start} - {setting.working_hour_end}
            </p>
            <div className="flex justify-center items-center my-7 gap-4">
              <Button
                id="btn-clockin"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium py-1 lg:py-2 px-3 text-xs md:text-sm hover:bg-navy w-1/6 w-[6rem] md:w-32"
                label="Clock In"
                onClick={() => clockIn()}
              />
              <Button
                id="btn-clockout"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium py-1 lg:py-2 px-3 text-xs md:text-sm hover:bg-navy w-1/6 w-[6rem] md:w-32"
                label="Clock out"
                onClick={() => clockOut()}
              />
            </div>
            <hr className="xl:mx-7 my-3 border-[1.5px] border-sky" />
            <div className="my-3 xl:mx-7 flex">
              <div className="w-1/2">
                <p className="text-black text-sm lg:text-base text-left font-medium">
                  Logs today
                </p>
              </div>
              <div className="w-1/2">
                <Link id="btn-see-more" to={"/records"}>
                  <p className="text-black text-sm lg:text-base text-right capitalize font-medium">
                    See more..
                  </p>
                </Link>
              </div>
            </div>
            <p className="text-center text-base lg:text-2xl capitalize my-5 font-bold text-gray-400 animate-pulse">
              {eror}
            </p>
            {Object.keys(attendances).length ===
            0 ? null : attendances.clock_in == "" ? null : (
              <FlexyCard>
                <div className="flex">
                  <div className="w-1/3">
                    <p className="text-sm lg:text-lg text-black font-semibold">
                      {attendances.clock_in}
                    </p>
                    <p className="text-xs md:text-sm text-black">
                      {attendances.attendance_date}
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-center text-sm lg:text-lg text-black font-semibold">
                      clock in
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-right text-sm lg:text-lg text-black font-semibold">
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
                    <p className="text-sm lg:text-lg text-black font-semibold">
                      {attendances.clock_out}
                    </p>
                    <p className="text-xs lg:text-sm text-black">
                      {attendances.attendance_date}
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-center text-sm lg:text-lg text-black font-semibold">
                      clock out
                    </p>
                  </div>
                  <div className="w-1/3">
                    <p className="capitalize text-right text-sm lg:text-lg text-black font-semibold">
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
