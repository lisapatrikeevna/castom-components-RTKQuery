import { Button, buttonsVariantType } from "@/components/ui/button";
import { ComponentPropsWithoutRef } from 'react'
import s from './TabSwitcher.module.scss'


export type TabSwitcherBtnType={
  name:string
  value:string
}
export type TabSwitcherProps = {
  variant?: 'light' | 'average' | 'dark'
  buttonsVariant?: buttonsVariantType
  buttonsData: Array<TabSwitcherBtnType>
  className?: string
  title?:string
  onChange:(value:TabSwitcherBtnType)=>void
  activeBtn:string
} & ComponentPropsWithoutRef<'div'>

export const TabSwitcher = (props: TabSwitcherProps) => {
  const {onChange,activeBtn,className, buttonsData, variant = 'dark', buttonsVariant ,title, ...rest} = props
// debugger
  const btnHandler = ( b:TabSwitcherBtnType) => {
    onChange(b)
  }


  return (<div className={`${s.tabSwitcher} ${className} ${variant && s[variant]} `} {...rest}>
    <h4>{title}</h4>
    {buttonsData.map((b: TabSwitcherBtnType, i: number) => <Button
      key={i} variant={buttonsVariant} className={` ${s.button}  ${activeBtn === b.value && s.btnActive}`} onClick={() => btnHandler( b)}>
      {b.name}
    </Button>)}
  </div>)
}