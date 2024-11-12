import { MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Car } from '../models/Car.jsx';
import { Suspense } from 'react';

const Avatar = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', backgroundColor: 'black' }} camera={{ position: [-0.5, 1, 8]}}>
      <color
        attach="background"
        args={['#213547']}
      />
      <fog
        attach="fog"
        args={['#213547', 10, 30]}
      />
      <>
        <PresentationControls
          speed={1.5}
          global
          polar={[-0.5, Math.PI / 4]}
          rotation={[Math.PI / 8, Math.PI / 4, 0]}
        >
          <Stage
            environment="city"
            intensity={0.6}
            castShadow={false}
            adjustCamera={false}
          >
            <Suspense fallback={null}>
              <Car />
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
  );
};

export default Avatar;
