import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dealership from './pages/Dealership'
import Manufacturer from './pages/Manufacturer'
import Model from './pages/Model'
import Vehicle from './pages/Vehicle'
import { Route, Routes } from "react-router-dom"

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dealership" element={<Dealership />} />
                    <Route path="/manufacturer" element={<Manufacturer />} />
                    <Route path="/model" element={<Model />} />
                    <Route path="/vehicle" element={<Vehicle />} />
                </Routes>
            </div>
        </>
    )
}

export default App

