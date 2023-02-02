import React, { FC } from "react";

import Logo from "assets/logo.png";

interface CardProps {
  judul?: string;
  parentSet?: string;
  children?: React.ReactNode;
  rightSide?: any;
  titleSet?: string
}

export const WarppingCard: FC<CardProps> = ({
  judul,
  parentSet,
  children,
  rightSide,
}) => {
  return (
    <div className="m-20">
      <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
        <div className="flex mx-10 mt-10">
          <div className="w-1/2">
            <h1 className="capitalize text-3xl  font-extrabold">{judul}</h1>
          </div>
          <div className="w-1/2">{rightSide}</div>
        </div>
        <hr className="mx-10 my-3 border-[1.5px] border-sky" />
        <div className={`${parentSet} p-10`}>{children}</div>
      </div>
    </div>
  );
};

export const UsefullCard: FC<CardProps> = ({ children }) => {
  return (
    <div className="my-5 mx-24">
      <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
        {children}
      </div>
    </div>
  );
};

export const CardWithLogo: FC<CardProps> = ({ children }) => {
  return (
    <div className="my-5 m-40">
      <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
        <div className="flex justify-end">
          <img src={Logo} alt="" width={65} />
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export const MiniCard: FC<CardProps> = ({ children, judul, titleSet }) => {
  return (
    <div className="m-5">
      <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
        <h1 className={`capitalize font-extrabold ${titleSet}`}>{judul}</h1>
        <hr className="m-3 border-[1.5px] border-sky" />
        {children}
      </div>
    </div>
  );
};
