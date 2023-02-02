import React from "react";

import loginart from "assets/login-art.jpg";
import logo from "assets/logo.png";
import { CustomInput } from "components/CustomInput";
import Button from "components/Button";
import Layout from "components/Layout";

const Login = () => {
  return (
    <div className="w-full flex items-center p-16">
      <section className="w-1/2">
        <img src={loginart} alt="login-art" />
      </section>
      <section className="w-1/2 px-20">
        <div className="w-full bg-gray-100 rounded-2xl px-14 pt-10 pb-20 flex flex-col gap-10 shadow-lg shadow-gray-500">
          <div className="flex flex-col items-center">
            <img className="w-20" src={logo} alt="logo" />
            <p className="font-extrabold text-3xl text-navy">TIMESYNC</p>
            <p className="font-bold text-2xl tracking-widest text-yellow-400">
              attendance
            </p>
          </div>
          <div>
            <CustomInput
              inputSet="text-center focus:border-4 focus:border-yellow-400"
              placeholder="Input NIP"
            />
            <CustomInput
              inputSet="text-center focus:border-4 focus:border-yellow-400"
              placeholder="Input password"
            />
          </div>
          <Button
            buttonSet="w-full bg-yellow-400 text-navy border-0"
            label="LOGIN"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
