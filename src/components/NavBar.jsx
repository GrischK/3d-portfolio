import { NavLink,useLocation  } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  // console.log(location.pathname);

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
          className={({ isActive }) => {
            const baseClass = isActive ? 'text-blue-500' : 'text-black';
            return (location.pathname === '/lab' || location.pathname === '/test') && !isActive ? 'text-white' : baseClass;
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => {
            const baseClass = isActive ? 'text-blue-500' : 'text-black';
            return (location.pathname === '/lab' || location.pathname === '/test') && !isActive ? 'text-white' : baseClass;
          }}        >
          Projects
        </NavLink>
        <NavLink
          to="/lab"
          className={({ isActive }) => {
            const baseClass = isActive ? 'text-blue-500' : 'text-black';
            return (location.pathname === '/lab' || location.pathname === '/test') && !isActive ? 'text-white' : baseClass;
          }}        >
          Lab
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
