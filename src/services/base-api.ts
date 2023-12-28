import {
  CreateDecksArgs,
  GetDeckByIdArgs,
  GetDecksArgs,
  GetDecksResponse,
} from '@/pages/flashcards.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDeck: builder.mutation<void, CreateDecksArgs>({
        query: arg => {
          return {
            body: arg,
            method: 'POST',
            url: 'v1/decks',
          }
        },
      }),
      getDeckById: builder.query<GetDecksResponse, GetDeckByIdArgs>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
          }
        },
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        query: args => {
          return {
            params: args ?? {},
            url: `v1/decks`,
          }
        },
      }),
    }
  },
  reducerPath: 'baseApi',
  // refetchOnFocus: true,
})

export const { useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery } = baseApi
