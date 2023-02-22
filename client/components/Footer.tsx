/* eslint-disable @next/next/no-img-element */
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";

const Footer = () => {
    return (
        <div className=" p-10 grid grid-cols-1 gap-8 justify-items-center pb-10 text-xs items-center sm:grid-cols-2 md:grid-cols-3 bg-black text-white">
            <div className=" flex flex-col gap-2 p-4 h-full border200 text-center items-center">
                <Link href="/" className=" text-xl font-semibold">
                    MYNTRA
                </Link>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quaerat, expedita neque illum totam quibusdam, repudiandae
                    maiores nisi vel quidem porro id. Ex explicabo soluta
                    provident consequatur mollitia amet deserunt eligendi!
                </p>
                <div className=" cursor-pointer flex gap-2">
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                    <GitHubIcon />
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center border200 text-left p-4 w-full h-full">
                <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                        <Link href="/">Home</Link>
                        <Link href="/">Man Fashion</Link>
                        <Link href="/">Wonem Fashion</Link>
                        <Link href="/">Kids Wear</Link>
                        <Link href="/">WishList</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link href="/">Cart</Link>
                        <Link href="/">Company Policy</Link>
                        <Link href="/">Licencing</Link>
                        <Link href="/">Dilivery Partners</Link>
                        <Link href="/">Terms</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-left  items-center h-full p-4 border200">
                <div className="flex gap-2">
                    <LocationOnIcon />
                    <p>A-24, Bal Nagar, Kartarpura</p>
                </div>
                <a href="tel: +916367212438" className="flex gap-2 w-full">
                    <PhoneIcon />
                    <p>91+ 6367212438</p>
                </a>
                <a href="mailto: sachin2sharma001@gmail.com" className="flex gap-2 w-full">
                    <MailIcon />
                    <p>sachin2sharma001@gmail</p>
                </a>
            </div>
        </div>
    );
};

export default Footer;
