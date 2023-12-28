import HeaderIcon from "@/assets/icons/headerIcon";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import s from "@/app.module.scss";
import { store } from "@/services/store.ts";
import { Provider } from "react-redux";
import DesksPage from "@/pages/desksPage/desksPage.tsx";
import RadixDropdownMenu from "@/components/ui/radixDropdownMenu/radixDropdownMenu.tsx";
import CustomDropdownMenu, { MenuItem, MenuSeparator, SubMenu } from "@/components/ui/customDropdownMenu/customDropdownMenu.tsx";


export function App() {
  const isLogedIn = true;
  // const isLogedIn = false;
  const loginData = isLogedIn ? (
    <div className={s.userProfile}>
      userName
      <img src={"https://banner2.cleanpng.com/20180707/puq/kisspng-computer-icons-avatar-clip-art-5b40601d5c8c75.9330992415309455653791.jpg"} className={s.avatar} /></div>)
    : (<Button className={s.headerButton} style={{marginLeft: "4%"}}>Sign In</Button>);

  return (<Provider store={store}>
      <div className={s.appWrap}>
        <Header logoImg={<HeaderIcon/>} logoLink={"https://ui-kit.it-incubator.io/?path=/story/components-data-display-card--primary-with-icon"}>
          {/*<RadixDropdownMenu />*/}
          {isLogedIn ?
          <CustomDropdownMenu triggerContent={<Button className={s.btnMenu}><img src={"https://banner2.cleanpng.com/20180707/puq/kisspng-computer-icons-avatar-clip-art-5b40601d5c8c75.9330992415309455653791.jpg"} className={s.avatar} /></Button>}>
            <MenuItem path={"/"} shortcut={"⌘ E"}>Edit</MenuItem>
            <MenuItem path={"/"} shortcut={"⌘ D"}>Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem shortcut={"⌘ N"}>Archive</MenuItem>

            <SubMenu triggerContent={<div>More</div>}>
              <MenuItem path={"/"}>Move to project…</MenuItem>
              <MenuItem path={"/"}>Move to folder…</MenuItem>
              <MenuSeparator />
              <MenuItem path={"/"}>Advanced options…</MenuItem>
            </SubMenu>
          </CustomDropdownMenu>
            :<Button className={s.headerButton} style={{marginLeft: "4%"}}>Sign In</Button>
          }
          {/*{loginData}*/}
        </Header>
        <DesksPage/>
      </div>

  </Provider>);
}
