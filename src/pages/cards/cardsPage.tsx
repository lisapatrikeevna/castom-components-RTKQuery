import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/ui/table";
import s from "./cardPage.module.scss";
import { useSelector } from "react-redux";
import { RootStateType } from "@/services/store.ts";
import { useGetCardsQuery } from "@/services/cards/cards.servies.ts";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PATH } from "@/router.tsx";
import { useNavigate } from "react-router-dom";



export type CardTypeAuthor = {
  id: string; name: string;
}
const CardsPage = () => {
  const navigate = useNavigate()
  const userId = useSelector<RootStateType, string>(state => state.app.user.id)
  const id = useSelector<RootStateType, string>(state => state.app.decksId)
  const name = useSelector<RootStateType, string>(state => state.app.decksName)
  const imgUrl = useSelector<RootStateType, string>(state => state.app.decksImg)
  const {data, isError} = useGetCardsQuery(id)

  console.log("data", data);

  const learn = () => {
    const id = data.items[0].id
    // console.log('!!!!id', id);
    navigate(PATH.learn, {state: {id}})
  }

  if( isError ) {
    return <div>...isError</div>
  }
const empty=()=>{
    return(<>
      {/*{userId && !data?    }*/}
    </>)
}
  return (<div className={s.container}>
    <div className={s.cartInfo}>
      <Button as='a'
              onClick={() => navigate(-1)}
              // href={navigate(-1)}
      >go back</Button>
      <div className={s.headingCart}>
        <Typography as={'h3'} className={s.deskTitle}> {name}</Typography>
        {imgUrl && <div className={s.imgContainer}><img src={imgUrl} alt={name}/></div>}
      </div>
      {data && <Button onClick={learn}>learn</Button>}
    </div>
    {!data?.items?.length ? <Typography as={'p'}>This pack is empty</Typography>
      : <Table className={s.table}>
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
          // console.log("el", el)
          return (<TableRow key={el.id}>
            <TableCell>
              <div className={s.tableCeil}>
	 {el.questionImg && <div className={s.imgContainer}><img src={el.questionImg} alt={el.questionImg}/></div>}
	 {el.question}
              </div>
            </TableCell>
            <TableCell>
              <div className={s.tableCeil}>
	 {el.answerImg && <div className={s.imgContainer}><img src={el.answerImg} alt={el.questionImg}/></div>}
	 {el.answer}
              </div>
            </TableCell>
            <TableCell>{new Date(el.created).toLocaleDateString()}</TableCell>
            <TableCell>{el.grade}</TableCell>
          </TableRow>)
        })}
      </TableBody>
    </Table>}


  </div>);
};

export default CardsPage;