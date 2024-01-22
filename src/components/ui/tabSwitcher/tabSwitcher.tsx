import { Button } from "@/components/ui/button";
import { ComponentPropsWithoutRef } from 'react'
import s from './TabSwitcher.module.scss'


export type TabSwitcherBtnType={
  name:string
  value:string
}
export type TabSwitcherProps = {
  variant?: 'light' | 'average' | 'dark'
  buttonsVariant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  buttonsData: Array<TabSwitcherBtnType>
  className?: string
  title?:string
  onChange:(value:TabSwitcherBtnType)=>void
  activeBtn:string
} & ComponentPropsWithoutRef<'div'>

export const TabSwitcher = (props: TabSwitcherProps) => {
  const {onChange,activeBtn,className, buttonsData, variant = 'dark', buttonsVariant = 'primary',title, ...rest} = props

  const btnHandler = ( b:TabSwitcherBtnType) => {
    onChange(b)
  }


  return (<div className={`${s.tabSwitcher} ${variant && s[variant]} ${className}`} {...rest}>
    <h4>{title}</h4>
    {buttonsData.map((b: TabSwitcherBtnType, i: number) => <Button
      key={i} variant={buttonsVariant && buttonsVariant} className={` ${s.button}  ${activeBtn === b.value && s.btnActive}`} onClick={() => btnHandler( b)}>
      {b.name}
    </Button>)}
  </div>)
}