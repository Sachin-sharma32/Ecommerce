import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { Product, State } from "../utils/types";

export const useGetCollections = (onSuccess) => {
    const token = useSelector((state: State) => state.auth.accessToken);
    return useQuery(
        "collections",
        () => {
            return axios.get("http://localhost:8000/api/v1/collections");
        },
        {
            onSuccess: (data) => {
                data;
                onSuccess(data);
            },
            select: (data) => {
                const collections = data.data.data.docs;
                return collections;
            },
        }
    );
};

export const useCreateCollection = (onSuccess: () => void, onError) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "createCollection",
        (product: Product) => {
            return axios.post(
                "http://localhost:8000/api/v1/collections",
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
                queryClient.invalidateQueries("collections");
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useDeleteCollection = (onSuccess) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: State) => state.auth.accessToken);
    return useMutation(
        "deleteCollection",
        (collectionId: string) => {
            return axios.delete(
                `http://localhost:8000/api/v1/collections/${collectionId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            select: (data) => {
                const collection = data.data.data.collection;
                return collection;
            },
            onSuccess: () => {
                queryClient.invalidateQueries("collections");
                onSuccess();
            },
        }
    );
};
