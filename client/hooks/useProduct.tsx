import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { Product, State } from "../utils/types";

export const useGetProducts = (onSuccess) => {
    const token = useSelector((state: State) => state.auth.accessToken);
    return useQuery(
        "products",
        () => {
            return axios.get("http://localhost:8000/api/v1/products", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        },
        {
            select: (data) => {
                const products = data.data.data.docs;
                return products;
            },
            enabled: !!token,
            onSuccess: onSuccess
        }
    );
};

export const useGetProduct = (productId: string, onSuccess) => {
    const token = useSelector((state: State) => state.auth.accessToken);
    return useQuery(
        "product",
        () => {
            return axios.get(
                `http://localhost:8000/api/v1/products/${productId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            select: (data) => {
                const product = data.data.data.doc;
                return product;
            },
            enabled: !!token,
            onSuccess: onSuccess,
        }
    );
};

export const useCreateProduct = (onSuccess: () => void, onError) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "createProduct",
        (product: Product) => {
            return axios.post(
                "http://localhost:8000/api/v1/products",
                product,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("products");
                onSuccess()
            },
            onError: onError
        }
    );
};

export const useUpdateProduct = (productId: string, onSuccess, onError) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "updateProduct",
        (product: Product) => {
            return axios.patch(
                `http://localhost:8000/api/v1/products/${productId}`,
                product,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("products");
                onSuccess()
            },
            onError: onError
        }
    );
};

export const useDeleteProduct = (onSuccess) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "deleteProduct",
        (productId: string) => {
            return axios.delete(
                `http://localhost:8000/api/v1/products/${productId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            select: (data) => {
                const product = data.data.data.product;
                return product;
            },
            onSuccess: () => {
                queryClient.invalidateQueries("products");
                onSuccess()
            },
        }
    );
};
