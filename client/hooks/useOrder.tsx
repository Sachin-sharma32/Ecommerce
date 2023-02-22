import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { State } from "../utils/types";
import { useDispatch } from "react-redux";
import { setOrders } from "../app/slices";

export const useGetOrders = () => {
    const token = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    return useQuery(
        "getAllOrders",
        () => {
            return axios.get("http://localhost:8000/api/v1/orders", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        },
        {
            onSuccess: (data) => {
                dispatch(setOrders(data.data.data.docs));
            },
            enabled: !!token,
        }
    );
};

export const useUpdateOrder = (onSuccess) => {
    const token = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    return useMutation(
        "updateOrder",
        (object: { orderId: string; status: string }) => {
            object;
            return axios.patch(
                `http://localhost:8000/api/v1/orders/${object.orderId}`,
                { status: object.status },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        {
            enabled: !!token,
            onSuccess: onSuccess,
        }
    );
};
