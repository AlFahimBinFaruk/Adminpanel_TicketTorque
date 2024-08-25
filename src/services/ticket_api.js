import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const ticket_api = createApi({
    reducerPath: 'ticket_api',
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
    tagTypes: ["Ticket"],
    endpoints: (builder) => ({

        createNewTicket:builder.mutation({
            query:(data)=>({
                url:"/ticket/add-new",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Ticket"]
        }),

        updateTicket:builder.mutation({
            query:({id,...data})=>({
                url:`/ticket/update/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Ticket"]
        }),

        deleteTicket:builder.mutation({
            query:(id)=>({
                url:`/ticket/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Ticket"]
        }),

        getTicketList:builder.query({
            query:()=>({
                url:"/ticket/all",
                method:"GET"
            }),
            providesTags:["Ticket"]
        }),

        getTicketDetails:builder.query({
            query:(id)=>({
                url:`/ticket/details/${id}`,
                method:"GET"
            }),
            providesTags:["Ticket"]
        })
        







    }),
});

export const {

    useCreateNewTicketMutation,
    useUpdateTicketMutation,
    useGetTicketListQuery,
    useDeleteTicketMutation,
    useGetTicketDetailsQuery






} = ticket_api;