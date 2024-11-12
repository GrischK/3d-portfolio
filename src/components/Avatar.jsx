import { MeshReflectorMaterial, OrbitControls, PresentationControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Avatar = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', backgroundColor: 'black' }}>
      <color attach="background" args={["#213547"]} />
      <fog attach="fog" args={["#213547", 10, 20]} />
      <>
        <PresentationControls
          speed={1.5}
          global
          polar={[-0.1, Math.PI / 4]}
          rotation={[Math.PI / 8, Math.PI / 4, 0]}
        >
          <Stage
            environment="city"
            intensity={0.6}
            castShadow={false}
            adjustCamera={false}
          >
            <mesh>
              <boxGeometry />
              <meshNormalMaterial />
            </mesh>
          </Stage>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position-y={-2}
          >
            <planeGeometry args={[170, 170]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
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
