import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/ui/table";
import s from "./cardPage.module.scss";
import { useSelector } from "react-redux";
import { RootStateType } from "@/services/store.ts";
import { useGetCardsQuery } from "@/services/cards/cards.servies.ts";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";



//getCardById
export type cardType = {
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
export type CardTypeAuthor = {
  id: string; name: string;
}
const CardsPage = () => {
  const id = useSelector<RootStateType, string>(state => state.app.decksId)
  const name = useSelector<RootStateType, string>(state => state.app.decksName)
  const imgUrl = useSelector<RootStateType, string>(state => state.app.decksImg)
  const {data,isError} = useGetCardsQuery(id)
  // const {data,isError} = useGetCardsQuery(id??'')
  console.log("data", data);

  if (isError || !data) {
    return <div>...loading</div>
  }

  return (
    <div className={s.container}>
      <div  className={s.cartInfo}>
        <div className={s.headingCart}>
          <Typography as={'h3'} className={s.deskTitle}> {name}</Typography>
          {imgUrl && <div className={s.imgContainer}><img src={imgUrl} alt={name}/></div>}
        </div>
        <Button onClick={()=>{}}>lern</Button>
      </div>
      {!data?
      <div>
        <Typography>This pack is empty</Typography>
      </div>:
        <Table>
          <TableHead className={s.tableHead}>
            <TableRow>
              <TableHeadCell>Question</TableHeadCell>
              <TableHeadCell>Answer</TableHeadCell>
              <TableHeadCell>Last Updated</TableHeadCell>
              <TableHeadCell>Grade</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items && data.items.map(el => {
              console.log("el", el)
              return (<TableRow key={el.id}>
                {/*<TableCell>{el.name}</TableCell>*/}
                <TableCell>
                  <div className={s.tableCeil}>
                  {el.questionImg && <div className={s.imgContainer} ><img src={el.questionImg}/></div>}
                    {el.question}
                </div>
                </TableCell>
                <TableCell>
                  <div className={s.tableCeil}>
                    {el.answerImg && <div className={s.imgContainer} ><img src={el.answerImg}/></div>}
                    {el.answer}
                  </div>
                  </TableCell>
                <TableCell>{new Date(el.created).toLocaleDateString()}</TableCell>
                <TableCell>{el.grade}</TableCell>
              </TableRow>)
            })}
          </TableBody>
        </Table>
      }


  </div>);
};

export default CardsPage;