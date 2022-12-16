import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../app/slices";
import { State } from "../utils/types";
import { color } from "@mui/system";

export const useGetCart = (userId: string) => {
    const dispatch = useDispatch();
    const token = useSelector((state: State) => state.auth.accessToken)
    return useQuery(
        "getCart",
        () => {
            return axios.get(`http://localhost:8000/api/v1/carts/${userId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        },
        {
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            select: (data) => {
                const cart = data.data.data.doc;
                return cart;
            },
            onSuccess: (data) => {
                ('refetch')
                dispatch(setCart(data));
            },
            enabled: !!userId,
        }
    );
};

export const useAddToCart = (cartId: string, onSuccess?: () => void, onError?: (err: any) => void) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const token = useSelector((state: State) => state.auth.accessToken)
    return useMutation(
        "addToCart",
        (productObject: { productId: string, quantity?: number, color?: string, size?: string, itemId?: string }) => {
            return axios.patch(
                `http://localhost:8000/api/v1/carts/addToCart/${cartId}`,
                {
                    product: productObject.productId,
                    color: productObject.color,
                    size: productObject.size,
                    quantity: productObject.quantity,
                    itemId: productObject.itemId
                },
                {

                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
        },
        {
            enabled: !!cartId,
            onSuccess: (data) => {
                dispatch(setCart(data.data.data.doc))
                onSuccess()
            },
            onError: onError
        }
    );
};

export const useRemoveFromCart = (cartId: string, onSuccess: (data: any) => void) => {
    const token = useSelector((state: State) => state.auth.accessToken)

    return useMutation(
        "removeFromCart",
        (product: { productId: string, quantity?: number }) => {
            (product)
            return axios.patch(
                `http://localhost:8000/api/v1/carts/removeFromCart/${cartId}`,
                {
                    product: product.productId,
                    quantity: product.quantity ? product.quantity : 1,
                }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            );
        },
        {
            enabled: !!cartId,
            onSuccess: onSuccess
        }
    );
};
