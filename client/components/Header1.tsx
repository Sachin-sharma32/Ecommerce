import Image from "next/image";
import Button3 from "../utils/Button3";
import Button4 from "../utils/Button4";
import LeftArrow from "../utils/LeftArrow";
import RightArrow from "../utils/RightArrow";
import React, { useEffect, useState } from "react";

const Header1 = () => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (num < 1) {
        setNum(1);
      } else {
        setNum(0);
      }
    }, 5000);
  }, [num]);
  const products = [
    {
      title: "Directional Shoes",
      desc: "Wandler leads our edit of bold and beautiful shoes ready for stepping into the new season.",
      img: "https://fabricofsociety.luxury/cdn/shop/files/230328_FoS_03_126_02_v2_04_1920x1066_75d234a4-7d4f-479f-9c8b-154b669d6695.jpg?v=1682091175&width=1500",
    },
    {
      title: "Sunchine SStyle",
      desc: "The Spring/Summer 2023 collections have arrived. A magical edit of confident, care-free look to take you on your next adventure......",
      img: "https://fabricofsociety.luxury/cdn/shop/files/FoS_Sum_Editorial_2001232866_01_copy.jpg?v=1679655537&width=1500",
    },
  ];
  return (
    <div className="md:h-[calc(100vh-120px)]  h-[50vh] overflow-x-hidden relative arrow-container flex w-screen">
      <div
        className=" flex transition-all duration-500"
        style={{ transform: `translateX(calc(-100vw * ${num}))` }}
      >
        {products.map((item, i) => (
          <div key={i} className=" w-screen h-full overflow-hidden relative">
            <Image
              src={item.img}
              width={2500}
              height={2500}
              className="w-full h-full"
            />
            <div className="hidden md:flex absolute  top-3/4 -translate-y-1/2 left-1/2 -translate-x-1/2  flex-col gap-6">
              <h3 className=" text-5xl text-white">{item.title}</h3>
              <p className=" md:text-3xl text-white font-monumentRegular">
                {item.desc}
              </p>
              <Button3 title={"Shop Now"} className={"bg-white"} href={"/"} />
            </div>
          </div>
        ))}
      </div>
      <div className=" absolute top-1/2 md:right-10 right-4 md:translate-x-[200px] -translate-y-1/2 arrow transition-all duration-300 md:scale-[2]">
        <RightArrow max={1} setNum={setNum} num={num} />
      </div>
      <div className=" absolute top-1/2 md:left-10 left-4 md:-translate-x-[200px] -translate-y-1/2 arrow transition-all duration-300 md:scale-[2]">
        <LeftArrow max={1} setNum={setNum} num={num} />
      </div>
      <div className=" absolute bottom-10 right-10 flex gap-2">
        {[0, 1].map((item, i) => (
          <div
            className={` h-[2px] bg-white hover:opacity-100 rounded-3xl ${
              num === i ? "w-[100px] opacity-100" : "w-[30px] opacity-20"
            } transition-all duration-300 ${
              num + 1 === i ? "opacity-100" : ""
            }`}
            onClick={() => {
              setNum(i);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Header1;
