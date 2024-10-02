import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-12 h-12 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">GG</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Projects
        </NavLink>
        <NavLink
          to="/lab"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Lab
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
