import {ComponentPropsWithoutRef, ElementType} from 'react'
import s from './button.module.scss'



export type ButtonProps<T extends  ElementType='button'> = {
    as?: T
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
    fullWidth?: boolean
    className?: string
} & ComponentPropsWithoutRef<T>

// С помощью Omit мы убираем из пропсов переданного компонента все пропсы, которые уже есть в наших кастомных пропсах, тем самым избегая коллизий.
export const Button = <T extends ElementType ='button'>(props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
const { className, fullWidth, variant = 'primary',as:Component='button',  ...rest }=props

    // console.log('props', props.children, props);

    return (
        <Component className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
            {...rest}
        />
    )
}