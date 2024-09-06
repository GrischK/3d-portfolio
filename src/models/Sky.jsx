import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import skyScene from '../assets/3d/sky.glb';
import { useFrame } from '@react-three/fiber';

export function Sky({ isRotating }) {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta;
    } else {
      skyRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
}

export default Sky;
