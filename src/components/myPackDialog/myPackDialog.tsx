import s from './myPackDialog.module.scss'
import { Button } from "@/components/ui/button";
import PlayIcon from "@/assets/icons/playIcon.tsx";
import TrashIcon from "@/assets/icons/trashIcon.tsx";
import EditIcon from "@/assets/icons/editIcon.tsx";
import Portal from "@/components/ui/portal/portal.tsx";


const MyPackDialog = () => {
  // const style = {
  //   display: props.display
  // }

  return (<div className={s.root}>
    <Portal title={'Add New Deck'} openBtn={<Button onClick={() => {}} ><PlayIcon colorFill={'#fff'}/>Learn</Button>}></Portal>
    <Button onClick={() => {}}><EditIcon colorFill={'#fff'}/>Edit</Button>
    <Button onClick={() => {}}><TrashIcon colorFill={'#fff'}/>Delete</Button>
  </div>);
};

export default MyPackDialog;