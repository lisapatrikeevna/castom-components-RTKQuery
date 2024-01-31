import { ChangeEvent, useState } from 'react';
import { Input } from "@/components/ui/input";
import { CheckBox } from "@/components/ui/checkBox";
import { Button } from "@/components/ui/button";
import { useCreateDeckMutation } from "@/services/decks/decks.servies.ts";
import CroppedImageUploader from "@/components/ui/imageUplouder/imageUplouder.tsx";
import { CreateDecksArgs } from "@/pages/flashcards.types.ts";

type imgType=Blob|File|string
type propsType={
  isOpenHandler:(isOpenValue:boolean)=>void
}
const AddNewDeckBody = (props:propsType) => {
  const [imgValue, setImgValue] = useState<imgType>('')
  const [newDeckName, setNewDeckName] = useState('')
  const [privateDeck, setPrivate] = useState(false)
  const [addDeck, { error: addDeckError ,data }] = useCreateDeckMutation()


  const onChangeCroppImage =(file: imgType) => {
     // console.log('AddNewDeckBody/file', file);
    setImgValue(file)
  };

  const createNewDeck = () => {

    const formData = new FormData()
    if (imgValue) {
      formData.set('cover', imgValue)
    }
    formData.append('name', newDeckName)
    formData.append('isPrivate', privateDeck ? 'true' : 'false')

    // console.log('AddNewDeckBody/ createNewDeck/formData:' , formData);
    // console.log('AddNewDeckBody/createNewDeck /imgValue:' , imgValue);
    addDeck(formData as unknown as CreateDecksArgs).unwrap().then(() => {
      setImgValue('')
      setNewDeckName('')
      setPrivate(false)
      props.isOpenHandler(false)
    }).catch(err=>{
      console.log(err);
    })

  }


  return (<div style={{marginTop:7}}>
    <Input placeholder={'name'} label={'Deck name'} value={newDeckName} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDeckName(e.currentTarget.value)}/>
    <CroppedImageUploader buttonText={'select picture'} url={imgValue}  onChange={onChangeCroppImage}/>
    <CheckBox label={'Private deck'} checked={privateDeck} onCheckedChange={setPrivate}/>
   <div>
     <Button onClick={createNewDeck}>add deck</Button>
   </div>
    {addDeckError && <p>{(addDeckError as ServerErrorResponse).data.errorMessages[0].message}</p>}
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

export default AddNewDeckBody;


