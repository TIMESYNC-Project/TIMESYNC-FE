import { useState } from "react";
import axios from "axios";

function App() {
  const [latitut, setLatitut] = useState<any>();
  const [longitut, setLongitut] = useState<any>();

  function tryMaps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // const latitude = setLatitut(position.coords.latitude);
        // constcv   longitude = setLongitut(position.coords.longitude);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios
          .get(
            `http://localhost:8000/location?latitude=${latitude}&longitude=${longitude}`
          )
          .then((res) => {
            console.log(res);
            // absen();
            setLatitut(latitude);
            setLongitut(longitude);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
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

  return (
    <div className="App bg-blue-600">
      <p className="text-5xl text-red-500">halooo</p>
      <button className="btn" onClick={() => tryMaps()}>
        Checkkkk
      </button>
        <iframe
          name="gMap"
          src={`https://maps.google.com/maps?q=-6.2454555,
          106.8956406&hl=es;z=14&amp;output=embed`}
        ></iframe>
    </div>
  );
}

export default App;
// http://localhost:8000/location?latitude=-6.2454555&longitude=106.8956406
// latitude=-6.2454555
// longitude=106.8956406
