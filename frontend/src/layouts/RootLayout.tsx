import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const RootLayout = () => {
  return (
    <div className="root-layout">
        <main>
            <NavBar />
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout