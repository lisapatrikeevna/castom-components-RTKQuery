import { baseApi } from "@/services/base-api.ts";
import { CardResponseType, createCardType } from "@/services/cards/card.type.ts";


// 1 параметр - тип того, что возвращает сервер (ResultType)
// 2 параметр - тип query аргументов (QueryArg)
const cardsServiece=baseApi.injectEndpoints({
 endpoints: builder => {
  return {
    getCardById: builder.query<CardResponseType, string>({
      query: (id) => {
        return { url: `v1/cards/${id}` };
      },
    }),
    getCards: builder.query<any, string>({
      query: (id) => {
        return {method: "GET", url: `v1/decks/${id}/cards`,}
      },providesTags: ['Cards']
    }),
    learnCard: builder.mutation<CardResponseType, {cardId:string,grade:number}>({
      query: ({cardId, grade }) => {
        return { method: "POST", url: `v1/decks/${cardId}/learn`, body: { cardId ,grade } };
      },
    }),
    addCard: builder.mutation<CardResponseType, {deckId:string,body:createCardType}>({
      query: ({deckId, body }) => {
        return { method: "POST", url: `v1/decks/${deckId}/cards`, body };
      },
    }),
    removeCard: builder.mutation<void, {id: string}>({
      query(id) {
        return {method: 'DELETE', url: `v1/cards/${id}`,}
      }, invalidatesTags: ['Cards']
    })
  };
},
})

export const { useGetCardsQuery, useGetCardByIdQuery, useLearnCardMutation, useAddCardMutation } = cardsServiece


