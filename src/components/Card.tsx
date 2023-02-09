import React, { FC } from "react";

import Logo from "assets/logo.png";

interface CardProps {
  judul?: string;
  parentSet?: string;
  children?: React.ReactNode;
  rightSide?: any;
  titleSet?: string;
}

export const WrappingCard: FC<CardProps> = ({
  titleSet,
  judul,
  parentSet,
  children,
  rightSide,
}) => {
  return (
    <div className="my-10 mx-5 md:mx-12 xl:m-20">
      <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
        <div className="flex mx-3 md:mx-5 xl:mx-10 mt-10 items-center">
          <div className="w-2/3">
            <h1
              className={`capitalize text-xl md:text-2xl lg:text-3xl font-extrabold ${titleSet}`}
            >
              {judul}
            </h1>
          </div>
          <div className="w-1/3 flex justify-end">{rightSide}</div>
        </div>
        <hr className="mx-3 md:mx-5 xl:mx-10 my-3 border-[1.5px] border-sky" />
        <div className={`${parentSet} p-3 md:p-6 xl:p-10`}>{children}</div>
      </div>
    </div>
  );
};

export const FlexyCard: FC<CardProps> = ({ children, parentSet }) => {
  return (
    <div className={`my-5 xl:mx-24 ${parentSet}`}>
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

export const MiniCard: FC<CardProps> = ({
  parentSet,
  children,
  judul,
  titleSet,
}) => {
  return (
    <div className="xl:m-5">
      <div
        className={`box-border w-full bg-white rounded-2xl border-sky border-2 p-3 xl:p-5 ${parentSet}`}
      >
        <h1 className={`capitalize font-extrabold ${titleSet}`}>{judul}</h1>
        <hr className="m-5 border-[1.5px] border-sky" />
        {children}
      </div>
    </div>
  );
};
