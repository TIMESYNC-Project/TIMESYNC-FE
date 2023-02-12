import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { CustomInput } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import Layout from "components/Layout";
import Button from "components/Button";

import { SettingsType } from "utils/Type";
import Loader from "components/Loader";

const Settings = () => {
  const [editStartHour, setEditStartHour] = useState<string>("");
  const [editTolerancy, setEdittolerancy] = useState<string>("");
  const [editEndtHour, setEditEndtHour] = useState<string>("");
  const [setting, setSetting] = useState<SettingsType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [editAnLeave, setAnLeave] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.token) {
      navigate("/");
    }
    getSetting();
  }, []);

  async function getSetting() {
    setLoading(true);
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
      .catch((err) => {})
      .finally(() => setLoading(false));
  }

  function editSetting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .put(
        `setting`,
        {
          working_hour_start: editStartHour,
          working_hour_end: editEndtHour,
          tolerance: parseInt(editTolerancy),
          annual_leave: parseInt(editAnLeave),
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
  return (
    <Layout settingsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {loading ? (
        <Loader />
      ) : (
        <WrappingCard judul="Settings">
          <form onSubmit={editSetting}>
            <section className="flex justify-center items-center mb-10">
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="text-sm md:text-lg lg:text-2xl text-center font-bold w-40 md:w-60 lg:w-80">
                  Set office start hour
                </p>
                <div className="flex items-baseline">
                  <CustomInput
                    id="input-start-hour"
                    type="text"
                    parentSet="w-20"
                    inputSet="input-md text-center border-sky border-2 font-bold text-base md:text-lg lg:text-2xl focus:border-lightYellow w-24 lg:w-48"
                    defaultValue={setting.working_hour_start}
                    onChange={(e) => setEditStartHour(e.target.value)}
                  />
                </div>
              </div>
              <p className="flex justify-center mt-9 md:mt-11 lg:mt-12 font-extrabold text-lg md:text-2xl lg:text-3xl">
                -
              </p>
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="text-sm md:text-lg lg:text-2xl text-center font-bold w-40 md:w-60 lg:w-80">
                  Set office end hour
                </p>
                <div className="flex items-baseline">
                  <CustomInput
                    id="input-end-hour"
                    type="text"
                    parentSet="w-20"
                    inputSet="input-md text-center border-sky border-2 font-bold text-base md:text-lg lg:text-2xl focus:border-lightYellow w-24 lg:w-48"
                    defaultValue={setting.working_hour_end}
                    onChange={(e) => setEditEndtHour(e.target.value)}
                  />
                </div>
              </div>
            </section>
            <section className="flex flex-col items-center gap-4 mb-10">
              <p className="text-sm md:text-lg lg:text-2xl font-bold">
                Set office start hour tolerancy
              </p>
              <div className="flex items-baseline gap-2">
                <CustomInput
                  id="input-tolerancy"
                  type="text"
                  parentSet="w-20"
                  inputSet="input-md text-center border-sky border-2 font-bold text-base md:text-lg lg:text-2xl focus:border-lightYellow w-24 lg:w-48"
                  defaultValue={setting.tolerance}
                  onChange={(e) => setEdittolerancy(e.target.value)}
                />
                <p className="font-medium text-days lg:text-lg">mins</p>
              </div>
            </section>
            <section className="flex flex-col items-center gap-4">
              <p className="text-sm md:text-lg lg:text-2xl font-bold">
                Set employee's annual leaves:
              </p>
              <div className="flex items-baseline gap-2">
                <CustomInput
                  id="input-annual-leaves"
                  type="text"
                  parentSet="w-20"
                  inputSet="input-md text-center border-sky border-2 font-bold text-base md:text-lg lg:text-2xl focus:border-lightYellow w-24 lg:w-48"
                  defaultValue={setting.annual_leave}
                  onChange={(e) => setAnLeave(e.target.value)}
                />
                <p className="font-medium text-base lg:text-lg">days</p>
              </div>
            </section>
            <section className="flex justify-center mt-10 md:mt-12 mb-4 md:mb-0">
              <Button
                id="btn-save-settings"
                buttonSet="w-52 lg:w-80 py-1 md:py-2 border-4 rounded-xl shadow-md shadow-black flex items-center"
                label="Save Settings"
                type="submit"
              />
            </section>
          </form>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Settings;
