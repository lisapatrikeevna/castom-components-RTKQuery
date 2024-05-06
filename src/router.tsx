import {
  Navigate, Outlet, RouteObject, RouterProvider, createBrowserRouter, Link,
} from 'react-router-dom'
import { useMeQuery } from "@/services/auth/auth.servies.ts";
import DesksPage from "@/pages/desksPage/desksPage.tsx";
import CardsPage from "@/pages/cards/cardsPage.tsx";
import { useDispatch } from "react-redux";
import { appAC } from "@/services/app.slice.ts";
import LearnCards from "@/pages/cards/learnCards/learnCards.tsx";
import ForPerevozilkaPage from "@/pages/forPerevozilka/forPerevozilkaPage.tsx";
import LoginForm from "@/pages/auth/loginForm/LoginForm.tsx";
import PageSignUp from "@/pages/auth/sign-up/page-sign-up.tsx";
import { Header } from "@/components/ui/header";
import HeaderIcon from "@/assets/icons/headerIcon.tsx";
import CustomDropdownMenu, { MenuItem, MenuSeparator, SubMenu } from "@/components/ui/customDropdownMenu/customDropdownMenu.tsx";
import { Button } from "@/components/ui/button";
import s from "@/app.module.scss";

export const PATH = {
  login: '/login', loginOut: '/logOut', signUp: '/signUp', decks: '/', cards: '/cards', cardTest: '/cardTest', learn: '/cards/learn', perevozilka: '/perevozilka',
}

const publicRotes: RouteObject[] = [{
  element: <LoginForm/>, // path: '/login',
  path: PATH.login,
}, {
  element: <PageSignUp/>, // path: '/signUp',
  path: PATH.signUp,
},

]

const privateRoutes: RouteObject[] = [{
  element: <DesksPage/>, path: PATH.decks,
}, {
  element: <PageSignUp/>, path: PATH.loginOut,
}, {
  element: <CardsPage/>, path: PATH.cards, // children:[
  //   {element: <LearnCards/>, path: PATH.learn}
  // ]
}, {
  element: <LearnCards/>, path: PATH.learn
}, {element: <ForPerevozilkaPage/>, path: PATH.perevozilka},

]

export const router = createBrowserRouter([...publicRotes, {
  children: privateRoutes, element: <PrivateRoutes/>,
},])



export const Router = () => {
  return <RouterProvider router={router}/>
}



function PrivateRoutes() {
  const dispatch = useDispatch()
  const {data, isError, isLoading} = useMeQuery()
  const isLoggedIn = false;
  const isAuthenticated = !isError

  if( isLoading ) {
    return null
  }
  if( data ) {
    dispatch(appAC.setUser(data))
  }
  return isAuthenticated ? <>
    <Header logoImg={<HeaderIcon/>}
            logoLink={"https://ui-kit.it-incubator.io/?path=/story/components-data-display-card--primary-with-icon"}>
      {isLoggedIn ? <CustomDropdownMenu triggerContent={<Button className={s.btnMenu}>
          <img src={"https://banner2.cleanpng.com/20180707/puq/kisspng-computer-icons-avatar-clip-art-5b40601d5c8c75.9330992415309455653791.jpg"} className={s.avatar} alt={'avatar'}/>
        </Button>}>
          <MenuItem path={"/"} shortcut={"⌘ E"}>My profile</MenuItem>
          <MenuItem path={"/"} shortcut={"⌘ D"}>Sign out</MenuItem>
          <MenuItem path={PATH.perevozilka} >perevozilka</MenuItem>
          <MenuSeparator/>
          <MenuItem shortcut={"⌘ N"}>Archive</MenuItem>
          <SubMenu triggerContent={<div>More</div>}>
            <MenuItem path={"/"}>Privat deck</MenuItem>
            <MenuItem path={"/"}>Move to folder…</MenuItem>
            <MenuSeparator/>
            <MenuItem path={"/"}>Advanced options…</MenuItem>
          </SubMenu>
        </CustomDropdownMenu> :
        // <p>pp</p>
        <Button className={s.headerButton} as={Link} to={PATH.login} style={{marginLeft: "4%"}}>Sign In</Button>
      }
    </Header>
    <Outlet/></> : <Navigate to={'/login'}/>
}

//<Route path="*" element={<NoMatch />} />