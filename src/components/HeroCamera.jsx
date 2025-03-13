import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const HeroCamera = ({ children }) => {
  const groupRef = useRef();

  const minPolarAngle = -Math.PI / 20; // Limite inférieure
  const maxPolarAngle = Math.PI / 30 ; // Limite supérieure

  useFrame((state, delta) => {
    const targetRotation = [-state.pointer.y / 3, -state.pointer.x / 5, 0];

    // Limiter la rotation verticale
    targetRotation[0] = Math.min(Math.max(targetRotation[0], minPolarAngle), maxPolarAngle);

    easing.dampE(groupRef.current.rotation, targetRotation, 0.25, delta);
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};

export default HeroCamera;