import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const order_api = createApi({
    reducerPath: 'order_api',
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
    tagTypes: ["Order"],
    endpoints: (builder) => ({


       

        getAllOrderList:builder.query({
            query:()=>({
                url:"/order/all"
            }),
            providesTags:["Order"]
        }),

        getOrderDetails:builder.query({
            query:(id)=>({
                url:`/order/details/${id}`
            }),
            providesTags:["Order"]
        }),

        updateOrder:builder.mutation({
            query:(data)=>({
                url:"/order/update",
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Order"]
        })



        








    }),
});

export const {

    useGetAllOrderListQuery,
    useGetOrderDetailsQuery,
    useUpdateOrderMutation
    






} = order_api;