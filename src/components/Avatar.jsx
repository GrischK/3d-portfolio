import { MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Cicada from './Cicada.jsx';

const Avatar = () => {
  return (
    <Canvas
      style={{ height: '100vh', width: '100vw', backgroundColor: 'black' }}
      camera={{ position: [-0.5, 1, 4] }}
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
          rotation={[Math.PI / 8, Math.PI / 4, 0]}
        >
          <Stage
            environment="city"
            intensity={1.8}
            castShadow={false}
            adjustCamera={false}
          >
            <Suspense fallback={null}>
              <Cicada />
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
