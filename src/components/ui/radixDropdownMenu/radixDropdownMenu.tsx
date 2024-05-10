// import { Button } from '@/components/ui/button'
import React, { ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'
import MenuIcon from '@/assets/icons/menuIcon'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './radixDropdownMenu.module.scss'
import TrashIcon from "@/assets/icons/trashIcon.tsx";


type menuItemType=[
  {shortcut?:string, name:string}
]
export type RadixDropdownMenuProps<T extends ElementType = 'nav'> = {
  children?: ReactNode
  triggerContent?: ReactNode
  classNameBtn?: string
  classNameDropdownMenuContent?: string
} & ComponentPropsWithoutRef<T>

const RadixDropdownMenu: React.FC<RadixDropdownMenuProps> = (props:RadixDropdownMenuProps) => {
  const {triggerContent, children, classNameBtn, classNameDropdownMenuContent} = props
  // const {triggerContent, children, classNameBtn, menuItems,classNameDropdownMenuContent} = props
  const [isOpen, setIsOpen] = useState(true)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }


  return (
    <DropdownMenu.Root className={classNameBtn}>
      {/*<DropdownMenu.Trigger>*/}
      <DropdownMenu.Trigger asChild>
        {/*<Button aria-label='Customise options' className={s.BtnMenu}>*/}
        {/*  <MenuIcon />*/}
        {/*</Button>*/}
        {triggerContent ? triggerContent : <button className={`${s.BtnMenu} ${classNameBtn}`} aria-label="Customise options">
          <MenuIcon/>
        </button>}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={`${s.DropdownMenuContent} classNameDropdownMenuContent && ${ classNameDropdownMenuContent}`} sideOffset={1}>

          {children}


          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />


        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}


type MenuItemPropsType={
  children: ReactNode
  classNameMenuItem?: string
  shortcut?:string
}
export const MenuItem: React.FC<MenuItemPropsType> = ({ children,classNameMenuItem,shortcut}) => {
  // <div className={s.menuItem}>
  //   <span>{children}</span>
  //   {/*{shortcut && <span className={s.shortcut}>{shortcut}</span>}*/}
  // </div>
  return <DropdownMenu.Item shortcut={shortcut} color="#fggjj"  className={`${s.menuItem}  ${classNameMenuItem? classNameMenuItem: ''}`}>
  {/*return <DropdownMenu.Item shortcut={shortcut &&"⌘ ⌫"} color="red"  className={`${s.shortcut}  ${classNameMenuItem? classNameMenuItem: ''}`}>*/}
    {children}
  </DropdownMenu.Item>
}

interface MenuSeparatorProps {}

export const MenuSeparator: React.FC<MenuSeparatorProps> = () => <div className={s.menuSeparator} />

interface SubMenuProps {
  triggerContent: ReactNode
  children: ReactNode
}

export const SubMenu: React.FC<SubMenuProps> = ({ triggerContent, children }) => {
  return (
    <div className={s.subMenu}>
      <div className={s.subTrigger}>{triggerContent}</div>
      <div className={s.subContent}>{children}</div>
    </div>
  )
}

export default RadixDropdownMenu




// export type ToolbarProps = {
//   /** The preferred content alignment against the trigger. */
//   align?: 'center' | 'end' | 'start'
//   /** Use TooltipItem components as children.*/
//   children: ReactNode
//   className?: string
//   style?: CSSProperties
//   trigger?: ReactNode
// }







