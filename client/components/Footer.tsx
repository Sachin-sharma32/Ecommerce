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
import Image from "next/image";

const Footer = () => {
    return (
        <div className=" p-10 grid grid-cols-1 gap-8 justify-items-center pb-10 text-sm items-center sm:grid-cols-2 md:grid-cols-3">
            <div className=" flex flex-col gap-2 border-t-2 p-4 sm:border-r-2 sm:border-t-0">
                <Link href="/" className=" text-2xl font-semibold">
                    MYNTRA
                </Link>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quaerat, expedita neque illum totam quibusdam, repudiandae
                    maiores nisi vel quidem porro id. Ex explicabo soluta
                    provident consequatur mollitia amet deserunt eligendi!
                </p>
                <div className=" cursor-pointer flex gap-2 text-blue-500">
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                    <GitHubIcon />
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center text-center border-t-2 p-4 w-full sm:border-t-0 md:border-r-2">
                <h2 className=" text-2xl font-semibold">Links</h2>
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
            <div className="flex flex-col gap-4 text-center border-t-2 w-full justify-center items-center pt-4 sm:border-t-0">
                <h2 className=" text-2xl font-semibold">Contact</h2>
                <div className="flex gap-2">
                    <LocationOnIcon />
                    <p>A-24, Bal Nagar, Kartarpura</p>
                </div>
                <div className="flex gap-2">
                    <PhoneIcon />
                    <p>91+ 6367212438</p>
                </div>
                <div className="flex gap-2">
                    <MailIcon />
                    <p>sachin2sharma001@gmail</p>
                </div>
                <div className="flex gap-2">
                    <img
                        src="/cards/mastercard.png"
                        width={50}
                        height={50}
                        alt="img"
                    />
                    <img
                        src="/cards/discover.png"
                        width={50}
                        height={50}
                        alt="img"
                    />
                    <img
                        src="/cards/express.png"
                        width={50}
                        height={50}
                        alt="img"
                    />
                    <img
                        src="/cards/visa.png"
                        width={50}
                        height={50}
                        alt="img"
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;
