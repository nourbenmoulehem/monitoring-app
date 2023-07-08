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
    "agencies",
    "Chequiers",
    "Credits",
    "Virements",
    "Users"
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

    getAgregateTotalClients: build.query({
      query: () => "clients/totalClients",
      providesTags: ["clients"],
    }),

    getRevenueStats: build.query({
      query: () => "clients/revenueStats",
      providesTags: ["clients"],
    }),

    getMemberShipStats: build.query({
      query: () => "clients/membershipStats",
      providesTags: ["clients"],
    }),

    getChequiers: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "chequiers/getChequiers",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Chequiers"],
    }),

    getCredits: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "credits/getCredits",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Chequiers"],
    }),

    getVirements: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "virements/getVirements",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Virements"],
    }),

    getAllUsers: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "users/getUsers",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Users"],
    }),



  })
})

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
  useGetProfessionPieChartQuery,
  useGetAgregateTotalClientsQuery,
  useGetRevenueStatsQuery,
  useGetMemberShipStatsQuery,
  useGetChequiersQuery,
  useGetCreditsQuery,
  useGetVirementsQuery,
  useGetAllUsersQuery
} = api;
