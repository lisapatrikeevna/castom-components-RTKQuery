import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import s from './portal.module.scss'
import { Card } from "@/components/ui/card/card.tsx";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";


type propsType = {
  title?: string
  text?: string
  children?: ReactNode | JSX.Element
  textBtnOpen?:string
  textBtnClose?:string
  portalWrapClass?: string
  isOpen?:boolean
  openBtn?:ReactNode
}
const Portal = (props: propsType) => {
  const [portalVisible, setPortalVisible] = useState(false);

  useEffect(()=>{
   if(props.isOpen !== null || props.isOpen !== undefined){
     setPortalVisible(props.isOpen)
   }
   return
   },[props.isOpen])
  const handlePortalOpen = () => setPortalVisible(true);
  const handlePortalClose = () => setPortalVisible(false);


  return (<div>
    {props.textBtnOpen && <Button onClick={handlePortalOpen}>{props.textBtnOpen}</Button>}
    {props.openBtn && props.openBtn}
    {portalVisible && createPortal(<PortalComponent onClose={handlePortalClose} text={props.text} title={props.title} textBtnClose={props.textBtnClose} portalWrapClass={props.portalWrapClass} children={props.children}/>, document.body)}
    </div>);
};

export default Portal;


type PortalComponentProps = {
  onClose: () => void
  text?: string
  children?: ReactNode|JSX.Element
  title?: string
  textBtnClose?:string
  portalWrapClass?: string
}
const PortalComponent = (props: PortalComponentProps) => {
  // <Card width={'400px'}title={{text:'title text',iconElement:<InfoIcon/>,iconSize:'15px'}}>
  // <h1>h1 test</h1><p style={{color: 'red'}}>some inner text</p></Card>

  return (<div className={s.wrap}>
      <Card className={`${s.card} ${props.portalWrapClass}`}>
        <Button onClick={props.onClose} iconBtn={true} className={s.onClose}>{props.textBtnClose? props.textBtnClose:'X'}</Button>
        <div className={s.headerWrap}>
          <Typography className={s.heading}>{props.title}</Typography>
        </div>

        {props.text && <p>{props.text}</p>}

        {props.children}
      </Card>
    </div>);
};