import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import NotFound from "../Pages/ErrorPage/NotFound"
import Homepage from "../Pages/Homepage"

export default ()=>{
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>} />

            <Route path="/*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
}