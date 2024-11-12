import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, About, Projects, Contact } from './pages';
import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import Lab from './pages/Lab.jsx';
import { BookContainer } from './components/BookContainer.jsx';
import Avatar from './components/Avatar.jsx';

const App = () => {
  return (
    <main className="bg-slate-300/20 min-h-[100vh]">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/projects"
            element={<Projects />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/lab"
            element={<Lab />}
          />
          <Route
            path="/test"
            element={<BookContainer />}
          />
          <Route
            path="/avatar"
            element={<Avatar />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
