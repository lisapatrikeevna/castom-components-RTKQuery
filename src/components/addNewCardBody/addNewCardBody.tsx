import { ChangeEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCreateDeckMutation } from "@/services/decks/decks.servies.ts";
import CroppedImageUploader from "@/components/ui/imageUplouder/imageUplouder.tsx";
import { CreateDecksArgs } from "@/pages/flashcards.types.ts";
import { Input } from "@/components/ui/input";
import { useAddCardMutation } from "@/services/cards/cards.servies.ts";
import { createCardType } from "@/services/cards/card.type.ts";
import s from "./addNewCardBody.module.scss"
import { Typography } from "@/components/ui/typography";

type imgType = File | Blob | string
type propsType = {
  deckId: string
  // isOpenHandler:(isOpenValue:boolean)=>void
}
const AddNewCardBody = ({deckId, ...props}: propsType) => {
  const [imgQuestion, setImgQuestion] = useState<imgType>('')
  const [answerImg, setImganswer] = useState<imgType>('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [addCard, {error: addDeckError, data, isLoading, isSuccess}] = useAddCardMutation()

  console.log(deckId);
  const onChangeCroppImage = (file: imgType) => {
    console.log('AddNewDeckBody/CropImage/imgValue', imgQuestion);
    console.log('AddNewDeckBody/CropImage/file', file);
    setImgQuestion(file)
  };

  const createNewCard = () => {
    console.log("question, answer, deckId", question, answer, deckId);
    const formData = new FormData();
    if( imgQuestion ) {
      formData.set('questionImg', imgQuestion)
    }
    if( answerImg ) {
      formData.set('answerImg', answerImg)
    }
    formData.append('question', question)
    formData.append('answer', answer)

    console.log({formData});
    addCard({deckId, body: formData as unknown as createCardType}).unwrap().then(() => {
      setImgQuestion('')
      setQuestion('')
      setAnswer('')
      console.log('then', data);
      // props.isOpenHandler(false)
    }).catch(err => {
      console.log(err);
    })

  }


  return (<>
    <Typography style={{borderBottom: '1px solid #ccc', padding: '25px 25px 10px',fontSize: '17px', color: 'white'}}>Add new card</Typography>
    <div className={s.root}>
      <Input placeholder={'name'} label={'Question'} value={question} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)}/>
      <CroppedImageUploader buttonText={'select picture'} url={imgQuestion} onChange={onChangeCroppImage}/>
      <Input placeholder={'name'} label={'Answer'} value={answer} onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)}/>
      <CroppedImageUploader buttonText={'select picture'} url={imgQuestion} onChange={onChangeCroppImage}/>
      <div className={s.btnWrap}>
        <Button onClick={createNewCard} disabled={isLoading}>add deck</Button>
        <Button onClick={() => {}} disabled={isLoading}>close</Button>
      </div>
      {addDeckError && <p>{(addDeckError as ServerErrorResponse).data.errorMessages[0].message}</p>}
    </div>
    </>
    );
};


type ServerErrorResponse = {
  data: {
    errorMessages: Array<{
      field: string
      message: string
    }>
  }
}

export default AddNewCardBody;


