import {ComponentPropsWithoutRef, ElementType} from 'react'
import s from './button.module.scss'



export type ButtonProps<T extends  ElementType='button'> = {
    as?: T
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
    fullWidth?: boolean
    // className?: string
} & ComponentPropsWithoutRef<T>


export const Button = <T extends ElementType ='button'>(props: ButtonProps<T>) => {
const { className, fullWidth, variant = 'primary',as:Component='button',  ...rest }=props

    return (
        <Component
            className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
            {...rest}
        />
    )
}