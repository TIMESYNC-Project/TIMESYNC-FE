import { BiAddToQueue } from "react-icons/bi";
import { useParams } from "react-router-dom";
import React from "react";

import { WrappingCard, FlexyCard } from "components/Card";
import Layout from "components/Layout";

const RecordsDetail = () => {
    const {id} = useParams()
    console.log(id)
  return (
    <Layout recordsSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Details Records"
        rightSide={
          <>
            <select
              name="Month"
              id=""
              className="select select-bordered border-sky w-1/3"
              // onChange={()=>}
            >
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <button className="flex items-center mx-5 text-sky">
              <BiAddToQueue size={30} />
            </button>
          </>
        }
      >
        <div className="pb-5">
            <p className="text-xl font-bold text-navy">James Shelby</p>
        </div>        
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
    </Layout>
  );
};

export default RecordsDetail;
