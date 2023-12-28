import { Button } from '@/components/ui/button'
import React, { ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'
import MenuIcon from '@/assets/icons/menuIcon'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './radixDropdownMenu.module.scss'

export type RadixDropdownMenuProps<T extends ElementType = 'nav'> = {
  children?: ReactNode
  triggerContent?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

const RadixDropdownMenu: React.FC<RadixDropdownMenuProps> = ({
  triggerContent,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const menuItems = [
    { shortcut: '⌘ E', name: 'Edit' },
    { shortcut: '⌘ D', name: 'Duplicate' },
    { shortcut: '⌘ C', name: 'Contact' },
  ]
  const menuItemsSub = [
    { shortcut: '⌘ P', name: 'Move to project…' },
    { shortcut: '', name: 'Move to folder…' },
  ]

  return (
    <DropdownMenu.Root>
      {/*<DropdownMenu.Trigger>*/}
      <DropdownMenu.Trigger asChild>
        <Button aria-label={'Customise options'} className={s.BtnMenu}>
          <MenuIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent}>
          {/*<DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>*/}
          {menuItems.map(i => (
            <DropdownMenu.Item shortcut={i.shortcut}>{i.name}</DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className={s.DropdownMenuSubContent}>
              {menuItemsSub.map(i => (
                <DropdownMenu.Item> {i.name}</DropdownMenu.Item>
              ))}

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />

          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item className={s.DropdownMenuItem}>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Separator />

          <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

interface MenuItemProps {
  children: ReactNode
  shortcut?: string
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, shortcut }) => (
  <div className={s.menuItem}>
    <span>{children}</span>
    {shortcut && <span className={s.shortcut}>{shortcut}</span>}
  </div>
)

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
