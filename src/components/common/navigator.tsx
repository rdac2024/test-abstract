"use client"

import React from "react";
import LeftIcon from "@/assets/images/common/back.svg";

function Navigator({ handleBackClick } : { handleBackClick: () => void }) {
  return (
    <header className='flex items-center vw-gap-8 vw-py-8 vw-px-24'>
      <LeftIcon className="vw-size-32" onClick={handleBackClick} />
      <span className="text-white font-[600] vw-text-18">Back</span>
    </header>
  );
}

export default Navigator;
