import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../app/slices";

export const useGetCart = (userId) => {
    const dispatch = useDispatch();
    return useQuery(
        "getCart",
        () => {
            return axios.get(`http://localhost:8000/api/v1/carts/${userId}`);
        },
        {
            select: (data) => {
                const cart = data.data.data.doc;
                return cart;
            },
            onSuccess: (data) => {
                dispatch(setCart(data));
            },
            enabled: !!userId,
        }
    );
};

export const useAddToCart = (cartId, quantity) => {
    const queryClient = useQueryClient();
    return useMutation(
        "addToCart",
        (productId) => {
            return axios.patch(
                `http://localhost:8000/api/v1/carts/addToCart/${cartId}`,
                {
                    product: productId,
                    quantity: quantity ? quantity : 1,
                }
            );
        },
        {
            enabled: !!cartId,
            onSuccess: (data) => {
                queryClient.setQueryData("getCart", (oldData) => {
                    return data;
                });
            },
        }
    );
};

export const useRemoveFromCart = (cartId, onSuccess) => {
    const queryClient = useQueryClient();
    return useMutation(
        "removeFromCart",
        (productId, quantity) => {
            return axios.patch(
                `http://localhost:8000/api/v1/carts/removeFromCart/${cartId}`,
                {
                    product: productId,
                    quantity: quantity ? quantity : 1,
                }
            );
        },
        {
            enabled: !!cartId,
            onSuccess: async (data) => {
                queryClient.setQueryData("getCart", () => {
                    return data;
                });
            },
            onSuccess: onSuccess,
        }
    );
};
