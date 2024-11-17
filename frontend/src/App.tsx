
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './app/Home'
import Login from './app/Login'
import SignUp from './app/Signup'
import RootLayout from './layouts/RootLayout'

const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  )

    return (
        <RouterProvider router={router} />
    )
}

export default App
