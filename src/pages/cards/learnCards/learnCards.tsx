import { Typography } from "@/components/ui/typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCardByIdQuery } from "@/services/cards/cards.servies.ts";
import s from './learnCards.module.scss'
import { Card } from "@/components/ui/card/card.tsx";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ForPageLoader from "@/components/ui/forPageLoader/forPageLoader.tsx";


const LearnCards = () => {
  const location = useLocation();
  const {id} = location.state;
  const navigate =  useNavigate();
  const [currentId,setCurrentId]=useState('')
  const {data, isError} = useGetCardByIdQuery(currentId)
 useEffect(()=>{setCurrentId(id)},[])
  // const {data,isError} = useGetCardsQuery(id??'')

  console.log("dataLern", data);
  console.log("isError: ", isError);
  // console.log(data.answer);
  const learn = (id:string) => {
    setCurrentId(id)
  }

  if( !data ) {
    return <ForPageLoader/>
  }



  return (
    <div>
      <Button onClick={()=>navigate(-1)}>back to deck</Button>
    <div className={s.container}>

      <Card className={s.wrapCard}>
        <Typography as={'h3'} title={'Learn JS-CARDS'}>Learn JS-CARDS </Typography>
        <Typography as={'h3'} title={'Question'}>Question : {data.question}</Typography>
        {data.questionImg && <div className={s.imgWrap}><img alt={'Question'} src={data.questionImg}/></div>}
        <Button fullWidth={true} onClick={()=>{}}>Show answer</Button>
        <Typography as={'h3'} title={'Question'}>Question : {data.answer}</Typography>
        {data.answerImg && <div className={s.imgWrap}><img alt={'Question'} src={data.answerImg}/></div>}

        <Button fullWidth={true} onClick={()=>learn(data.id)}>next question</Button>
      </Card>
    </div>
    </div>);
};

export default LearnCards;