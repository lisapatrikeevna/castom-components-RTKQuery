import { baseApi } from "@/services/base-api.ts";
import { CreateDecksArgs, GetDeckByIdArgs, GetDecksArgs, GetDecksResponse } from "@/pages/flashcards.types.ts";


const decksServiece=baseApi.injectEndpoints({
 endpoints: builder => {
  return {
    createDeck: builder.mutation<void, CreateDecksArgs>({
      query: arg => {
        return {body: arg, method: 'POST', url: 'v1/decks'}
      },
      invalidatesTags:['Decks'],
    }),
    updateDeck: builder.mutation<void, CreateDecksArgs>({
      query: arg => {
        return {body: arg, method: 'PUT', url: `v1/decks/${id}`,}
      },
      invalidatesTags:['Decks']
    }),
    removeDeck: builder.mutation<void, {id: string}>({
      query (id){
        return { method: 'DELETE', url: `v1/decks/${id}`,}
      },
      invalidatesTags:['Decks']
    }),
    getDeckById: builder.query<GetDecksResponse, GetDeckByIdArgs>({
      query: ({ id }) => {
        return {url: `v1/decks/${id}`,}
      },
    }),
    getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
      query: args => {
        return {params: args ?? {}, url: `v1/decks`,}
      },
      providesTags:['Decks'],
    }),
  }
},
})

export const { useRemoveDeckMutation,useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery } = decksServiece



// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//
// const initialState = {
//   itemsPerPage: 10,
//   currentPage: 1,
//   searchByName: '',
// }
//
// export const decksSlice = createSlice({
//   initialState,
//   name: 'decksSlice',
//   reducers: {
//     setItemsPerPage: (state, action: PayloadAction<number>) => {
//       state.itemsPerPage = action.payload
//     },
//     setCurrentPage: (state, action: PayloadAction<number>) => {
//       state.currentPage = action.payload
//     },
//     setSearchByName: (state, action: PayloadAction<string>) => {
//       state.searchByName = action.payload
//     },
//   },
// })