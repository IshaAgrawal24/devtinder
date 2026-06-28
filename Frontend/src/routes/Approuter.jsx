import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/Home';
const Approuter = () => {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Home />}>
                    <Route path="/profile" element={<div>Profile</div>} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
               
            </Routes>
        </BrowserRouter>
    )
}

export default Approuter