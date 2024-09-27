import soccerFieldScene from '../assets/3d/soccer_field.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SoccerField(props) {
  const soccerFieldRed = useRef();
  const { nodes, materials } = useGLTF(soccerFieldScene);
  return (
    <group
      {...props}
      dispose={null}
      ref={soccerFieldRed}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh'].geometry}
        material={materials.mat9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_1'].geometry}
        material={materials.mat21}
      />
    </group>
  );
}

useGLTF.preload(soccerFieldScene);
export default SoccerField;
