import { Outlet } from "react-router-dom"
import Navbar from "../components/nav/Navbar"

const Home = () => {
    return(
    <>
        <Navbar />
        <Outlet />
        
    </>
    )
}

export default Home