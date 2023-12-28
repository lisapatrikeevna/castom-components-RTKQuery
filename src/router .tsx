import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import PageLogin from '@/pages/page-login/page-login'
import { Decks } from '@/pages/decks'

const publicRotes: RouteObject[] = [
  {
    element: <PageLogin />,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
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
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
