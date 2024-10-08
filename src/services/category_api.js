import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const category_api = createApi({
    reducerPath: 'category_api',
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
        }
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({

        getCategoryList: builder.query({
            query: () => ({
                url: "/category/all",
                method: "GET"
            }),
            providesTags: ["Category"]
        }),


        getCategoryDetails: builder.query({
            query: (id) => ({
                url: `/category/details/${id}`,
                method: "GET"
            }),
            providesTags: ["Category"]
        }),



        createNewCategory: builder.mutation({
            query: (data) => ({
                url: "/category/add-new",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),

        updateCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/category/update/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),


        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]
        })








    }),
});

export const {


    useGetCategoryListQuery,
    useGetCategoryDetailsQuery,
    useCreateNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation





} = category_api;