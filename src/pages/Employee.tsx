import { AiOutlineFileAdd, AiOutlineUserAdd, AiOutlineDelete,} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import React from "react";

import { FlexyCard, WrappingCard } from "components/Card";
import { CustomInput } from "components/CustomInput";
import Layout from "components/Layout";

const Employee = () => {
  return (
    <Layout employeesSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Employees"
        rightSide={
          <>
            <div className="flex justify-end">
              <form className="flex justify-end">
                <CustomInput inputSet="border-sky" placeholder="Search" />
                <button className="btn btn-ghost mx-1 text-sky" type="submit">
                  <BsSearch size={27} />
                </button>
              </form>
              <button className="btn btn-ghost mx-0 text-sky">
                <AiOutlineFileAdd size={27} />
              </button>
              <button className="btn btn-ghost mx-0 text-sky">
                <AiOutlineUserAdd size={27} />
              </button>
            </div>
          </>
        }
      >
        <FlexyCard>
          <div className="flex justify-center items-center">
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
                <p className="font-bold text-lg text-navy">Product Engineer</p>
              </div>
              <button
                className="mx-3 text-sky"
                //   onClick={()=>console.log("hai")}
              >
                <BiEdit size={27} />
              </button>
              <button
                className="mx-3 text-sky"
                //   onClick={()=>console.log("hai")}
              >
                <AiOutlineDelete size={27} />
              </button>
            </div>
          </div>
        </FlexyCard>
      </WrappingCard>
    </Layout>
  );
};

export default Employee;
