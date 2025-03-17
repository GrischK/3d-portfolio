import { Float, useGLTF, useTexture } from '@react-three/drei';
import cube from '../assets/3d/cube.glb';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const Cube = (props) => {
  const { nodes, materials } = useGLTF(cube);
  const texture = useTexture('textures/cube.png');
  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0.8);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (cubeRef.current) {
      timeRef.current += delta;

      if (timeRef.current > 2) {
        targetSpeedRef.current = hovered ? 1.5 : Math.random() * 0.8 + 0.5;
        timeRef.current = 0;
      }

      speedRef.current += (targetSpeedRef.current - speedRef.current) * delta * 1.5;
      cubeRef.current.rotation.y += speedRef.current * delta * (hovered ? 0.8 : Math.PI * 0.5);
      cubeRef.current.rotation.x += (hovered ? 0.8 : -Math.PI * 0.5) * speedRef.current * delta;
    }
  });

  return (
    <Float floatIntensity={2}>
      <group dispose={null} {...props} >
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload(cube);
export default Cube;