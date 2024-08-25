import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const vehicle_api = createApi({
    reducerPath: "vehicle_api",
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
    tagTypes: ["Vehicle"],
    endpoints: (builder) => ({


        getVehicleList: builder.query({
            query: () => ({
                url: "/vehicle/all",
                method: "GET",
            }),
            providesTags: ["Vehicle"],
        }),

        getVehicleDetails: builder.query({
            query: (id) => ({
                url: `/vehicle/details/${id}`,
                method: "GET",
            }),
            providesTags: ["Vehicle"],
        }),

        createNewVehicle: builder.mutation({
            query: (data) => ({
                url: "/vehicle/add-new",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Vehicle"],
        }),

        updateVehicle: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/vehicle/update/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Vehicle"],
        }),

        deleteVehicle: builder.mutation({
            query: (id) => ({
                url: `/vehicle/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Vehicle"],
        }),
    }),
});

export const {

    useGetVehicleListQuery,
    useGetVehicleDetailsQuery,
    useCreateNewVehicleMutation,
    useUpdateVehicleMutation,
    useDeleteVehicleMutation
} = vehicle_api;
