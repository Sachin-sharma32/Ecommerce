import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slices";

export const useRegister = (onSuccess, onError) => {
    return useMutation(
        "register",
        (user) => {
            return axios.post(
                "http://localhost:8000/api/v1/auth/register",
                user
            );
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useLogin = (onSuccess, onError) => {
    return useMutation(
        (user) => {
            return axios.post("http://localhost:8000/api/v1/auth/login", user, {
                //? 8
                withCredentials: true,
            });
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useRefresh = (onSuccess, onError) => {
    return useQuery(
        "refresh",
        () => {
            return axios.get("http://localhost:8000/api/v1/auth/refresh", {
                withCredentials: true,
            });
        },
        {
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const accessToken = data?.data.token;
                return accessToken;
            },
        }
    );
};

export const useGetMe = (onSuccess) => {
    const token = useSelector((state) => state.auth.accessToken);
    return useQuery(
        "me",
        () => {
            return axios.get("http://localhost:8000/api/v1/users/getMe", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        },
        {
            enabled: !!token,
            select: (data) => {
                const user = data.data.data.user;
                return user;
            },
            onSuccess: onSuccess,
        }
    );
};

export const useCreateCart = () => {
    return useMutation("createCart", (userData) => {
        return axios.post("http://localhost:8000/api/v1/carts", {
            userId: userData.data.data.newUser._id,
            products: [],
        });
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation(
        "logout",
        () => {
            return axios.post(
                "http://localhost:8000/api/v1/auth/logout",
                {},
                { withCredentials: true }
            );
        },
        {
            onSuccess: () => {
                dispatch(setUser(null));

            },
        }
    );
};

export const useUpdateUser = (userId) => {
    const token = useSelector((state) => state.auth.accessToken);
    const queryClient = useQueryClient();
    return useMutation(
        "updateUser",
        (data) => {
            return axios.patch(
                `http://localhost:8000/api/v1/users/${userId}`,
                data,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            enabled: !!userId,
            onSuccess: () => {
                queryClient.invalidateQueries("me");
            },
        }
    );
};
