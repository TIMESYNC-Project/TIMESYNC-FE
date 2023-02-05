import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { CustomInput } from "components/CustomInput";
import loginart from "assets/login-art.jpg";
import Button from "components/Button";
import logo from "assets/logo.png";

const Login = () => {
  const [passType, setPassType] = useState<string>("password");
  const [password, setPassword] = useState<string>("");  
  const [nip, setNip] = useState<string>("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate()

  function tooglePass() {
    if (passType === "password") {
      setPassType("text");
    }
    if (passType === "text") {
      setPassType("password");
    }
  }

  function authLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(`https://shirayuki.site/login`, {
        nip: nip,
        password: password,
      })
      .then((res) => {
        const { email, id, name, nip, position, role } = res.data.data;
        const { token, message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setCookie("token", token);
        setCookie("email", email);
        setCookie("id", id);
        setCookie("name", name);
        setCookie("nip", nip);
        setCookie("position", position);
        setCookie("role", role);
        navigate('/home')
      })
      .catch((err) => {
        console.log(err.response);
        const {data} = err.response
        const {message} = data
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  }

  return (
    <div className="w-full flex items-center px-16 py-8">
      <section className="w-1/2">
        <img src={loginart} alt="login-art" />
      </section>
      <section className="w-1/2 px-20">
        <div className="w-full bg-gray-100 rounded-2xl px-14 pt-10 pb-20 flex flex-col gap-10 shadow-lg shadow-gray-500">
          <div className="flex flex-col items-center">
            <img className="w-20" src={logo} alt="logo" />
            <p className="font-bold text-3xl text-navy">TIMESYNC</p>
            <p className="font-bold text-lg tracking-widest text-yellow-400">
              attendance
            </p>
          </div>
          <form onSubmit={(e) => authLogin(e)}>
            <CustomInput
              id="input-nip"
              inputSet="text-center focus:border-4 focus:border-yellow-400"
              placeholder="Input NIP"
              type="text"
              onChange={(e) => setNip(e.target.value)}
            />
            <CustomInput
              id="input-password"
              inputSet="text-center focus:border-4 focus:border-yellow-400 my-2"
              placeholder="Input password"
              type={passType}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex">
              <input
                id="checkbox-show-password"
                type="checkbox"
                onClick={() => tooglePass()}
              />
              <label className="text-sm mx-2 capitalize">show password</label>
            </div>
            <Button
              id="btn-login"
              buttonSet="w-full bg-lightYellow hover:bg-darkYellow text-navy border-0 mt-14"
              label="LOGIN"
              type="submit"
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
