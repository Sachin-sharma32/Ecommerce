import Link from "next/link";
import React from "react";

const Button4 = ({ title, href }) => {
  return (
    <Link href={href}>
      <button className="relative text-white group w-[120px] group overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 justify-between">
            <p>{title}</p>
            <div className=" relative flex gap-4 w-fit -translate-x-9 group-hover:-translate-x-4 transition-all duration-300">
              <div className=" absolute w-[12px] h-[2px] bg-white rotate-90 group-hover:rotate-45 group-hover:-translate-y-[4px] group-hover:translate-x-[5px] transition-all duration-300"></div>
              <div className=" absolute w-[12px] h-[2px] bg-white group-hover:scale-x-150"></div>
              <div className=" absolute w-[12px] h-[2px] bg-white group-hover:-rotate-45 group-hover:translate-y-[4px] group-hover:translate-x-[5px] transition-all duration-300"></div>
            </div>
          </div>
          <div className="w-full h-[2px] opacity-0 group-hover:opacity-100 bg-white -translate-x-full group-hover:translate-x-0 transition-all duration-300"></div>
        </div>
      </button>
    </Link>
  );
};

export default Button4;
