import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home, About, Projects, Contact} from "./Pages"
import NavBar from "./Components/NavBar.jsx";

const App = () => {
    return (
        <main className="text-3xl font-bold text-blue-500">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                    <Route path="/projects" element={<Contact/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App;