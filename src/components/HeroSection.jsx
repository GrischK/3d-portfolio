import { Environment, OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Winter } from '../models/Winter.jsx';
import { degToRad } from 'maath/misc';

const HeroSection = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8], fov: 42 }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <color
        attach="background"
        args={['#171720']}
      />
      <OrbitControls />
      <Text
        font="fonts/Poppins-Black.ttf"
        fontSize={0.8}
        position={[-1.3, -0.5, 1]}
        lineHeight={0.8}
        textAlign="center"
        color="white"
        rotation-y={degToRad(30)}
        // anchorY={'bottom'}
      >
        GRISCHKA{'\n'}GORSKI
      </Text>
      <group
        rotation-y={degToRad(160)}
        position-x={3}
      >
        <Winter scale={0.7} />
      </group>
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default HeroSection;
