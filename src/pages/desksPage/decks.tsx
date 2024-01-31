import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table.tsx'
import { useRemoveDeckMutation } from "@/services/decks/decks.servies.ts";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/assets/icons/trashIcon.tsx";
import PlayIcon from "@/assets/icons/playIcon.tsx";
import EditIcon from "@/assets/icons/editIcon.tsx";
import s from './desksPage.module.scss'
import { useDispatch } from "react-redux";
import { appAC } from "@/services/app.slice.ts";
import { PATH } from "@/router.tsx";
import { useNavigate } from "react-router-dom";
import Portal from "@/components/ui/portal/portal.tsx";
import { useState } from "react";
import UpdateDeckBody from "@/components/updateDeckBody/updateDeckBody.tsx";
import { GetDecksResponseItems } from "@/pages/flashcards.types.ts";
import { cardItemType } from "@/services/cards/card.type.ts";


type propsType={
  userId:string
  items:Array<GetDecksResponseItems>
}
export const Decks = ({items,userId, ...rest}:propsType) => {

  const dispatch=useDispatch()
  const navigate =useNavigate()
  // const [createDeck, { isLoading }] = useCreateDeckMutation()
  const [isOpen, setIsOpen] = useState<boolean|null>(null)
  const [idUpdateDeck, setIdUpdateDeck] = useState<string|null>(null)
  const [removeDeck, { isLoading: isRemoved }] = useRemoveDeckMutation()

  // console.log("userDecks, userDecksErr", userDecks, userDecksErr);
  // console.log(data);
  const isOpenHandler = (isOpenValue=true ,id:string) => {
    setIdUpdateDeck(id)
    setIsOpen(isOpenValue)
  }
  const getCards = (el:cardItemType) => {
    dispatch(appAC.setDecksId(el.id))
    dispatch(appAC.setDecksName(el.name))
    el.cover && dispatch(appAC.setDecksImg(el.cover))
    navigate(PATH.cards)
    // navigate(PATH.cards,{ state: { id } })
  }


  return (
    <div className={s.container}>
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
                    <Portal title={'Edit Deck'}
                            isOpen={idUpdateDeck===el.id && isOpen}
                            children={<UpdateDeckBody
                              isOpenHandler={setIsOpen}
                              deck={el}/>} openBtn={
                              <Button iconBtn={true} title={'edit cards'}
                                      onClick={
                                ()=> {
                                  console.log('el',el.name)
                                  isOpenHandler(true, el.id)
                                }
                              }
                                      // onClick={isOpenHandler}
                              ><EditIcon colorFill={'#fff'}/></Button>}/>

                    <Button iconBtn={true} title={'delete cards'} onClick={()=>removeDeck(el.id)}><TrashIcon colorFill={'#fff'}/></Button>
                  </>}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
