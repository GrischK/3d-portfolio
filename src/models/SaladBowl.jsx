import saladBowlScene from '../assets/3d/salad_bowl.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SaladBowl(props) {
  const saladBowlRef = useRef();
  const { nodes, materials } = useGLTF(saladBowlScene);

  return (
    <group
      {...props}
      dispose={null}
      ref={saladBowlRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh'].geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_1'].geometry}
        material={materials.mat9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_2'].geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_3'].geometry}
        material={materials.mat18}
      />
    </group>
  );
}

useGLTF.preload(saladBowlScene);
export default SaladBowl;
