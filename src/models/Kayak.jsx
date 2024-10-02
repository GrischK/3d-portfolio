import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import kayakScene from '../assets/3d/kayak.glb';

export function Kayak(props) {
  const kayakRef = useRef();
  const { nodes, materials } = useGLTF(kayakScene);

  return (
    <group
      {...props}
      dispose={null}
      ref={kayakRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PUSHILIN_Kayak_Circle003.geometry}
        material={materials.kayak}
      />
    </group>
  );
}

useGLTF.preload(kayakScene);
export default Kayak;
