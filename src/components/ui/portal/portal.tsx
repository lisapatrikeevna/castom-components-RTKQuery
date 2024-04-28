import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import s from './portal.module.scss';
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
  // console.log('portalVisible !!!!', portalVisible);
  useEffect(()=>{
   if( props.isOpen !==undefined){
     setPortalVisible(props.isOpen)
   }
   },[props])
  const handlePortalVisible = () => setPortalVisible(!portalVisible);


  return (<div>
    {props.textBtnOpen && <Button onClick={handlePortalVisible}>{props.textBtnOpen}</Button>}
    {props.openBtn && props.openBtn}
    {portalVisible && createPortal(<PortalComponent onClose={handlePortalVisible} text={props.text} title={props.title} textBtnClose={props.textBtnClose} portalWrapClass={props.portalWrapClass} children={props.children}/>, document.body)}
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