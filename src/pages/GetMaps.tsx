import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "components/Navbar";
import Button from "components/Button";
import { CustomInput, TextArea } from "components/CustomInput";
import Layout from "components/Layout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function App() {
  const [latitut, setLatitut] = useState<any>();
  const [longitut, setLongitut] = useState<any>();
  const [dropDown, setDropDown] = useState<string>("");
  const [input, setinput] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [passType, setPassType] = useState<string>("password");
  const [date, setDate] = useState<string>("");

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
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
        text: "Chart.js Bar Chart",
      },
    },
  };
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => 1),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    tryMaps();
    newDate();
  }, []);

  async function tryMaps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios
          .get(
            `https://shirayuki.site/attendances/location?latitude=${latitude}&longitude=${longitude}`
            // `https://localhost:8000/location?latitude=${latitude}&longitude=${longitude}`
          )
          .then((res) => {
            console.log(res);
            // absen();
            // setLatitut(latitude);
            // setLongitut(longitude);
          })
          .catch((err) => {
            console.log(err);
            // setLatitut(latitude);
            // setLongitut(longitude);
          });
      });
    }
  }
  function reverseMaps() {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=-6.2322&lon=106.9152&limit=2&appid=4a2c7eb362f0df3bf5eef694fc682f66`
      )
      .then((res) => {
        console.log("hasil reverse", res);
      })
      .catch((err) => {
        console.log("err  reverse: ", err);
      });
  }

  console.log(latitut);
  console.log(longitut);

  function absen() {
    const body = {
      longitude: longitut,
      latitude: latitut,
    };
    const config = {
      headers: {
        Authorization: `Bearer token`,
      },
    };
    axios
      .post("https://shirayuki.site/absen", body, config)
      .then((res) => {})
      .catch((err) => {});
  }
  function tooglePass() {
    if (passType === "password") {
      setPassType("text");
    }
    if (passType === "text") {
      setPassType("password");
    }
  }

  function newDate() {
    const tanggal = moment().format();
    setDate(tanggal.substring(0, 10));
  }
  console.log(date);

  // Waktu satu hari dalam ms (millisecond)
  const one_day = 1000 * 60 * 60 * 24;

  // atur tanggal_sekarang ke dua constiabel
  const present_date = new Date("2023-02-07");

  // 0-11 adalah Bulan di JavaScript
  const onLeave_day = new Date("2023-02-09");

  // hitung hasilnya dalam milidetik dan kemudian mengubahnya menjadi hari
  const Result =
    Math.round(onLeave_day.getTime() - present_date.getTime() + 1) / one_day;

  // hapus desimal dari nilai hari (Hasil) yang dihasilkan
  const Final_Result = (Result + 1).toFixed(0);
  // tampilkan nilai final_result

  return (
    <Layout>
      {/* <Navbar /> */}
      <p className="text-5xl text-red-500">halooo</p>
      <button className="btn" onClick={() => reverseMaps()}>
        Checkkkk
      </button>
      {/* <iframe
        name="gMap"
        src={`https://maps.google.com/maps?q=-6.2454555,
          106.8956406&hl=es;z=14&amp;output=embed`}
      ></iframe> */}
      <input type="text" onChange={(e) => setinput(e.target.value)} />
      <label>Choose a car:</label>
      <select
        id="cars"
        name="cars"
        onChange={(e) => setDropDown(e.target.value)}
      >
        <option value="">Approval Type</option>
        <option value="Annual Leave">Annual Leave</option>
        <option value="Attendance">Attendance</option>
        <option value="On Leave">On Leave</option>
        <option value="Sick Leave">Sick Leave</option>
      </select>
      <div className="flex">
        <label htmlFor="">from</label>
        <input type="date" onChange={(e) => setDateFrom(e.target.value)} />
        <label htmlFor="">to</label>
        <input type="date" onChange={(e) => setDateTo(e.target.value)} />
        <input type="file" />
      </div>
      <p>{dropDown}</p>
      <p>{input}</p>
      <p>{dateFrom}</p>
      <p>{dateTo}</p>
      <Button label="Halo" buttonSet="hover:bg-green-500" /> <br />
      <br />
      <label> input tanggal untuk batasan hari ini sampe kedepan</label>
      <input type="date" min={date} />
      {/* show password or not */}
      <label>Pass</label>
      <CustomInput type={passType} />
      <input type="checkbox" onClick={() => tooglePass()} />
      <label>show password</label>
      {passType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
      <p>
        Jumlah hari cuti dari
        {" " + present_date.toString().substring(4, 15) + " "} ke
        {" " + onLeave_day.toString().substring(4, 15) + " "}
        adalah:
        {" " + Final_Result + " "}
        hari
      </p>
      <br />
      <br />
      <div style={{ width: 700 }}>
        <Bar options={options} data={data} />
      </div>
    </Layout>
  );
}

export default App;
// http://localhost:8000/location?latitude=-6.2322&longitude=106.9152
// latitude=-6.2322
// longitude=106.9152

// fix baru
//latitude=-6.2354
//longitude=106.91986
