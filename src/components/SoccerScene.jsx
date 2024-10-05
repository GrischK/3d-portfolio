import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import SoccerField from '../models/SoccerField.jsx';
import SoccerBall from '../models/SoccerBall.jsx';
import {
  CameraControls,
  MeshReflectorMaterial,
  PerspectiveCamera,
  useHelper
} from '@react-three/drei';
import { degToRad } from 'maath/misc';
import Trophy from '../models/Trophy.jsx';
import SoccerStadium from '../models/SoccerStadium.jsx';
import { AxesHelper, CameraHelper } from 'three';

const SoccerScene = () => {
  const controls = useRef();
  const directionalLightRef = useRef();
  console.log(directionalLightRef);

  const cameraRef = useRef();
  console.log(cameraRef);
  return (
    <section className="w-full h-screen relative bg-[#dfd6c6]">
      <Canvas
        className={`w-full h-screen bg-transparent`}
        shadows
      >
        {cameraRef.current && <primitive object={new CameraHelper(cameraRef.current)} />}

        <Suspense fallback={null}>
          <primitive object={new AxesHelper(5)} />

          <directionalLight
            ref={directionalLightRef}
            position={[60, 100, 100]}
            rotation={[0, 0, 0]}
            intensity={2}
            castShadow
            shadow-mapSize-width={4096 * 2} // Augmente la résolution de l'ombre
            shadow-mapSize-height={4096 * 2} // Augmente la résolution de l'ombre
            shadow-camera-left={-50} // Augmente la largeur de la caméra d'ombre
            shadow-camera-right={50} // Augmente la largeur de la caméra d'ombre
            shadow-camera-top={10} // Augmente la hauteur de la caméra d'ombre
            shadow-camera-bottom={-10}
          />
          {/*{directionalLightRef.current && (*/}
          {/*  <cameraHelper args={[directionalLightRef.current.shadow.camera]} />*/}
          {/*)}*/}
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

          {/* Caméra principale avec ref */}
          <PerspectiveCamera
            makeDefault // Cela définira cette caméra comme la caméra par défaut
            rotation={[0, 4.7, 0]}
            position={[-20, 10, 0]} // Position de la caméra pour ajuster l'angle
            fov={60} // Vous pouvez ajuster le champ de vision pour changer l'angle
            near={1}
            far={100}
          />
          <PerspectiveCamera
            ref={cameraRef} // Attachement de la ref ici
            // makeDefault // Cela définira cette caméra comme la caméra par défaut
            rotation={[0, 4.7, 0]}
            position={[-20, 20, 0]} // Position de la caméra pour ajuster l'angle
            fov={50} // Vous pouvez ajuster le champ de vision pour changer l'angle
            near={1}
            far={100}
          />
          {/* Utilisation du CameraHelper */}
          {cameraRef.current && <primitive object={new CameraHelper(cameraRef.current)} />}

          <CameraControls
            ref={controls}
            // minPolarAngle={degToRad(20)}
            // maxPolarAngle={degToRad(90)}
          />
          <SoccerStadium
            scale={0.1}
            position={[10, 0, 0]}
          />
          <group
            castShadow
            receiveShadow
            position={[-5, 4.3, -3]}
          >
            <Trophy
              scale={3}
              position={[10, 0, 2]}
            />
            <SoccerBall
              position={[5, -1, 2]}
              scale={0.5}
            />
          </group>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default SoccerScene;
