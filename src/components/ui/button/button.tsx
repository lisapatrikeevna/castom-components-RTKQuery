import {ComponentPropsWithoutRef, ElementType} from 'react'
import s from './button.module.scss'
import { Link } from "react-router-dom";


export type ButtonElementType= 'button'|'a'|Link
export type ButtonProps<T extends  ElementType='button'> = {
    as?: T
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
    fullWidth?: boolean
    className?: string
    iconBtn?:boolean
} & ComponentPropsWithoutRef<T>
//ComponentPropsWithoutRef -привязываем дефолтные пропы HTML еллемента
// С помощью Omit мы убираем из пропсов переданного компонента все пропсы, которые уже есть в наших кастомных пропсах, тем самым избегая коллизий.




export const Button = <T extends ElementType ='button'>(props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
const { className, fullWidth, variant = 'primary',as:Component='button', iconBtn=false, ...rest }=props

    const iconBtnStyles={
        width: '16px',
        height: '16px',
        borderRadius:'30px'
    }
    // console.log('props', props);

    return <>
      {iconBtn ? <Component className={`${s.button} ${s.iconBtn} ${className}`}  {...rest}/>:
            <Component className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}{...rest}/>
      }
   </>
}