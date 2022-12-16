import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slices";
import { CreateUser, LogIn, State, UpdateAddress, UpdateUser, User } from "../utils/types";

export const useRegister = (onSuccess, onError) => {
    return useMutation(
        "register",
        (user: CreateUser) => {
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

export const useLogin = (onSuccess: (data: any) => void, onError) => {
    return useMutation(
        (user: LogIn) => {
            return axios.post("http://localhost:8000/api/v1/auth/login", user, {
                //? 8
                withCredentials: true,
            });
        },
        {
            onSuccess: onSuccess,
            onError: onError
        }
    );
};

export const useRefresh = (onSuccess) => {
    return useQuery(
        "refresh",
        () => {
            return axios.get("http://localhost:8000/api/v1/auth/refresh", {
                withCredentials: true,
            });
        },
        {
            refetchInterval: 1000 * 20,
            refetchIntervalInBackground: true,
            onSuccess: onSuccess,
            select: (data) => {
                const accessToken = data?.data.token;
                return accessToken;
            },
        }
    );
};


export const useGetMe = (onSuccess?: (user: User) => void) => {
    const token = useSelector((state: State) => state.auth.accessToken);
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
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            enabled: !!token,
            select: (data) => {
                const user = data.data.data.user;
                return user;
            },
            onSuccess: onSuccess,
        }
    );
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

export const useUpdateUser = (userId: string, onSuccess?: () => void, onError?: (error?: any) => void) => {
    const token = useSelector((state: State) => state.auth.accessToken);
    const queryClient = useQueryClient();
    return useMutation(
        "updateUser",
        (data: UpdateUser | UpdateAddress) => {
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
                onSuccess()
            },
            onError: onError
        }
    );
};
