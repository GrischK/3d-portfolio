import React, { useEffect, useRef } from 'react';
import planeScene from '../assets/3d/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

export function Plane({ isRotating, ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const action = actions['Take 001'];

    if (!action) return;

    if (isRotating) {
      action.reset().fadeIn(0.5).play();
    } else {
      action.fadeOut(0.5);
    }
  }, [actions, isRotating]);

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;
