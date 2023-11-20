// import Image from "next/image";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Button3 = ({ title, className, href }) => {
  return (
    <Link href={href}>
      <button
        className={`w-[170px] h-[50px] px-10 py-4 flex items-center gap-10 relative group ${className}`}
      >
        <p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-x-14 transition-all duration-300">
          {title}
        </p>
        <Image
          src={"/arrow.png"}
          width={20}
          height={20}
          className=" absolute top-1/2 -translate-y-[8px] opacity-0 right-10 group-hover:opacity-100 transition-all duration-300 group-hover:right-4"
        />
      </button>
    </Link>
  );
};

export default Button3;
