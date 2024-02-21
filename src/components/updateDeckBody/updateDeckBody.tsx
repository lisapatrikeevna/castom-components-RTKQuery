import { ChangeEvent, useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { CheckBox } from "@/components/ui/checkBox";
import { Button } from "@/components/ui/button";
import { useUpdateDeckMutation } from "@/services/decks/decks.servies.ts";
import CroppedImageUploader from "@/components/ui/imageUplouder/imageUplouder.tsx";
import { UpdateDecksArgs } from "@/pages/flashcards.types.ts";
import s from './updateDeckBody.module.scss'
import { name } from "clsx";
import ForPageLoader from "@/components/ui/forPageLoader/forPageLoader.tsx";

type ServerErrorResponse = {
  data: {
    errorMessages: Array<{
      field: string
      message: string
    }>
  }
}
type DeckItemType = {
  author: {id: string; name: string;}
  cardsCount: number; cover: null | string; created: string; isPrivate: boolean; id: string; name: string; updated: string; userId: string;
}

type propsType = {
  isOpenHandler: (isOpenValue: boolean) => void
  deck: DeckItemType
}

const UpdateDeckBody = (props: propsType) => {
  const [imgValue, setImgValue] = useState<Blob | string>('');
  const [deckName, setNewDeckName] = useState('');
  const [privateDeck, setPrivate] = useState(false);
  const [error, setError] = useState(false);
  const [updateDeck, {isLoading}] = useUpdateDeckMutation();

  useEffect(() => {
    console.log("props.deck.cover", props.deck.cover);
    props.deck.cover !== null && setImgValue(props.deck.cover);
    // props.deck.cover !== null && setImgValue(props.deck.cover);
    setNewDeckName(props.deck.name);
    setPrivate(props.deck.isPrivate);
  }, []);

  const onChangeCroppImage = (blob: Blob) => {
    setImgValue(blob);
  };

  const update = () => {

    const formData = new FormData();
    formData.append('name', deckName);
    if( imgValue.length > 0 || imgValue !== props.deck.cover ) {
      formData.append('cover', imgValue);
    }
    formData.append('isPrivate', privateDeck ? 'true' : 'false');

    updateDeck({id: props.deck.id, body: formData as unknown as UpdateDecksArgs}).unwrap().then(() => {
      setImgValue('');
      setNewDeckName('');
      setPrivate(false);
      props.isOpenHandler(false);
    })
    .catch(err => {
      console.log(err);
      setError(err.data.message);
    });
  }

  if(isLoading){
    return <ForPageLoader/>
  }

  return (<div className={s.updateDeckWrap}>
      <Input placeholder={'name'} label={'Deck name'} value={deckName} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDeckName(e.currentTarget.value)}/>
      <CroppedImageUploader buttonText={'select picture'} url={imgValue} onChange={onChangeCroppImage}/>
      <CheckBox label={'Private deck'} checked={privateDeck} onCheckedChange={setPrivate}/>
      <div>
        <Button onClick={update}>update deck</Button>
      </div>
      {error && <p>{error}</p>}
    </div>);
};

export default UpdateDeckBody;