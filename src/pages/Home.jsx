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
import Kayak from '../models/Kayak.jsx';
import Frog from '../models/Frog.jsx';

const Home = () => {
  const audioRef = useRef(new Audio(acoustic));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (!isRotating) return; // Ne calcule pas la vitesse si la forêt ne tourne pas

    let lastPositionX = 0;
    let lastTime = Date.now();

    const handleMouseMove = (event) => {
      const currentPositionX = event.clientX;
      const currentTime = Date.now();

      // Calcule la distance parcourue sur l'axe X
      const distanceX = currentPositionX - lastPositionX;

      // Calcule la vitesse (distance / temps écoulé)
      const timeElapsed = (currentTime - lastTime) / 1000; // en secondes
      const currentSpeed = Math.abs(distanceX) / timeElapsed;

      setMousePosition({ x: currentPositionX });
      setSpeed(currentSpeed);

      lastPositionX = currentPositionX;
      lastTime = currentTime;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isRotating, speed]);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
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

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [0, -4, 3.6];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  // console.log(speed);
  console.log(currentStage);
  return (
    <section className="w-full h-screen relative bg-[#dfd6c6]">
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
        <Suspense fallback={<Loader />}>
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
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <GermanShepard
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20.5, 0]}
            speed={speed}
          />
        </Suspense>
      </Canvas>
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
