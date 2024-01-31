import { baseApi } from "@/services/base-api.ts";
import { CreateDecksArgs, GetDeckByIdArgs, GetDecksArgs, GetDecksResponse, UpdateDecksArgs } from "@/pages/flashcards.types.ts";


const decksServiece=baseApi.injectEndpoints({
 endpoints: builder => {
  return {
    createDeck: builder.mutation<void, CreateDecksArgs>({
      query: arg => {
        return {body: arg, method: 'POST', url: 'v1/decks'}
      },
      invalidatesTags:['Decks'],
    }),
    updateDeck: builder.mutation<void, UpdateDecksArgs>({
      query: (arg) => {
        console.log('!!!!!updateDeck arg', arg,arg.id);
        debugger
        return {body: {cover:arg.cover, name:arg.name, isPrivate:arg.isPrivate},
          method: 'PATCH', url: `v1/decks/${arg.id}`,}
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

export const { useRemoveDeckMutation,useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery,useUpdateDeckMutation } = decksServiece



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