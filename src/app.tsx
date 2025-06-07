import { Routes, Route } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "./components/ui/sonner"

const App = () => {
    
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/auth" element = {<Auth/>}/>
            <Route path="/dashboard" element = {<Dashboard/>}/>
        </Routes>
        <Toaster position="top-center"/>
        </>
    )
}

export default App