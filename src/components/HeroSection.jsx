import { OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

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
      >
        GRISCHKA{'\n'}GORSKI
      </Text>
    </Canvas>
  );
};

export default HeroSection;
