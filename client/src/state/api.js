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
    "Users",
    "Events"
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
      query: (year) => `clients/clientStats/${year}`,
      providesTags: ["clients"],
    }),
    getAllAgencies: build.query({
      query: () => "agencies/getAllAgencies",
      providesTags: ["agencies"],
    }),

    getFlagStats: build.query({
      query: (year) => `clients/flagStats/${year}`,
      providesTags: ["clients"],
    }),

    getProfessionPieChart: build.query({
      query: () => "clients/professionStats",
      providesTags: ["clients"],
    }),


    getAllClients: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/getAllClients",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
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
      query: (year) => `clients/membershipStats/${year}`,
      providesTags: ["clients"],
    }),



    getRevenueHistoStats: build.query({
      query: (year) => `clients/getRevenueHistoStats/${year}`,
      providesTags: ["clients"],
    }),

    getProfessionStats: build.query({
      query: (year) => `clients/getProfessionStats/${year}`,
      providesTags: ["clients"],
    }),

    getAggregateDataByAgeRanges: build.query({
      query: () => "clients/getAggregateDataByAgeRanges",
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

    getMonthlyTransactionCounts: build.query({
      query: () => "virements/getMonthlyTransactionCounts",
      providesTags: ["Virements"],
    }),

    getVirementCountByEtat: build.query({
      query: () => "virements/getVirementCountByEtat",
      providesTags: ["Virements"],
    }),

    getChequierCountByEtat: build.query({
      query: () => "chequiers/getChequierCountByEtat",
      providesTags: ["Chequiers"],
    }),

    getMonthlyChequierCounts: build.query({
      query: () => "chequiers/getMonthlyChequierCounts",
      providesTags: ["Chequiers"],
    }),

    getUsers: build.query({
      query: () => "users/getUsers",
      providesTags: ["User"],
    }),

    getCountFlagViso: build.query({
      query: () => "clients/flagVisio",
      providesTags: ["clients"],
    }),

    getMontantCreditStats: build.query({
      query: () => "credits/getMontantCreditStats",
      providesTags: ["Credits"],
    }),

    getCreditCountByType: build.query({
      query: () => "credits/getCreditCountByType",
      providesTags: ["Credits"],
    }),

    getCreditCountByEtat: build.query({
      query: () => "credits/getCreditCountByEtat",
      providesTags: ["Credits"],
    }),

    getAllEvents: build.query({
      query: () => "events/get-events",
      providesTags: ["Events"],
    }),



  })
})

export const {
  useGetUserQuery,
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
  useGetUsersQuery,
  useGetCountFlagVisoQuery,
  useGetMontantCreditStatsQuery,
  useGetCreditCountByEtatQuery,
  useGetVirementCountByEtatQuery,
  useGetMonthlyTransactionCountsQuery,
  useGetAggregateDataByAgeRangesQuery,
  useGetAllClientsQuery,
  useGetChequierCountByEtatQuery,
  useGetMonthlyChequierCountsQuery,
  useGetFlagStatsQuery,
  useGetCreditCountByTypeQuery,
  useGetRevenueHistoStatsQuery,
  useGetProfessionStatsQuery,
  useGetAllEventsQuery
} = api;
