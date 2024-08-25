import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const location_api = createApi({
  reducerPath: "location_api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      // getState().auth.token ||
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["Location"],
  endpoints: (builder) => ({
    getLocationList: builder.query({
      query: () => ({
        url: "/location/all",
        method: "GET",
      }),
      providesTags: ["Location"],
    }),

    getLocationDetails: builder.query({
      query: (id) => ({
        url: `/location/details/${id}`,
        method: "GET",
      }),
      providesTags: ["Location"],
    }),

    createNewLocation: builder.mutation({
      query: (data) => ({
        url: "/location/add-new",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Location"],
    }),

    updateLocation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/location/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Location"],
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/location/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationListQuery,
  useGetLocationDetailsQuery,
  useCreateNewLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = location_api;
