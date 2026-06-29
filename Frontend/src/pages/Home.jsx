import { Outlet } from "react-router-dom"
import Navbar from "../layout/nav/Navbar";
import Footer from "../layout/Footer";

const Home = () => {
    return(
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
    )
}

export default Home;