import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../utils/types";
import { setRatings } from "../app/slices";

export const useGetRatings = () => {
  const dispatch = useDispatch();
  return useQuery(
    "ratings",
    () => {
      return axios.get(`http://localhost:8000/api/v1/ratings`);
    },
    {
      select: (data) => {
        const ratings = data.data.data.docs;
        return ratings;
      },
      onSuccess: (data) => {
        dispatch(setRatings(data));
      },
    }
  );
};

export const useGetRating = (ratingId: string) => {
  return useQuery(
    "getRating",
    () => {
      return axios.get(`http://localhost:8000/api/v1/ratings/${ratingId}`);
    },
    {
      select: (data) => {
        const rating = data.data.data.doc;
        return rating;
      },
    }
  );
};

export const useCreateRating = (onSuccess: () => void, onError) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: State) => state.auth.accessToken);
  return useMutation(
    "createRating",
    (rating) => {
      return axios.post("http://localhost:8000/api/v1/ratings", rating, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ratings");
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useDeleteRating = (onSuccess) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: State) => state.auth.accessToken);
  return useMutation(
    "deleteRating",
    (ratingId: string) => {
      return axios.delete(`http://localhost:8000/api/v1/products/${ratingId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
    {
      select: (data) => {
        const rating = data.data.data.rating;
        return rating;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        onSuccess();
      },
    }
  );
};
