export type createCardType={
  question :string
  answer : string
  questionImg?:string
  answerImg?:string
  questionVideo?:string
  answerVideo?:string

}
export type cardsResponseType ={

}
export type GetCardsType = {
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
export type ArgCreateCardType={

}