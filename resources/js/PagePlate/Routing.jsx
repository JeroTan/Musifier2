import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import NotFound from "../Pages/ErrorPage/NotFound"
import Homepage from "../Pages/Homepage"
import Login from "../Pages/Authenticate/Login"
import Signup from "../Pages/Authenticate/Signup"
import Logout from "../Pages/Authenticate/Logout"
import { InstrumentIndex, ListInstruments } from "../Pages/Instruments/Instruments"
import { ElectricGuitarIndex } from "../Pages/Instruments/Types/ElectricGuitar"
import { PianoIndex } from "../Pages/Instruments/Types/Piano"
import { InstrumentNotFound } from "../Pages/Instruments/Types/NotFound"

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

            {/* Instruments */}
            <Route path="/instrument" element={<InstrumentIndex />}>
                <Route index element={ <ListInstruments />} />
                <Route path="ElectricGuitar" element={ <ElectricGuitarIndex /> } />
                <Route path="Piano" element={ <PianoIndex /> } />

                <Route path="*" element={ <InstrumentNotFound /> } />
            </Route>

            {/* Fallback */}
            <Route path="/*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
}
