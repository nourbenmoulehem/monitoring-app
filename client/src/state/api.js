import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Total",
    "Admins",
    "Performance",
    "Dashboard",
    "clients",
    "agencies"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getTotalClients: build.query({
      query: () => "total/totalClients",
      providesTags: ["Total"],
    }),
    
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getClientsStatYearly: build.query({
      query: () => "clients/clientStats",
      providesTags: ["clients"],
    }),
    getAllAgencies: build.query({
      query: () => "agencies/getAllAgencies",
      providesTags: ["agencies"],
    }),

    getProfessionPieChart: build.query({
      query: () => "clients/professionStats",
      providesTags: ["clients"],
    }),
    
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetTotalClientsQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetClientsStatYearlyQuery,
  useGetAllAgenciesQuery,
  useGetProfessionPieChartQuery
} = api;
