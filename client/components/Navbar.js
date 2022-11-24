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

const Navbar = () => {
    const dispatch = useDispatch();

    const clientCart = useSelector((state) => state.auth.cart);

    const onSuccess = (accessToken) => {
        dispatch(setToken(accessToken));
    };

    const onError = () => {
        dispatch(setToken(null));
    };

    const token = useSelector((state) => state.auth.accessToken);
    // //? 6
    let decodedJwt;
    if (token) {
        decodedJwt = jwtDecode(token);
    }
    //? 5 - refresh access token after expiration
    const { data: accessToken } = useRefresh(onSuccess, onError);

    //? 7 - run before every

    const { mutate: logOut } = useLogout();

    const logoutUser = () => {
        dispatch(setToken(null));
        logOut();
    };

    const onUserSuccess = (user) => {
        dispatch(setUser(user));
    };
    const { data: user } = useGetMe(onUserSuccess);
    const { data: cart } = useGetCart(user?._id);
    let cartSize;
    if (clientCart) {
        if (clientCart.products.length === 0) {
            cartSize = 0;
        } else {
            cartSize = clientCart.products.reduce((acc, product) => {
                return acc + product.quantity;
            }, 0);
        }
    }

    return (
        <div className=" flex justify-between p-4 pt-6 items-center bg-blue-400 rounded-t-none fixed top-0 w-[100%] h-[4rem] bg-opacity-50 z-10 backdrop-blur-lg">
            <Link href="/">
                <img src="/myntra.png" className=" w-20" />
            </Link>
            <div>
                <div className=" bg-white border-2 w-fit rounded-lg border-blue-200 flex items-center p-1 gap-2">
                    <SearchIcon />
                    <input type="text" className=" bg-white outline-none" />
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
                                <div className=" bg-white p-2 rounded-full">
                                    {user?.img ? (
                                        //? (1)
                                        <img
                                            src={user.img}
                                            width={20}
                                            height={20}
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
