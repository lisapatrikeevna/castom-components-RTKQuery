
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from "@/services/base-query-with-reauth.ts";

// fetchBaseQuery-выполняет функции axios
export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes:['Decks','Me'],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://api.flashcards.andrii.es',
  //   credentials: 'include',
  //   // prepareHeaders: headers => {
  //   //   headers.append('x-auth-skip', 'true')
  //   // },
  // }),
  baseQuery: baseQueryWithReauth,
  endpoints:()=>({}),
  // refetchOnFocus: true,
})

