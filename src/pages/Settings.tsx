import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { CustomInput } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import Layout from "components/Layout";
import Button from "components/Button";

interface SettingsType {
  annual_leave?: number;
  id?: number;
  tolerance?: number;
  working_hour_end?: string;
  working_hour_start?: string;
}

const Settings = () => {
  const [editStartHour, setEditStartHour] = useState<string>("");
  const [editTolerancy, setEdittolerancy] = useState<string>("");
  const [editEndtHour, setEditEndtHour] = useState<string>("");
  const [setting, setSetting] = useState<SettingsType>({});
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
          title: "Success",
          text: message,
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            getSetting();
          }
        });
      })
      .catch((err) => {});
  }
  return (
    <Layout settingsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard judul="Settings">
        <form onSubmit={editSetting}>
          <section className="flex justify-center gap-10 mb-10">
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg font-bold">Set office start hour</p>
              <div className="flex items-baseline gap-5">
                <CustomInput
                  id="input-start-hour"
                  type="text"
                  parentSet="w-20"
                  inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                  defaultValue={setting.working_hour_start}
                  onChange={(e) => setEditStartHour(e.target.value)}
                />
                {/* <p className="font-extrabold text-xl">:</p>
                <CustomInput
                  id="input-start-minute"
                  type="text"
                  parentSet="w-20"
                  inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                  defaultValue={setting.working_hour_start?.substring(3, 5)}
                  onChange={(e) => setEditStartMin(e.target.value)}
                /> */}
              </div>
            </div>
            <p className="mt-10 font-extrabold text-2xl">-</p>
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg font-bold">Set office end hour</p>
              <div className="flex items-baseline gap-5">
                <CustomInput
                  id="input-end-hour"
                  type="text"
                  parentSet="w-20"
                  inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                  defaultValue={setting.working_hour_end}
                  onChange={(e) => setEditEndtHour(e.target.value)}
                />
                {/* <p className="font-extrabold text-xl">:</p>
                <CustomInput
                  id="input-end-minute"
                  type="text"
                  parentSet="w-20"
                  inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                  defaultValue={setting.working_hour_end?.substring(3, 5)}
                  onChange={(e) => setEditEndtMin(e.target.value)}
                /> */}
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center gap-4 mb-10">
            <p className="text-lg font-bold">Set office start hour tolerancy</p>
            <div className="flex items-baseline gap-2">
              <CustomInput
                id="input-tolerancy"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                defaultValue={setting.tolerance}
                onChange={(e) => setEdittolerancy(e.target.value)}
              />
              <p className="font-medium text-xl">min</p>
            </div>
          </section>
          <section className="flex flex-col items-center gap-4 mb-10">
            <p className="text-lg font-bold">Set employee's annual leaves:</p>
            <div className="flex items-baseline gap-2">
              <CustomInput
                id="input-annual-leaves"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                defaultValue={setting.annual_leave}
                onChange={(e) => setAnLeave(e.target.value)}
              />
              <p className="font-medium text-xl">days</p>
            </div>
          </section>
          <section className="flex justify-center">
            <Button
              id="btn-save-settings"
              buttonSet="w-60 border-4 rounded-xl shadow-md shadow-black flex items-center"
              label="Save Settings"
              type="submit"
            />
          </section>
        </form>
      </WrappingCard>
    </Layout>
  );
};

export default Settings;
