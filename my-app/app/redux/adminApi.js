import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://table-uxu6.onrender.com/api" }),
  tagTypes: ["Admin"], // Enables automatic cache invalidation

  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/admins",
      providesTags: ["Admin"],
    }),

    addAdmin: builder.mutation({
      query: (newAdmin) => ({
        url: "/admins",
        method: "POST",
        body: newAdmin,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Admin"], // Auto-refresh admin list
    }),

    updateAdmin: builder.mutation({
        query: ({ id, ...updatedData }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: updatedData,
          headers: { "Content-Type": "application/json" },
        }),
        invalidatesTags: ["Admin"],
      }),
  
      deleteAdmin: builder.mutation({
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Admin"],
      }),
  }),
});

export const { useGetAdminsQuery, useAddAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } = adminApi;
