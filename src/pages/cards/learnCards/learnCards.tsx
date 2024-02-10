import { Typography } from "@/components/ui/typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCardByIdQuery, useLearnCardMutation } from "@/services/cards/cards.servies.ts";
import s from './learnCards.module.scss'
import { Card } from "@/components/ui/card/card.tsx";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ForPageLoader from "@/components/ui/forPageLoader/forPageLoader.tsx";
import { CheckBox } from "@/components/ui/checkBox";

type checkBoxValueType = {
  value: boolean
  label: string
  id: number
}
const arrCheckBoxValue: Array<checkBoxValueType> = [{value: false, id: 1, label: 'Did not know'}, {value: false, id: 2, label: 'Forgot'}, {value: false, id: 3, label: 'Difficult'}, {value: false, id: 4, label: 'Good'}, {value: false, id: 5, label: 'Easy'},]

const LearnCards = () => {

  const location = useLocation();
  const {id} = location.state;
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState('')
  const [display, setDisplay] = useState(false)
  const [arrCheckBox, setArrCheckBox] = useState(arrCheckBoxValue)
  const {data: primaryData, isError} = useGetCardByIdQuery(currentId)
  const [getNewCard, {data: currentData, isError: currentCardErr, isLoading}] = useLearnCardMutation()
  useEffect(() => {setCurrentId(id)}, [])

  console.log("isError: ", isError, currentCardErr);
  // console.log(data.answer);
  const learn = () => {
    const active=arrCheckBox.find(i=>i.value===true)
    const grade=active.id
    getNewCard({cardId: currentId, grade}).unwrap().then(() => {
      setArrCheckBox( arrCheckBox.map(el=> ({...el,value:false}) ) )
    })
    .catch(err=>{
      console.log(err);
    })
  }
  const checkBoxHandler = (id: number) => {
    setArrCheckBox(arrCheckBox.map(el => el.id === id ? {...el, value: true} : {...el, value: false}))
  }
  const style = {
    display: display ? 'block' : 'none'
  }
  const answeShow = () => {
    setDisplay(!display)
  }
  let data = primaryData
  if( currentData !== undefined ) {
    data = currentData
  }
  if( !data ) {
    return <ForPageLoader/>
  }


  return (<div>

      <span onClick={() => navigate(-1)}>&#10229; <> back to deck </></span>
      {/*<Button onClick={() => navigate(-1)}>back to deck</Button>*/}
      <div className={s.container}>

        <Card className={s.wrapCard}>
          <Typography as={'h3'} title={'Learn JS-CARDS'}>Learn JS-CARDS </Typography>
          <Typography as={'h3'} title={'Question'}>Question : {data.question}</Typography>
          {data.questionImg && <div className={s.imgWrap}><img alt={'Question'} src={data.questionImg}/></div>}
          <Button fullWidth={true} onClick={answeShow} className={s.button}>Show answer</Button>

          <div style={style}>
            <hr/>
            <Typography as={'h3'} title={'Question'}>Question : {data.answer}</Typography>
            {data.answerImg && <div className={s.imgWrap}><img alt={'Question'} src={data.answerImg}/></div>}

            <p>Rate yourself:</p>
            {arrCheckBox.map(i => <CheckBox key={i.id} label={i.label} onCheckedChange={() => checkBoxHandler(i.id)} checked={i.value}/>)}
            <Button fullWidth={true} className={s.button} onClick={learn} disabled={isLoading}>next question</Button>
          </div>

        </Card>
      </div>
    </div>

  )
};

export default LearnCards;