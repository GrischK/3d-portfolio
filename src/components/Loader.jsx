import { useProgress } from '@react-three/drei';

const Loader = ({ started, onStarted, isPlaying }) => {
  const handleClick = () => {
    onStarted();
    isPlaying();
  };

  const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? 'loadingScreen--started' : ''}`}>
      <div className="loadingScreen__board flex flex-col">
        <h1 className="sm:text-6xl text-lg text-center text-[#1d3b16] font-bold text-left">
          Welcome in my
          <br /> little universe!
        </h1>
        <p className="sm:text-2xl text-lg text-center py-4 px-8 text-black mx-5 font-semibold text-right">
          I'm Grischka, a Full-stack developer passionate about building efficient and intuitive
          applications with JavaScript, from React to Node, with TypeScript along the way.
        </p>
        <button
          className={`loadingScreen__button ${progress < 100 ? 'loadingScreen__button--isLoading' : ''}`}
          disabled={progress < 100}
          onClick={handleClick}
        >
          {progress < 100 ? 'Loading' : 'Explore my world'}
        </button>
      </div>
    </div>
  );
};

export default Loader;
