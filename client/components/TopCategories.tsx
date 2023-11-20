import Image from "next/image";
import React, { useState } from "react";
import RightArrow from "../utils/RightArrow";
import LeftArrow from "../utils/LeftArrow";

const TopCategories = () => {
  const [num, setNum] = useState(0);

  const data = [
    {
      title: "In Focus: Samuel Gui Yang",
      desc: "Discover the sought-after label that'sss on everyone's lips",
      img: "https://fabricofsociety.luxury/cdn/shop/files/SHOT_03_166_R1_0f89c01b-c4a6-4ed6-a5cb-88a98ae6110a_1920x.jpg?v=1683624492",
    },
    {
      title: "Dentro Decoded",
      desc: "Delve into the world of Isa Kauffman, the brainpower behind the innovative",
      img: "https://fabricofsociety.luxury/cdn/shop/files/FoS_Sum_Editorial_2203233696_01_1920x800_ddb2b04d-8c67-4846-a58c-6ea256020d96_1920x.png?v=1682277958",
    },
  ];
  return (
    <div className="mx-[5vw] py-20 w-[90vw] max-h-[100vh] overflow-hidden relative flex items-center arrow-container">
      <div
        className="flex w-[180vw] transition-all items-center  duration-500 h-full"
        style={{ transform: `translateX(calc(-90vw * ${num}))` }}
      >
        {data.map((item, i) => (
          <div className=" min-w-[90vw] h-full" key={i}>
            <Image
              src={item.img}
              width={2500}
              height={2500}
              className="w-[90vw] h-full object-cover"
            />
            <div className=" flex flex-col p-4 items-center gap-4">
              <p className="text-2xl font-monumentRegular">{item.title}</p>
              <p className="text-lg">{item.desc}</p>
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
    </div>
  );
};

export default TopCategories;
