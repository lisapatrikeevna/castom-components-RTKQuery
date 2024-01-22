import { useGetDeckByIdQuery } from "@/services/decks/decks.servies.ts"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/ui/table";
import s from "@/pages/desksPage/desksPage.module.scss";
import { useSelector } from "react-redux";
import { RootStateType } from "@/services/store.ts";
import { useGetCardsQuery } from "@/services/cards/cards.servies.ts";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
// import { Button } from "@/components/ui/button";
// import PlayIcon from "@/assets/icons/playIcon.tsx";
// import EditIcon from "@/assets/icons/editIcon.tsx";
// import TrashIcon from "@/assets/icons/trashIcon.tsx";


// items:
//   Array(10)
// 0 :
// author : {id: '5b2174ce-9499-4693-9a73-026e01cd9ed4', name: 'Серый'}
// cardsCount: 25
// cover : "https://andrii-flashcards.s3.eu-central-1.amazonaws.com/83d0a27d-bb68-4e01-891c-7bb7d5172b69-%C3%91%C2%84%C3%91%C2%83%C3%91%C2%82%C3%90%C2%B1%C3%90%C2%BE%C3%90%C2%BB.jpeg"
// created:"2024-01-03T15:06:19.750Z"
// id :"clqxwvbol01ymzk2v43xn1vxx"
// isBlocked : null
// isDeleted : null
// isPrivate :  false
// name : "Футбол и футболисты"
// shots : 0
// updated: "2024-01-04T19:02:12.915Z"
// userId :"5b2174ce-9499-4693-9a73-026e01cd9ed4"
// 1: {id: 'clq87myrc00r3qg2vgy1zsk2x', userId: 'd890572a-fd9a-4dd4-985a-56a5c4a20c4c', name: '6666', isPrivate: false, shots: 0, …}
// 2: {id: 'clqzfpd7m031rzk2vnpgaui9w', userId: 'f2be95b9-4d07-4751-a775-bd612fc9553a', name: 'Vika', isPrivate: false, shots: 0, …}
// 3 : {id: 'clqzf35qs031hzk2vc9ule8l1', userId: 'f2be95b9-4d07-4751-a775-bd612fc9553a', name: 'Leao', isPrivate: false, shots: 0, …}

//getCardById
export type cardType = {
  author: CardTypeAuthor;
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
  shots: number;
  cover: string;
  created: string;
  updated: string;
  cardsCount: number;
}
export type CardTypeAuthor = {
  id: string; name: string;
}
const CardsPage = () => {
  const id = useSelector<RootStateType, string>(state => state.app.decksId)
  const name = useSelector<RootStateType, string>(state => state.app.decksName)
  const imgUrl = useSelector<RootStateType, string>(state => state.app.decksImg)
  // const {data,isError} = useGetCardsQuery(id)
  const {data,isError} = useGetCardsQuery(id??'')
  console.log(data);

  if (isError || !data) {
    return <div>...loading</div>
  }

  return (
    <div>
      <div >
        <div>
          <Typography as={'h3'}> {name}</Typography>
          {imgUrl.length && <img src={imgUrl} alt={name}/>}
        </div>
        <Button onClick={()=>{}}>lern</Button>
      </div>
    <Table>
      <TableHead className={s.tableHead}>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last Updated</TableHeadCell>
          <TableHeadCell>Created by</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.items.length && data.items.map(el => {
          console.log(el)
          return (<TableRow key={el.id}>
              {/*<TableCell>{el.name}</TableCell>*/}
              <TableCell>{el.questionImg && <img src={el.questionImg}/>}</TableCell>
              <TableCell>{el.question}</TableCell>
              <TableCell>{el.answerImg && <img src={el.answerImg}/>}</TableCell>
              <TableCell>{el.answer}</TableCell>
              <TableCell>{new Date(el.created).toLocaleDateString()}</TableCell>
            </TableRow>)
        })}
      </TableBody>
    </Table>
  </div>);
};

export default CardsPage;