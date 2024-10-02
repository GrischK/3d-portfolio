import raccoonScene from '../assets/3d/raccoon.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Raccoon(props) {
  const raccoonRef = useRef();
  const { nodes, materials } = useGLTF(raccoonScene);
  return (
    <group
      {...props}
      dispose={null}
      ref={raccoonRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Raccoon_Mesh.geometry}
        material={materials.Raccoon_Mat}
      />
    </group>
  );
}

useGLTF.preload(raccoonScene);
export default Raccoon;
