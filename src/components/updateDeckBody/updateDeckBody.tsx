import { ChangeEvent, useState } from 'react';
import { Input } from "@/components/ui/input";
import { CheckBox } from "@/components/ui/checkBox";
import { Button } from "@/components/ui/button";
import { useUpdateDeckMutation } from "@/services/decks/decks.servies.ts";
import CroppedImageUploader from "@/components/ui/imageUplouder/imageUplouder.tsx";
import { UpdateDecksArgs } from "@/pages/flashcards.types.ts";
import s from './updateDeckBody.module.scss'


type propsType={
  isOpenHandler:(isOpenValue:boolean)=>void
  deck:any
}
const UpdateDeckBody = (props:propsType) => {
  const [imgValue, setImgValue] = useState<Blob |string>(props.deck.cover)
  const [deckName, setNewDeckName] = useState(props.deck.name)
  const [privateDeck, setPrivate] = useState(false)
  // const [addDeck, { error: addDeckError ,data }] = useCreateDeckMutation()
  const [updateDeck, { isLoading: isUpdating ,error}] = useUpdateDeckMutation()
  console.log('UpdateDeckBody',props);
  console.log('UpdateDeckBody/deck.name',  props.deck.name);

  const onChangeCroppImage =(blob: Blob) => {
    setImgValue(blob)
  };

  const update = () => {

    const formData = new FormData()
    if (imgValue) {
      formData.set('cover', imgValue)
    }
    formData.append('name', deckName)
    formData.append('isPrivate', privateDeck ? 'true' : 'false')

    const args = {
      // cover:imgValue+nanoid(),
      cover: imgValue, name: deckName, isPrivate: privateDeck, id:props.deck.id
    }

    console.log('!!args', args);
    updateDeck(formData as unknown as UpdateDecksArgs).unwrap().then(() => {
      setImgValue('')
      setNewDeckName('')
      setPrivate(false)
      props.isOpenHandler(false)
    }).catch(err=>{
      console.log(err);
    })

  }


  return (<div className={s.updateDeckWrap}>
    <Input placeholder={'name'} label={'Deck name'} value={deckName} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDeckName(e.currentTarget.value)}/>
    <CroppedImageUploader buttonText={'select picture'} url={imgValue}  onChange={onChangeCroppImage}/>
    <CheckBox label={'Private deck'} checked={privateDeck} onCheckedChange={setPrivate}/>
   <div>
     <Button onClick={update}>update deck</Button>
   </div>
    {/*{addDeckError && <p>{(addDeckError as ServerErrorResponse).data.errorMessages[0].message}</p>}*/}
  </div>);
};


type ServerErrorResponse = {
  data: {
    errorMessages: Array<{
      field: string
      message: string
    }>
  }
}

export default UpdateDeckBody;