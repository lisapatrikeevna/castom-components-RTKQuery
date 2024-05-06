import HeaderIcon from "@/assets/icons/headerIcon";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import s from "@/app.module.scss";
import { RootStateType, store } from "@/services/store.ts";
import { Provider, useSelector } from "react-redux";
import CustomDropdownMenu, { MenuItem, MenuSeparator, SubMenu } from "@/components/ui/customDropdownMenu/customDropdownMenu.tsx";
import { PATH, Router } from "@/router.tsx";
import { Link } from "react-router-dom";



export function App() {
  const isLoggedIn = false;
  // const isLoggedIn = useSelector<RootStateType,boolean>(state => state.app.isLoggedIn)
  console.log(isLoggedIn);


  return (
    <div className={s.appWrap}>

      <Router/>
    </div>
 );
}
