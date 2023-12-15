import {ComponentPropsWithoutRef, ReactNode} from "react";
import s from './card.module.scss'

export type titleType = {
    text?: string
    iconElement?: ReactNode
    iconSize?: string
}
export type CardProps = {
    variant?: 'dark' | 'light' | 'white'
    title?: titleType
    width?: string
    className?: string
} & ComponentPropsWithoutRef<"div">

export const Card = (props: CardProps) => {
    const {className, variant = 'dark', ...rest} = props
    const sizeCard = {
        width: props.width
    }

    return (
        <div {...rest} className={`${s.card} ${s[variant]} ${className}`} style={sizeCard}>
            {props.title &&
                <div className={s.cardHeader}>
                    <div className={s.iconSize}>{props.title.iconElement}</div>
                    <h3>{props.title.text}</h3>
                </div>}

            {props.children && <div className={s.body}>{props.children}</div>}
        </div>
    )
}