import trophyScene from '../assets/3d/trophy.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Trophy(props) {
  const trophyRef = useRef();
  const { nodes, materials } = useGLTF(trophyScene);
  return (
    <group
      {...props}
      dispose={null}
      ref={trophyRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Collectable_Trophy_01.geometry}
        material={materials['In-Game_Collectables_Color_Palette_01.001']}
      />
    </group>
  );
}

useGLTF.preload(trophyScene);
export default Trophy;
