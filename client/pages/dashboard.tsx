import React, { useState } from "react";
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
import { useGetMe } from "../hooks/useAuth";
import Spinner from "../utils/spinner";
import ErrorBoundry from "../utils/ErrorBoundry";

const DashBoard = () => {
    const [active, setActive] = useState(0);

    const { isLoading, isError, data: user } = useGetMe();

    const links = [
        {
            icons: <SettingsIcon />,
            name: <div className=" hidden sm:flex">Account Settings</div>,
        },
        {
            icons: <InventoryIcon />,
            name: <div className=" hidden sm:flex">My Orders</div>,
        },
        {
            icons: <AllInclusiveIcon />,
            name: <div className=" hidden sm:flex">All Orders</div>,
        },
        {
            icons: <AddCircleIcon />,
            name: <div className=" hidden sm:flex">Add Product</div>,
        },
        {
            icons: <AllInboxIcon />,
            name: <div className=" hidden sm:flex">My Products</div>,
        },
    ];

    const userLinks = links.slice(0, 2);

    const setCurrentLink = (index: number) => {
        setActive(index);
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : user ? (
                <div className=" mt-[4rem] min-h-screen mb-20 flex justify-center ml-20 sm:ml-64">
                    <div className=" bg-blue-200 min-h-screen w-20 sm:w-64 flex flex-col items-center fixed top-[4rem] left-0 ">
                        {user.isAdmin &&
                            links.map((link, index) => (
                                <div
                                    className={`flex gap-2 w-full p-2 sm:p-10 cursor-pointer justify-center ${index === active
                                        ? " bg-blue-400 hover:bg-blue-500"
                                        : " hover:bg-blue-300"
                                        }`}
                                    key={index}
                                    onClick={() => {
                                        setCurrentLink(index);
                                    }}
                                >
                                    {link.icons}
                                    {link.name}
                                </div>
                            ))}
                        {!user.isAdmin && (
                            <>
                                {userLinks.map((link, index) => (
                                    <div
                                        className={`flex gap-2 w-full p-10 cursor-pointer ${index === active
                                            ? " bg-blue-400 hover:bg-blue-500"
                                            : " hover:bg-blue-300"
                                            }`}
                                        key={index}
                                        onClick={() => {
                                            setCurrentLink(index);
                                        }}
                                    >
                                        {link.icons}
                                        {link.name}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className=" w-[100%]">
                        <ErrorBoundry>
                            {active === 0 && <UpdateAccount />}
                            {active === 1 && <MyOrders />}
                            {active === 2 && <AllOrders />}
                            {active === 3 && <CreateProduct />}
                            {active === 4 && <AllProducts />}
                        </ErrorBoundry>
                    </div>
                </div>
            ) : (
                isError && <div>Something went wrong</div>
            )}
        </div>
    );
};

export default DashBoard;
