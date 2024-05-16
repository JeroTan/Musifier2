import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import NotFound from "../Pages/ErrorPage/NotFound"
import Homepage from "../Pages/Homepage"
import Login from "../Pages/Authenticate/Login"
import Signup from "../Pages/Authenticate/Signup"
import Logout from "../Pages/Authenticate/Logout"

export default ()=>{
    return <BrowserRouter>
        <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Homepage/>} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/join" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
}
