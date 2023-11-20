import React, { useRef, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateAccount from "../components/UpdateAccount";
import CreateProduct from "../components/CreateProduct";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AllProducts from "../components/AllProducts";
import InventoryIcon from "@mui/icons-material/Inventory";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MyOrders from "../components/MyOrders";
import AllOrders from "../components/AllOrders";
import Spinner from "../utils/spinner";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/smooth";
import Head from "next/head";
import { useSelector } from "react-redux";
import { State } from "../utils/types";
import EastIcon from "@mui/icons-material/East";
import CreateCategory from "../components/CreateCategory";
import CreateCollection from "../components/CreateCollection";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const DashBoard = () => {
  const [active, setActive] = useState(0);
  const sideRef = useRef();

  const showSideBar = () => {
    sideRef.current.classList.remove("-translate-x-[200px]");
  };
  const hideSideBar = () => {
    sideRef.current.classList.add("-translate-x-[200px]");
  };

  const user = useSelector((state: State) => state.auth.user);
  console.log(user);

  const links = [
    {
      name: <div>Account Settings</div>,
      icons: <EastIcon />,
    },
    {
      name: <div>My Orders</div>,
      icons: <EastIcon />,
    },
    {
      name: <div>All Orders</div>,
      icons: <EastIcon />,
    },
    {
      name: <div>Add Product</div>,
      icons: <EastIcon />,
    },
    {
      name: <div>Add Category</div>,
      icons: <EastIcon />,
    },
    {
      name: <div>Add Collection</div>,
      icons: <EastIcon />,
    },
    {
      name: <div>My Products</div>,
      icons: <EastIcon />,
    },
  ];

  const userLinks = links.slice(0, 2);

  const setCurrentLink = (index: number) => {
    setActive(index);
  };

  return (
    <Smooth className=" flex justify-center text-sm min-h-screen overflow-x-hidden px-10">
      <div>
        <button
          className=" cursor-pointer bg-black flex md:hidden"
          onClick={showSideBar}
        >
          <MenuIcon className=" mt-[4rem] absolute top-2 left-2" />
        </button>
        <div
          ref={sideRef}
          className="transition-all duration-200 absolute top-0 left-0 min-h-screen mt-[4rem] w-[200px] -translate-x-[200px] p-4 flex flex-col gap-4 bg-white text-black shadow-xl z-50"
        >
          {user?.isAdmin &&
            links.map((link, index) => (
              <div
                className="flex gap-2 cursor-pointer w-full hover:translate-x-4 transition-all duration-200"
                key={index}
                onClick={() => {
                  setCurrentLink(index);
                }}
              >
                <p className="  w-full" onClick={hideSideBar}>
                  {link.name}
                </p>
              </div>
            ))}
          {!user?.isAdmin && (
            <>
              {userLinks.map((link, index) => (
                <div
                  className="flex gap-1 w-full cursor-pointer items-center p-2"
                  key={index}
                  onClick={() => {
                    setCurrentLink(index);
                    hideSideBar;
                  }}
                >
                  {link.name}
                </div>
              ))}
            </>
          )}
          <button className="absolute top-2 right-2" onClick={hideSideBar}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className=" mt-[6rem] min-h-screen flex justify-center w-[100vw]">
        <Head>
          <title>Myntra - dashBoard</title>
          <meta
            name="description"
            content="The only online store you will need to fulfill all your needs"
          />
        </Head>
        <div className="w-64 gap-4 md:flex hidden flex-col items-center animate">
          {user?.isAdmin &&
            links.map((link, index) => (
              <div
                className="flex gap-2 cursor-pointer hover:gap-4 transition-all duration-200 items-center hover:border-b w-fit"
                key={index}
                onClick={() => {
                  setCurrentLink(index);
                }}
              >
                {link.name}
                {link.icons}
              </div>
            ))}
          {!user?.isAdmin && (
            <>
              {userLinks.map((link, index) => (
                <div
                  className="flex gap-1 w-full cursor-pointer  hover:gap-4 transition-all duration-200 items-center"
                  key={index}
                  onClick={() => {
                    setCurrentLink(index);
                  }}
                >
                  {link.name}
                  {link.icons}
                </div>
              ))}
            </>
          )}
        </div>
        <div className=" w-[100%] m-2">
          <ErrorBoundry>
            {active === 0 && <UpdateAccount />}
            {active === 1 && <MyOrders />}
            {active === 2 && <AllOrders />}
            {active === 3 && <CreateProduct />}
            {active === 4 && <CreateCategory />}
            {active === 5 && <CreateCollection />}
            {active === 6 && <AllProducts />}
          </ErrorBoundry>
        </div>
      </div>
    </Smooth>
  );
};

export default DashBoard;

DashBoard.getInitialProps = async () => {
  return {
    title: "Account",
    image: "/shremz.png",
    summery:
      "Elevate your wardrobe with our fashion-forward collections. Discover the perfect blend of trends and timeless classics. Unleash your inner fashionista and shop with confidence. Experience effortless style delivered right to your doorstep. Embrace the essence of chic and define your own fashion narrative with Shremz.",
    keywords: "shremz e-commerce bag women-bag purse shoes clothing store",
    type: "website",
    imageAlt: "Shremz",
    parameter: "account",
  };
};
