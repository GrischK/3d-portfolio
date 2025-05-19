import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const step = parseInt(searchParams.get('step') || '1');

  return (
    <header className={`${location.pathname !== '/' ? 'header' : 'header-home'}`}>
      {location.pathname !== '/' && (
        <NavLink
          to="/"
          className="w-12 h-12 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
        >
          <p className="blue-gradient_text">GG</p>
        </NavLink>
      )}
      <nav className={'flex text-lg gap-3 md:gap-7 font-medium items-center justify-center'}>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            const baseClass = isActive ? 'text-blue-500' : 'text-black';
            // Si on est sur  la page projects et step === 1, le lien About devient blanc
            if (location.pathname === '/projects' && step === 1 && !isActive) {
              return 'text-white';
            }
            return (location.pathname === '/lab' || location.pathname === '/test') && !isActive
              ? 'text-white'
              : baseClass;
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => {
            const baseClass = isActive ? 'text-blue-500' : 'text-black';
            return (location.pathname === '/lab' || location.pathname === '/test') && !isActive
              ? 'text-white'
              : baseClass;
          }}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}
        >
          {({ isActive }) => (
            <button
              className={`font-medium hover:border-white transition-all duration-300 px-2 py-2 rounded-full text-lg shrink-0 text-white bg-gradient-to-r ${
                location.pathname !== '/'
                  ? 'from-[#00c6ff] to-[#0072ff]'
                  : 'from-[#368122] to-[#7ab648]'
              } bg-[length:200%_200%] bg-left hover:bg-right transition-[background-position] duration-500`}
            >
              Contact
            </button>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
