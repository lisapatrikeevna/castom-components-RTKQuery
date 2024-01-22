import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table.tsx'
import { useCreateDeckMutation, useRemoveDeckMutation } from "@/services/decks/decks.servies.ts";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/assets/icons/trashIcon.tsx";
import PlayIcon from "@/assets/icons/playIcon.tsx";
import EditIcon from "@/assets/icons/editIcon.tsx";
import s from './desksPage.module.scss'
import { useDispatch } from "react-redux";
import { appAC } from "@/services/app.slice.ts";
import { PATH } from "@/router.tsx";
import { useNavigate } from "react-router-dom";


type propsType={
  userId:string
  items:any
}
//refetch-обновить данные, новый запрос
export const Decks = ({items,userId, ...rest}:propsType) => {

  const dispatch=useDispatch()
  const navigate =useNavigate()
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  // const [data, error] = useRemoveDeckMutation()
  const [removeDeck, { isLoading: isRemoved }] = useRemoveDeckMutation()
  // const [updateDeck, { isLoading: isUpdating }] = useUpdatePostMutation()
  // console.log("userDecks, userDecksErr", userDecks, userDecksErr);
  // console.log(data);
// if( error ){
//   return <h2>{error.data.message}</h2>
//   // return <h2>{JSON.stringify(error)}</h2>
// }

  // console.log(data.pagination.);
  const getCards = (el:any) => {
    dispatch(appAC.setDecksId(el.id))
    dispatch(appAC.setDecksName(el.name))
    dispatch(appAC.setDecksImg(el.cover))
    navigate(PATH.cards)
  }


  return (
    <>
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
          {items.map(el => {
            // console.log("userId==el.author.id", userId == el.userId);
            return (
              <TableRow key={el.id}>
                <TableCell>
                  <div className={s.flexWrap}>
                    {el.cover && <div className={s.imageContainer}><img src={el.cover} alt={el.name}/></div>}
                    {el.name}
                  </div>
                </TableCell>
                <TableCell>{el.cardsCount}</TableCell>
                <TableCell>{new Date(el.updated).toLocaleDateString()}</TableCell>
                <TableCell>{el.author.name}</TableCell>
                <TableCell>
                  <div className={s.flexWrap}>
                  <Button iconBtn={true} title={'play'} onClick={()=>getCards(el)}><PlayIcon colorFill={'#fff'}/></Button>
                  {userId ==el.userId &&
                  <>
                    <Button iconBtn={true} title={'edit cards'}><EditIcon colorFill={'#fff'}/></Button>
                    <Button iconBtn={true} title={'delete cards'} onClick={()=>removeDeck(el.id)}><TrashIcon colorFill={'#fff'}/></Button>
                  </>}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
