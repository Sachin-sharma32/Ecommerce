import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../app/slices";
import { State } from "../utils/types";

export const useGetWishList = (userId: string) => {
  const dispatch = useDispatch();
  const token = useSelector((state: State) => state.auth.accessToken)
  return useQuery(
    "getWishList",
    () => {
      return axios.get(`http://localhost:8000/api/v1/wishLists/${userId}`, {
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
        dispatch(setWishList(data));
      },
      enabled: !!userId,
    }
  );
};

export const useAddToWishList = (wishListId: string, onSuccess?: () => void, onError?: (err) => void) => {
  const dispatch = useDispatch()
  const token = useSelector((state: State) => state.auth.accessToken)
  return useMutation(
    "addToWishList",
    (productObject: { productId: string, color: string, size: string }) => {
      return axios.patch(
        `http://localhost:8000/api/v1/wishLists/addToWishList/${wishListId}`,
        {
          product: productObject.productId,
          color: productObject.color,
          size: productObject.size,
        },
        {

          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
    },
    {
      enabled: !!wishListId,
      onSuccess: (data) => {
        dispatch(setWishList(data.data.data.doc))
        onSuccess()
      },
      onError: onError
    }
  );
};

export const useRemoveFromWishList = (wishListId: string, onSuccess: (data: any) => void) => {
  const token = useSelector((state: State) => state.auth.accessToken)
  return useMutation(
    "removeFromWishList",
    (product: { productId: string, }) => {
      return axios.patch(
        `http://localhost:8000/api/v1/wishLists/removeFromWishList/${wishListId}`,
        {
          product: product.productId,
        }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      );
    },
    {
      enabled: !!wishListId,
      onSuccess: onSuccess
    }
  );
};
