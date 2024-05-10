// import HeaderIcon from "@/assets/icons/headerIcon";
// import { Header } from "@/components/ui/header";
// import { Button } from "@/components/ui/button";
import s from "@/app.module.scss";
// import { RootStateType, store } from "@/services/store.ts";
// import { Provider, useSelector } from "react-redux";
// import CustomDropdownMenu, { MenuItem, MenuSeparator, SubMenu } from "@/components/ui/customDropdownMenu/customDropdownMenu.tsx";
import { PATH, Router } from "@/router.tsx";
// import { Link } from "react-router-dom";
import RadixDropdownMenu, { MenuItem } from "@/components/ui/radixDropdownMenu/radixDropdownMenu.tsx";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import TrashIcon from "@/assets/icons/trashIcon.tsx";


export function App() {
  const isLoggedIn = false;
  // const isLoggedIn = useSelector<RootStateType,boolean>(state => state.app.isLoggedIn)
  console.log(isLoggedIn);
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
    <div className={s.appWrap}>
      <RadixDropdownMenu style={{float: 'right', marginLeft:'auto'}} classNameBtn={s.menuPosition}>
        <>
          {menuItems.map(i => (
            <DropdownMenu.Item shortcut={i.shortcut}>{i.name}</DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className={s.DropdownMenuSubContent} sideOffset={2} alignOffset={-5}>
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

          {/*<DropdownMenu.Item shortcut="⌘ ⌫" color="red">*/}
          {/*  Delete <TrashIcon colorFill='#fff'/>*/}
          {/*</DropdownMenu.Item>*/}
          <MenuItem>
            Delete <TrashIcon colorFill='#fff'/>
          </MenuItem>
        </>
      </RadixDropdownMenu>
      <Router/>
    </div>
 );
}
