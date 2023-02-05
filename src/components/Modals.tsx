import React, { FC } from "react";

interface modalProps {
  no: number;
  titleModal: string;
  children?: React.ReactNode;
}

export const Modals1: FC<modalProps> = ({ no, titleModal, children }) => {
  return (
    <>
      <input type="checkbox" id={`my-modal-${no}`} className="modal-toggle" />
      <div className="modal modal-middle sm:modal-middle">
        <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
          <p className="mb-5 pb-2 text-xl border-b-2 font-bold text-black ">
            {titleModal}
          </p>
          {children}
        </div>
      </div>
    </>
  );
};

export const Modals2: FC<modalProps> = ({ no, titleModal, children }) => {
  return (
    <>
      <input type="checkbox" id={`my-modal-${no}`} className="modal-toggle" />
      <div className="modal modal-middle sm:modal-middle">
        <div className="modal-box border-2 border-sky flex flex-col justify-center text-sky">
          <label
            htmlFor={`my-modal-${no}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <p className="mb-5 pb-2 text-xl border-b-2 font-bold text-black ">
            {titleModal}
          </p>
          {children}
        </div>
      </div>
    </>
  );
};
