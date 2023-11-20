import Head from "next/head";
import React from "react";
import Smooth from "../utils/smooth";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <Smooth className=" bg-white min-h-screen flex flex-col gap-20 p-20 justify-center items-center">
      <Head>
        <title>Myntra - page not found</title>
        <link
          rel="icon"
          type="image/png"
          href="https://cdn4.vectorstock.com/i/thumb-large/14/33/cross-mark-icon-x-sign-simple-error-design-false-vector-40051433.jpg"
        />
        <meta
          name="description"
          content="The only online store you will need to fulfill all your needs"
        />
      </Head>
      <div>
        <div className="flex  flex-col items-center gap-4">
          <p className=" text-xl font-monumentRegular">
            Sorry, we can&nbsp;t find what you are looking for...
          </p>
          <p>Pleasse try one of the links below </p>
          <Link href="/" className="border-b border-black">
            Return to HomePage
          </Link>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <Image
            src={
              "https://fabricofsociety.luxury/cdn/shop/files/1850_IMGN_BP220831_FOS_05_185_sRGB_F1_Copy_700x.png?v=1678893117"
            }
            width={500}
            height={500}
            className="w-full h-full"
          />
          <p className="text-xl font-monumentRegular">New Arrivals</p>
          <p>Shop the hottest clothing, shoes and bags landing on Shremz</p>
          <Link href="/" className="border-b w-fit border-black">
            Shop New In
          </Link>
        </div>
        <div className="gap-2 flex flex-col">
          <Image
            src={
              "https://fabricofsociety.luxury/cdn/shop/files/1850_IMGN_BP220831_FOS_02_029_sRGB_F1_Copy_700x.png?v=1678893237"
            }
            width={500}
            height={500}
            className="w-full h-full"
          />
          <p className="text-xl font-monumentRegular">Designers</p>
          <p>
            Browse our growing roster of emerging and established designers.
          </p>
          <Link href="/" className="border-b border-black w-fit">
            Shop Designers
          </Link>
        </div>
      </div>
    </Smooth>
  );
};
export default NotFound;
