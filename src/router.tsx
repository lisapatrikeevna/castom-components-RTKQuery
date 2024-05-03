import {
  Navigate, Outlet, RouteObject, RouterProvider, createBrowserRouter,
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
  element: <div>log out</div>, path: PATH.loginOut,
}, {
  element: <CardsPage/>, path: PATH.cards, // children:[
  //   {element: <LearnCards/>, path: PATH.learn}
  // ]
}, {
  element: <LearnCards/>, path: PATH.learn
}, {element: <ForPerevozilkaPage/>, path: PATH.perevozilka},

]

const router = createBrowserRouter([...publicRotes, {
  children: privateRoutes, element: <PrivateRoutes/>,
},])



export const Router = () => {
  return <RouterProvider router={router}/>
}



function PrivateRoutes() {
  const dispatch = useDispatch()
  const {data, isError, isLoading} = useMeQuery()

  const isAuthenticated = !isError

  if( isLoading ) {
    return null
  }
  if( data ) {
    dispatch(appAC.setUser(data))
  }
  return isAuthenticated ? <Outlet/> : <Navigate to={'/login'}/>
}

//<Route path="*" element={<NoMatch />} />