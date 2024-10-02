import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader.jsx';
import HomeInfo from '../components/HomeInfo.jsx';
import acoustic from '../assets/acoustic_journey.mp3';
import soundon from '../assets/icons/soundon.png';
import soundoff from '../assets/icons/soundoff.png';
import Forest from '../models/Forest.jsx';
import Eagle from '../models/Eagle.jsx';
import GermanShepard from '../models/GermanShepard.jsx';
import GrabAnimation from '../components/GrabAnimation.jsx';

const Home = () => {
  const audioRef = useRef(new Audio(acoustic));
  audioRef.current.volume = 0.3;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [start, setStart] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [showGrabAnimation, setShowGrabAnimation] = useState(true);

  // TODO: commented for test, uncomment when deploying
  // useEffect(() => {
  //   if (isPlayingMusic) {
  //     audioRef.current.play();
  //   }
  //   return () => {
  //     audioRef.current.pause();
  //   };
  // }, [isPlayingMusic]);
  //
  // useEffect(() => {
  //   if (start) {
  //     audioRef.current.play();
  //   }
  // }, [start]);

  const adjustCampingForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -2, -20];
    let rotation = [0.2, -1.1, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.8, 0.8, 0.8];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustDogForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [0, -4.5, 0];
    } else {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [0, -4, 3.6];
    }
    return [screenScale, screenPosition];
  };

  const [campingScale, campingPosition, campingRotation] = adjustCampingForScreenSize();

  const [dogScale, dogPosition] = adjustDogForScreenSize();

  return (
    <section className="w-full h-screen relative bg-[#dfd6c6]">
      {showGrabAnimation && start && <GrabAnimation />}
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center ">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        // camera={{ near: 0.1, far: 1000 }}
        shadows
        camera={{
          position: [0, 0, 14],
          fov: 47
        }}
      >
        <Suspense fallback={null}>
          {start && (
            <>
              <directionalLight
                position={[1, 1, 1]}
                intensity={2}
              />
              <ambientLight intensity={0.5} />
              <pointLight
                position={[10, 5, 10]}
                intensity={2}
              />
              <spotLight
                position={[0, 50, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
              />
              <hemisphereLight
                skyColor="#b1e1ff"
                groundColor="#000000"
                intensity={1}
              />
              <fog
                attach="fog"
                args={['#dfd6c6', 40, 50]}
              />
              <Eagle scale={[0.01, 0.01, 0.01]} />
              <Forest
                position={campingPosition}
                scale={campingScale}
                rotation={campingRotation}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
                setCurrentStage={setCurrentStage}
                setShowGrabAnimation={setShowGrabAnimation}
                setSpeed={setSpeed}
              />
              <GermanShepard
                isRotating={isRotating}
                position={dogPosition}
                scale={dogScale}
                rotation={[0, 20.5, 0]}
                speed={speed}
              />
            </>
          )}
        </Suspense>
      </Canvas>
      <Loader
        started={start}
        onStarted={() => setStart(true)}
        isPlaying={() => setIsPlayingMusic(true)}
      />
      <div className="absolute bottom-2 left-2">
        <img
          className="w-10 h-10 cursor-pointer object-contain"
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default Home;
