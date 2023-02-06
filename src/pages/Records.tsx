import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/all";
import { useCookies } from "react-cookie";

import { CustomInput } from "components/CustomInput";
import { WrappingCard } from "components/Card";
import { FlexyCard } from "components/Card";
import Layout from "components/Layout";

const Records = () => {
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate()

  function onClickDetail(id: number) {
    navigate(`/records/details/${id}`);
  }
  
  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      {cookie.role === "admin" ? (
        <WrappingCard
          judul="Records"
          rightSide={
            <div className="flex justify-end">
              <form className="flex justify-end" id="form-search">
                <CustomInput inputSet="border-sky" placeholder="Search" id="input-search"/>
                <button className="btn btn-ghost mx-1 text-sky" type="submit" id="btn-search"> 
                  <BsSearch size={27} />
                </button>
              </form>
            </div>
          }
        >
          <FlexyCard parentSet="active:scale-95">
            <div className="flex justify-center items-center hover:cursor-pointer " onClick={()=>onClickDetail(2)} id="btn-detail-records">
              <div className="flex w-1/2">
                <img
                  src="https://i.pinimg.com/564x/9f/8b/74/9f8b749c32edf47b1b3f098230a5584c.jpg"
                  className="w-[50px] h-[50px]  rounded-full"
                />
                <div className="mx-7">
                  <p className="font-medium text-lg text-navy">0001</p>
                  <p className="font-bold text-lg text-navy">James Shelby</p>
                </div>
              </div>
              <div className="flex w-1/2 justify-end">
                <div className="mx-5">
                  <p className="font-bold text-lg text-navy">
                    Product Engineer
                  </p>
                </div>
              </div>
            </div>
          </FlexyCard>
        </WrappingCard>
      ) : (
        <WrappingCard
          judul="Records"
          rightSide={
            <>
              <div className="flex justify-center items-center">
                <CustomInput
                id="input-date"
                  type="date"
                  inputSet="border-sky"
                  // onChange={}
                />
              </div>
            </>
          }
        >
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize ">jan 30, 2023</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p>07.25</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p>17.20</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p>presence</p>
              </div>
            </div>
          </FlexyCard>
          <FlexyCard>
            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize ">jan 30, 2023</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize">07.25</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize">17.20</p>
              </div>
              <div className="flex justify-center w-1/4">
                <p className="text-black capitalize">presence</p>
              </div>
            </div>
          </FlexyCard>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Records;
