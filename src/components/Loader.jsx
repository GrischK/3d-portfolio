import { PerspectiveCamera, useProgress } from '@react-three/drei';
import Rings from './Rings.jsx';
import { useMediaQuery } from 'react-responsive';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import HeroCamera from './HeroCamera.jsx';

const Loader = ({ started, onStarted, isPlaying }) => {
  const handleClick = () => {
    onStarted();
    isPlaying();
  };
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? 'loadingScreen--started' : ''}`}>
      <div className="loadingScreen__board flex flex-col items-center sm:items-stretch relative">
        <h1 className="sm:text-8xl text-4xl text-[#1d3b16] font-bold sm:text-left text-center">
          Welcome to my
          <br /> <span className={'green-gradient_text'}>little universe!</span>
        </h1>

        {!started && (
          <Canvas
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              zIndex: 1
            }}
          >
            <Suspense fallback={null}>
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 29]}
              />
              <HeroCamera isMobile={isMobile}>
                <Rings
                  position={[isMobile ? 0 : 25, isMobile ? 14.5 : 10, 0]}
                  scale={isMobile ? 0.5 : 0.7}
                />
              </HeroCamera>
              <ambientLight intensity={1} />
              <directionalLight
                position={[10, 10, 10]}
                intensity={2}
              />
            </Suspense>
          </Canvas>
        )}

        <p className="sm:text-4xl text-lg pt-4 px-8 text-black mx-5 font-semibold sm:text-right text-center">
          I'm Grischka, a full-stack developer passionate about building efficient and intuitive
          applications.
        </p>
        <span className="sm:text-xl text-sm px-8 text-black mx-5 font-light sm:font-semibold sm:text-right text-center">
          (With JavaScript — from React to Node & TypeScript along the way.)
        </span>
        <button
          className={`loadingScreen__button z-10 ${progress < 100 ? 'loadingScreen__button--isLoading' : ''}`}
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
