import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { CustomInput } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import Layout from "components/Layout";
import Button from "components/Button";

interface SettingsType{
  annual_leave?: number
  id?: number
  tolerance?: number
  working_hour_end?: string
  working_hour_start?: string
}
const Settings = () => {
  const [cookie, setCookie] = useCookies();
  const [setting, setSetting] = useState<SettingsType>({})

  useEffect(() => {
    getSetting();
  }, []);

  function getSetting() {
    axios
      .get(`setting`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const { data } = res.data;
        setSetting(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Layout settingsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard judul="Settings">
        <section className="flex justify-center gap-10 mb-10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">Set office start hour</p>
            <div className="flex items-baseline gap-5">
              <CustomInput
                id="input-start-hour"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                defaultValue={setting.working_hour_start?.substring(0, 2)}
              />
              <p className="font-extrabold text-xl">:</p>
              <CustomInput
                id="input-start-minute"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                defaultValue={setting.working_hour_start?.substring(3, 5)}
              />
            </div>
          </div>
          <p className="mt-10 font-extrabold text-4xl">-</p>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">Set office end hour</p>
            <div className="flex items-baseline gap-5">
              <CustomInput
                id="input-end-hour"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                defaultValue={setting.working_hour_end?.substring(0, 2)}
              />
              <p className="font-extrabold text-xl">:</p>
              <CustomInput
                id="input-end-minute"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
                defaultValue={setting.working_hour_end?.substring(3, 5)}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-4 mb-10">
          <p className="text-lg">Set office start hour tolerancy</p>
          <div className="flex items-baseline gap-2">
            <CustomInput
              id="input-tolerancy"
              type="text"
              parentSet="w-20"
              inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
              defaultValue={setting.tolerance}
            />
            <p className="font-extrabold text-xl">min</p>
          </div>
        </section>
        <section className="flex flex-col items-center gap-4 mb-10">
          <p className="text-lg">Set employee's annual leaves:</p>
          <div className="flex items-baseline gap-2">
            <CustomInput
              id="input-annual-leaves"
              type="text"
              parentSet="w-20"
              inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
              defaultValue={setting.annual_leave}
            />
            <p className="font-extrabold text-xl">days</p>
          </div>
        </section>
        <section className="flex justify-center">
          <Button
            id="btn-save-settings"
            buttonSet="w-60 border-4 rounded-xl shadow-md shadow-black flex items-center"
            label="Save Settings"
          />
        </section>
      </WrappingCard>
    </Layout>
  );
};

export default Settings;
