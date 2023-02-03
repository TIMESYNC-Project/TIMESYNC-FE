import Button from "components/Button";
import { WrappingCard } from "components/Card";
import { CustomInput } from "components/CustomInput";
import Layout from "components/Layout";
import React from "react";

const Settings = () => {
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
              />
              <p className="font-extrabold text-xl">:</p>
              <CustomInput
                id="input-start-minute"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
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
              />
              <p className="font-extrabold text-xl">:</p>
              <CustomInput
                id="input-end-minute"
                type="text"
                parentSet="w-20"
                inputSet="input-sm text-center border-sky border-2 font-bold text-xl focus:border-lightYellow"
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
