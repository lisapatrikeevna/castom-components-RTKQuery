import { baseApi } from "@/services/base-api.ts";
import { CreateDecksArgs, GetDeckByIdArgs, GetDecksArgs, GetDecksResponse, UpdateDecksArgs } from "@/pages/flashcards.types.ts";
import { RootStateType } from "@/services/store.ts";


const decksServiece = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<void, CreateDecksArgs>({
        query: arg => {
          return {body: arg, method: 'POST', url: 'v1/decks'}
        }, invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<void, {id: string, body: UpdateDecksArgs}>({
        //pissimistik Update
        // onQueryStarted: async({id: string, ...body}, {dispatch, getState, queryFulfilled}) => {
        //   // onQueryStarted:async (arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void =>{
        //  const state=getState() as RootStateType
        //   const currentPage=state.decks.currentPage
        //   dispatch(decksServiece.util.updateQueryData('getDecks'), )
        //
        //   await queryFulfilled
        // },
        query: ({id, body}) => {
          return {
            body, method: 'PATCH', url: `v1/decks/${id}`,
          }
        }, invalidatesTags: ['Decks']
      }), removeDeck: builder.mutation<void, {id: string}>({
        query(id) {
          return {method: 'DELETE', url: `v1/decks/${id}`,}
        }, invalidatesTags: ['Decks']
      }), getDeckById: builder.query<GetDecksResponse, GetDeckByIdArgs>({
        query: ({id}) => {
          return {url: `v1/decks/${id}`,}
        },
      }), getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        query: args => {
          return {params: args ?? {}, url: `v1/decks`,}
        }, providesTags: ['Decks'],
      }),
    }
  },
})

export const {useRemoveDeckMutation, useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery, useUpdateDeckMutation} = decksServiece


