import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { Product, State } from "../utils/types";

export const useGetCategories = (onSuccess) => {
    const token = useSelector((state: State) => state.auth.accessToken);
    return useQuery(
        "categories",
        () => {
            return axios.get("http://localhost:8000/api/v1/categories", {
                // headers: {
                //   authorization: `Bearer ${token}`,
                // },
            });
        },
        {
            onSuccess: (data) => {
                data;
            },
            select: (data) => {
                const categories = data.data.data.docs;
                return categories;
            },
            // enabled: !!token,
            onSuccess: onSuccess,
        }
    );
};

export const useCreateCategory = (onSuccess: () => void, onError) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "createCategory",
        (category) => {
            return axios.post(
                "http://localhost:8000/api/v1/categories",
                category,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("categories");
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useDeleteCategory = (onSuccess) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "deleteCategory",
        (categoryId: string) => {
            return axios.delete(
                `http://localhost:8000/api/v1/collections/${categoryId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            select: (data) => {
                const category = data.data.data.category;
                return category;
            },
            onSuccess: () => {
                queryClient.invalidateQueries("collections");
                onSuccess();
            },
        }
    );
};
