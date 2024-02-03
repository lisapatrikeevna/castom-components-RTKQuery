import { Typography } from "@/components/ui/typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCardByIdQuery, useLearnCardMutation } from "@/services/cards/cards.servies.ts";
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
  const {data:primaryData, isError} = useGetCardByIdQuery(currentId)
  const [getNewCard,{data:currentData, isError:currentErr}]=useLearnCardMutation()
 useEffect(()=>{setCurrentId(id)},[])
  // const {data,isError} = useGetCardsQuery(id??'')

  // const {control,register, handleSubmit} = useForm<FormType>(
  //   {mode: 'onSubmit', resolver: zodResolver(schema), defaultValues: {email: 'lisa15.08patrikeevna@gmail.com', password: '12345', rememberMe: true,},
  //   })
  console.log("isError: ", isError);
  // console.log(data.answer);
  const learn = (id:string) => {
    getNewCard({cardId:currentId,grade:2})
    // setCurrentId(id)
  }
  let data=primaryData
  if(currentData !==undefined){
    data=currentData
  }
  if( !data ) {
    return <ForPageLoader/>
  }


// <CheckBox label={'Remember me'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/>
//
  return (
    <div>
      <Button onClick={()=>navigate(-1)}>back to deck</Button>
    <div className={s.container}>

      <Card className={s.wrapCard}>
        <Typography as={'h3'} title={'Learn JS-CARDS'}>Learn JS-CARDS </Typography>
        <Typography as={'h3'} title={'Question'}>Question : {data.question}</Typography>
        {data.questionImg && <div className={s.imgWrap}><img alt={'Question'} src={data.questionImg}/></div>}
        <Button fullWidth={true} onClick={()=>{}} className={s.button}>Show answer</Button>
        <div>
          <p>Rate yourself:</p>
          {/*<div>*/}
          {/*  <div><CheckBox label={'Did not know'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/></div>*/}
          {/*  <div><CheckBox label={'Forgot'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/></div>*/}
          {/*  <div><CheckBox label={'Difficult'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/></div>*/}
          {/*  <div><CheckBox label={'Good'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/></div>*/}
          {/*  <div><CheckBox label={'Easy'} {...register('rememberMe')} name={'rememberMe'} position={'left'}/></div>*/}
          {/*</div>*/}
        </div>
        <Typography as={'h3'} title={'Question'}>Question : {data.answer}</Typography>
        {data.answerImg && <div className={s.imgWrap}><img alt={'Question'} src={data.answerImg}/></div>}

        <Button fullWidth={true} onClick={()=>learn(data.id)} className={s.button}>next question</Button>
      </Card>
    </div>
    </div>);
};

export default LearnCards;