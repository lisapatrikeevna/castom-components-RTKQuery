import {Button} from "@/components/ui/button";
import {ComponentPropsWithoutRef, useState} from 'react'
import s from './TabSwitcher.module.scss'


export type TabSwitcherProps = {
    variant?: 'light' | 'average' | 'dark'
    buttonsVariant?: 'primary' | 'secondary' | 'tertiary' | 'link'
    buttonsName: Array<string>
    className?: string
} & ComponentPropsWithoutRef<'div'>

export const TabSwitcher = (props: TabSwitcherProps) => {
    const {className, buttonsName, variant = 'dark', buttonsVariant = 'primary', ...rest} = props
    const [active, setStatus] = useState<number>(0)

    const btnHandler = (i: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setStatus(i)
    }


    return (
        <div
            className={`${s.tabSwitcher} ${variant && s[variant]}  ${className}`} {...rest}>
            <h4>title</h4>
            {buttonsName.map(
                (b: string, i: number) => <Button key={i}
                                                  variant={buttonsVariant && buttonsVariant}
                                                  className={` ${s.button}  ${active === i && s.btnActive}`}
                                                  onClick={(e) => btnHandler(i, e)}>
                    {b}
                </Button>
            )}
        </div>
    )
}