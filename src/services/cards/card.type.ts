import { CardTypeAuthor } from "@/pages/cards/cardsPage.tsx";

export type createCardType = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string

}
export type ArgCreateCardType = {}
export type CardResponseType = {
  grade: number;
  id: string;
  deckId: string;
  userId: string;
  question: string;
  answer: string;
  shots: number;
  answerImg: string;
  questionImg: string;
  questionVideo: string;
  answerVideo: string;
  created: string;
  updated: string;
}
export type cardItemType = {
  author: CardTypeAuthor;
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
  shots: number;
  cover?: string;
  created: string;
  updated: string;
  cardsCount: number;
}