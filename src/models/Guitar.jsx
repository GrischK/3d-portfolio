import guitarScene from '../assets/3d/guitar.glb';
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Guitar(props) {
  const guitarRef = useRef();
  const { nodes, materials } = useGLTF(guitarScene);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.metalness = 0;
      material.roughness = 1;
    });
  }, [materials]);

  return (
    <group
      {...props}
      dispose={null}
      ref={guitarRef}
    >
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Guitar1_1.geometry}
          material={materials.Wood2Guitar1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Guitar1_2.geometry}
          material={materials.Wood1Guitar1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Guitar1_3.geometry}
          material={materials.Metal1Guitar1}
        />
      </group>
    </group>
  );
}

useGLTF.preload(guitarScene);
export default Guitar;
