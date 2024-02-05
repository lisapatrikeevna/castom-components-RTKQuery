import { baseApi } from "@/services/base-api.ts";
import { CardResponseType } from "@/services/cards/card.type.ts";


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
        return {
          method: "GET",
          url: `v1/decks/${id}/cards`,
          // method: "GET", url: `v1/decks/${id}/learn`,
          // params: {cardsPack_id: packId,},
        };
      },
    }),
    learnCard: builder.mutation<CardResponseType, {cardId:string,grade:number}>({
      query: ({cardId, grade }) => {
        return { method: "POST", url: `v1/decks/${cardId}/learn`, body: { cardId ,grade } };
      },
    }),
    addCard: builder.mutation<CardResponseType, {cardId:string,grade:number}>({
      query: ({cardId, grade }) => {
        return { method: "POST", url: `v1/decks/${cardId}/cards`, body: { grade } };
      },
    }),
  };
},
})

export const { useGetCardsQuery, useGetCardByIdQuery, useLearnCardMutation } = cardsServiece


