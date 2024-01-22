import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import PageLogin from '@/pages/page-login/page-login'
import PageSignUp from "@/pages/sign-up/page-sign-up.tsx";
import { Cards } from "@/components/cards/cards.tsx";
import { useMeQuery } from "@/services/auth/auth.servies.ts";
import DesksPage from "@/pages/desksPage/desksPage.tsx";
import CardsPage from "@/pages/cards/cardsPage.tsx";
import { useDispatch } from "react-redux";
import { appAC } from "@/services/app.slice.ts";

export const PATH={
  login:'/login',
  loginOut:'/logOut',
  signUp:'/signUp',
  decks:'/',
  cards:'/cards',
  cardTest:'/cardTest',
}

const publicRotes: RouteObject[] = [
  {
    element: <PageLogin />,
    // path: '/login',
    path: PATH.login,
  },
  {
    element: <PageSignUp />,
    // path: '/signUp',
    path: PATH.signUp,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DesksPage />,
    path: PATH.decks,
  },
  {
    element: <div>log out</div>,
    path: PATH.loginOut,
  },
  {
    element:<CardsPage/>,
    path:PATH.cards
  } ,

]

const router = createBrowserRouter([
  ...publicRotes,
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
function PrivateRoutes() {
  const dispatch=useDispatch()
  const {data,isError,isLoading} = useMeQuery()

  const isAuthenticated = !isError

  if(isLoading){
    return null
  }
if(data){
  dispatch(appAC.setUser(data))
}
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
