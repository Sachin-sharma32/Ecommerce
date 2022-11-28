/* eslint-disable @next/next/no-img-element */
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { setToken } from "../app/slices";
import PersonIcon from "@mui/icons-material/Person";
import { setUser } from "../app/slices";
import { useRefresh, useGetMe, useLogout } from "../hooks/useAuth";
import { useGetCart } from "../hooks/useCart";
import { signOut, useSession } from "next-auth/react";
import { ProductWithQuantity, State, User } from "../utils/types";

const Navbar = () => {
    const dispatch = useDispatch();


    const clientCart = useSelector((state: State) => state.auth.cart);

    const { data: session } = useSession();

    const onSuccess = (accessToken: string) => {
        dispatch(setToken(accessToken));
    };

    const token = useSelector((state: State) => state.auth.accessToken);
    // //? 6
    let decodedJwt;
    if (token) {
        decodedJwt = jwtDecode(token);
    }
    //? 5 - refresh access token after expiration
    const { data: accessToken } = useRefresh(onSuccess);

    //? 7 - run before every

    const { mutate: logOut } = useLogout();

    const logoutUser = () => {
        dispatch(setToken(null));
        logOut();
    };

    const onUserSuccess = (user: User) => {
        dispatch(setUser(user));
    };
    const { data: user } = useGetMe(onUserSuccess);
    const { data: cart } = useGetCart(user?._id);
    let cartSize: number;
    if (clientCart) {
        if (clientCart.products.length === 0) {
            cartSize = 0;
        } else {
            cartSize = clientCart.products.reduce((acc: number, product: ProductWithQuantity) => {
                return acc + product.quantity;
            }, 0);
        }
    }

    return (
        <div className=" flex justify-between p-4 pt-6 items-center bg-blue-400 rounded-t-none fixed top-0 w-[100%] h-[4rem] bg-opacity-50 z-10 backdrop-blur-lg text-xs sm:text-base">
            <Link href="/">
                <img src="/myntra.png" className=" w-20" alt="" />
            </Link>
            <div>
                <div className=" bg-white border-2 w-fit rounded-lg border-blue-200 flex items-center p-1 gap-2">
                    <SearchIcon />
                    <input
                        type="text"
                        className=" bg-white outline-none w-28 sm:w-52"
                    />
                </div>
            </div>
            <div className=" flex gap-4 items-center">
                {!token && (
                    <div className="flex gap-4">
                        <Link href="/register" className=" hover:text-blue-800">
                            REGISTER
                        </Link>
                        <Link href="/signIn" className=" hover:text-blue-800">
                            SIGN IN
                        </Link>
                    </div>
                )}
                {token && (
                    <div className="flex justify-center items-center gap-8">
                        <Link
                            href="/dashboard"
                            className=" hover:text-blue-800"
                        >
                            <div className="flex items-center gap-2 text-xs">
                                <div className=" bg-white p-2 rounded-full opacity-0 sm:opacity-100">
                                    {user?.img ? (
                                        //? (1)
                                        <img
                                            src={user.img}
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                    ) : (
                                        <PersonIcon />
                                    )}
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Welcome</p>
                                    <p className=" font-semibold">
                                        {user?.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link href="/" className=" hover:text-blue-800">
                            <button onClick={logoutUser}>SIGN OUT</button>
                        </Link>
                    </div>
                )}
                <Link href="/cart" className=" relative">
                    <div className=" hover:scale-125 transition-all duration-200">
                        <ShoppingCartIcon />
                    </div>
                    <div className=" absolute bg-blue-500 w-6 h-6 flex justify-center items-center -top-4 -right-2 rounded-full">
                        {cartSize ? cartSize : 0}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
