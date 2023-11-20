/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Footer = () => {
  const [active, setActive] = useState(null);
  const links = [
    {
      title: "Quick links",
      links: [
        { title: "About", link: "/about" },
        { title: "Clothing", link: "/clothing" },
        { title: "Shoes", link: "/shoes" },
        { title: "Bags", link: "/bags" },
        { title: "Buyer's Edit", link: "/buyerEdit" },
        { title: "Editorial", link: "/editorial" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { title: "Contact Us", link: "/about" },
        { title: "Payment", link: "/clothing" },
        { title: "Delivery", link: "/shoes" },
        { title: "Returns", link: "/bags" },
        { title: "FAQs", link: "/buyerEdit" },
        { title: "Terms & Conditions", link: "/terms" },
        { title: "Terms of Service", link: "/termsOfService" },
        { title: "Return policy", link: "/returnPolicy" },
        { title: "Return & Exchange", link: "/exchange" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", link: "/privacy" },
        { title: "Product Details", link: "/details" },
      ],
    },
    {
      title: "Social",
      links: [
        { title: "Facebook", link: "/facebook" },
        { title: "Instagram", link: "/instagram" },
        { title: "Twitter", link: "/twitter" },
      ],
    },
  ];
  return (
    <div className="p-10 bg-[#fafafa]  pb-10  min-h-[50vh] px-[100px]">
      <div className="flex pb-10 border-b flex-col lg:flex-row">
        <div className="md:grid grid-cols-1 justify-items-center lg:justify-items-start pb-10 lg:pb-0 lg:w-[70%] md:border-b lg:border-b-0 lg:border-r  sm:grid-cols-2 md:grid-cols-4">
          {links.map((link, i) => (
            <div
              onClick={() => {
                setActive(() => (active === i ? null : i));
              }}
              className={`flex cursor-pointer md:cursor-default flex-col gap-2 py-4 ease-in-out transition-all duration-500 ${
                active === i ? "max-h-[1000px]" : "max-h-14 md:max-h-[1000px]"
              } max-h-14 overflow-hidden border-b md:border-b-0 ${
                i === 0 ? "border-t md:border-t-0" : ""
              }`}
              key={i}
            >
              <div className="flex justify-between items-center">
                <div className="text-gray-400">{link.title}</div>
                <KeyboardArrowDownIcon className="text-gray-400 md:hidden" />
              </div>
              {link.links.map((link, i) => (
                <>
                  <Link className="w-fit" href={link.link}>
                    {link.title}
                  </Link>
                </>
              ))}
            </div>
          ))}
        </div>
        <div className="py-10 lg:py-0 lg:px-[5%] self-center md:self-start">
          <h4 className=" text-3xl font-bold">SHREMZ</h4>
          <p className=" italic">Fashion Wears</p>
        </div>
      </div>
      <div className="text-gray-500 text-xl py-4">Copyright Shremz</div>
    </div>
  );
};

export default Footer;
