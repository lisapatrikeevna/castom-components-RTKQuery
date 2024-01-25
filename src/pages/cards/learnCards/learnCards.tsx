import { Typography } from "@/components/ui/typography";
import { GetCardsType } from "@/services/cards/card.type.ts";

type propsType={
card:GetCardsType
}
const LearnCards = (props:propsType) => {
  console.log(props);

  return (
    <div>
    <Typography as={'h3'} title={'Learn JS-CARDS'} >Learn JS-CARDS </Typography>
    <Typography as={'h3'} title={'Question'} >Question : {props.card.question}</Typography>
      {props.card.questionImg && <img alt={'Question'} src={props.card.questionImg}/>}
      <Typography as={'p'} title={'Number of attempts'}>Number of attempts: 0</Typography>
    <Typography as={'h3'} title={'Question'} >Question : {props.card.answer}</Typography>
      {props.card.answerImg && <img alt={'Question'} src={props.card.answerImg}/>}
    </div>
  );
};

export default LearnCards;