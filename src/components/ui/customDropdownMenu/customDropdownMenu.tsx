import { useState, ReactNode, ComponentPropsWithoutRef, ElementType } from "react";
import { NavLink } from 'react-router-dom'

import s from './customDropdownMenu.module.scss'

export type CustomDropdownMenuProps<T extends ElementType = 'nav'>  ={
  children: ReactNode
  triggerContent: ReactNode
  className?:string
}& ComponentPropsWithoutRef<T>

const CustomDropdownMenu: React.FC<CustomDropdownMenuProps> = ({ triggerContent, children,className
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={s.dropdownMenu}>
      <div className={s.trigger} onClick={handleToggle}> {triggerContent} </div>
      {isOpen && <div className={s.content}>{children}</div>}
    </div>
  );
};

interface MenuItemProps {
  children: string
  // children: ReactNode
  path?:string
  shortcut?: string
}

export const MenuItem: React.FC<MenuItemProps> = ({ children,path, shortcut }) => (
  <div className={s.menuItem}>
    {/*<NavLink to={`path? '{path}': '/'`}>{children}</NavLink>*/}
    <div>{children}</div>
    {shortcut && <span className={s.shortcut}>{shortcut}</span>}
  </div>
)

interface MenuSeparatorProps {
}

export const MenuSeparator: React.FC<MenuSeparatorProps> = () => <div className={s.menuSeparator} />;

interface SubMenuProps {
  triggerContent: ReactNode;
  children: ReactNode;
}

export const SubMenu: React.FC<SubMenuProps> = ({ triggerContent, children }) => {
  return (
    <div className={s.subMenu}>
      <div className={s.subTrigger}>{triggerContent}</div>
      <div className={s.subContent}>{children}</div>
    </div>
  )
}

export default CustomDropdownMenu;
