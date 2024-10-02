import sodaCanScene from '../assets/3d/soda_can.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SodaCan(props) {
  const sodaCanRef = useRef();
  const { nodes, materials } = useGLTF(sodaCanScene);

  return (
    <group
      {...props}
      dispose={null}
      ref={sodaCanRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Circle001-Mesh'].geometry}
        material={materials['78909C']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Circle001-Mesh_1'].geometry}
        material={materials.F44336}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Circle001-Mesh_2'].geometry}
        material={materials.FFFFFF}
      />
    </group>
  );
}

useGLTF.preload(sodaCanScene);
export default SodaCan;
