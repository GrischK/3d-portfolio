import { Loader, MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import Cicada from './Cicada.jsx';

const Avatar = ({setPage}) => {
  const [action, setAction] = useState(false);
  const [leather, setLeather] = useState(false);
  const [wood, setWood] = useState(false);

  return (
    <div>
      <button
        className={`z-10 w-[fit-content] border-transparent hover:bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:text-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border bg-white text-black fixed transform:translateX(-50%) left-1/2 top-10 '}`}
        onClick={() => setPage(null)}
      >
        Back
      </button>
      <div className="select-none z-10 fixed inset-x-0 bottom-2 flex justify-center items-center h-[fit-content] gap-4">
        <button
          className={`w-[fit-content] border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border ${action ? 'bg-white text-black' : 'text-white'}`}
          onClick={() => setAction((prevState) => !prevState)}
        >
          let's see
        </button>
        <button
          className={`w-[fit-content] border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border ${leather ? 'bg-white text-black' : 'text-white'}`}
          onClick={() => setLeather((prevState) => !prevState)}
        >
          Leather
        </button>
        <button
          className={`w-[fit-content] border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border ${wood ? 'bg-white text-black' : 'text-white'}`}
          onClick={() => setWood((prevState) => !prevState)}
        >
          Wood
        </button>
      </div>
      <Loader />
      <Canvas
        style={{ height: '100vh', width: '100h', backgroundColor: 'black' }}
        camera={{ position: [0, 0, 2.5], fov: 90 }}
      >
        <color
          attach="background"
          args={['#10191f']}
        />
        <fog
          attach="fog"
          args={['#10191f', 10, 30]}
        />
        <>
          <PresentationControls
            speed={1.5}
            global
            polar={[-0.5, Math.PI / 4]}
            rotation={[Math.PI / 9, Math.PI / 6, 0]}
          >
            <Stage
              environment="city"
              intensity={1.8}
              castShadow={false}
              adjustCamera={false}
            >
              <Suspense fallback={null}>
                <Cicada
                  playAnimation={action}
                  leather={leather}
                  wood={wood}
                />
              </Suspense>
            </Stage>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position-y={-1.3}
            >
              <planeGeometry args={[170, 170]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={0.5}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
              />
            </mesh>
          </PresentationControls>
        </>
      </Canvas>
    </div>
  );
};

export default Avatar;
