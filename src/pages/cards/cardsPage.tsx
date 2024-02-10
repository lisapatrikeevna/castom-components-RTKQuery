import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/ui/table";
import s from "./cardPage.module.scss";
import { useSelector } from "react-redux";
import { RootStateType } from "@/services/store.ts";
import { useGetCardsQuery } from "@/services/cards/cards.servies.ts";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PATH } from "@/router.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import ForPageLoader from "@/components/ui/forPageLoader/forPageLoader.tsx";
import Portal from "@/components/ui/portal/portal.tsx";
import EditIcon from "@/assets/icons/editIcon.tsx";
import AddNewCardBody from "@/components/addNewCardBody/addNewCardBody.tsx";
import UpdateDeckBody from "@/components/updateDeckBody/updateDeckBody.tsx";
import TrashIcon from "@/assets/icons/trashIcon.tsx";


//getCardById

export type CardTypeAuthor = {
  id: string; name: string;
}
const CardsPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {ownerId} = location.state;
  const userId = useSelector<RootStateType, string>(state => state.app.user.id)
  const id = useSelector<RootStateType, string>(state => state.app.decksId)
  const name = useSelector<RootStateType, string>(state => state.app.decksName)
  const imgUrl = useSelector<RootStateType, string>(state => state.app.decksImg)
  const {data, isError} = useGetCardsQuery(id)

  console.log("data, id", data, id );

  const learn = () => {
    const id = data.items[0].id
    console.log('!!!!id', id);
    navigate(PATH.learn, {state: {id}})
  }


  if( isError ) {
    return <div>...isError</div>
  }
  if( !data ) {
    return <ForPageLoader/>
  }
  // console.log("length", data.items.length>0);
  const empty = () => {
    // console.log("length", data.items);
    return (<div className={s.container}>
      {userId===ownerId ? <div ><Portal textBtnOpen={'Add new card'} ><AddNewCardBody deckId={id} /></Portal></div>
        : <Typography as={'p'}>This pack is empty</Typography> }
    </div>)
  }
  return (<div className={s.container}>
    <span onClick={() => navigate(-1)}>&#10229; <> go back </></span>
    {/*<Button as={'a'} onClick={() => navigate(-1)}>go back</Button>*/}
    <div className={s.cartInfo}>
      <div className={s.headingCart}>
        <Typography as={'h3'} className={s.deskTitle}> {name}</Typography>
        {imgUrl && <div className={s.imgContainer}><img src={imgUrl} alt={name}/></div>}
      </div>
      {data.items.length>0 && <Button onClick={learn}>learn</Button>}
      {userId===ownerId && <div ><Portal textBtnOpen={'Add new card'} ><AddNewCardBody deckId={id} /></Portal></div>}
    </div>
    {data.items.length>0 ? <Table className={s.table}>
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
	 {el.questionImg && <div className={s.imgContainer}><img src={el.questionImg}/></div>}
	 {el.question}
              </div>
            </TableCell>
            <TableCell>
              <div className={s.tableCeil}>
	 {el.answerImg && <div className={s.imgContainer}><img src={el.answerImg}/></div>}
	 {el.answer}
              </div>
            </TableCell>
            <TableCell>{new Date(el.created).toLocaleDateString()}</TableCell>
            <TableCell>{el.grade}</TableCell>
            {userId===ownerId && <div>
              <Portal title={'Edit Deck'}
              {/*<Portal title={'Edit Deck'} isOpen={Boolean(idUpdateDeck===el.id && isOpen)}*/}
                      children={<UpdateDeckBody
                        // isOpenHandler={setIsOpen}
                                                deck={el}/>}
                      openBtn={<Button iconBtn={true} title={'edit cards'}
                                       onClick={()=> {console.log('el',el.name)
                                           // isOpenHandler(true, el.id)
                                         }
                                       }
                        // onClick={isOpenHandler}
                      ><EditIcon colorFill={'#fff'}/></Button>}/>

              <Button iconBtn={true} title={'delete cards'} onClick={()=>removeDeck(el.id)} disabled={isRemoved}><TrashIcon colorFill={'#fff'}/></Button>

            </div>}
          </TableRow>)
        })}
      </TableBody>
    </Table> : <div className={s.container}><Typography as={'p'}>This pack is empty</Typography></div>
    }


  </div>);
};

export default CardsPage;