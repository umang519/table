import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const traineeApi = createApi({
  reducerPath: "traineeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api" }),
  tagTypes: ["Trainees"], 
  
  endpoints: (builder) => ({
    getTrainees: builder.query({
      query: (adminId) => {
        if (!adminId) throw new Error("Admin ID is required");
        return `/trainees?adminId=${adminId}`;
      },
      providesTags: ["Trainees"],
    }),

    addTrainee: builder.mutation({
      query: (traineeData) => ({
        url: "/trainees",
        method: "POST",
        body: traineeData,
      }),
      invalidatesTags: ["Trainees"], 
    }),

    updateTrainee: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/trainees/${id}`,
        method: "PUT",
        body: updatedData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Trainees"],
    }),

    deleteTrainee: builder.mutation({
      query: (id) => ({
        url: `/trainees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trainees"],
    }),
  }),
});

export const { useGetTraineesQuery, useAddTraineeMutation, useUpdateTraineeMutation, useDeleteTraineeMutation } = traineeApi;
