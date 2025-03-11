import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api" }),
  tagTypes: ["Users", "Admins"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit, status, search }) => {
        let queryString = `users?page=${page}&limit=${limit}`;
        if (status && status !== "all") {
          queryString += `&status=${status}`;
        }
        if (search) {
          queryString += `&search=${search}`;
        }
        return queryString;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({ type: "Users", id: _id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    getAdmins: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        let queryString = `users?page=${page}&limit=${limit}&role=admin`; // Fetch only admins
        if (search) {
          queryString += `&search=${search}`;
        }
        return queryString;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({ type: "Admins", id: _id })),
              { type: "Admins", id: "LIST" },
            ]
          : [{ type: "Admins", id: "LIST" }],
    }),

    getUsersByTrainee: builder.query({
      query: (traineeId) => `trainees/${traineeId}/users`,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({ type: "Users", id: _id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    addUser: builder.mutation({
      query: ({ traineeId, username, email, password }) => ({
        url: `trainees/${traineeId}/users`,
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: { username, email, password },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ userId, updatedData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Users"], 
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetAdminsQuery,
  useGetUsersByTraineeQuery,
  useUpdateUserStatusMutation,
} = userApi;
