import woodLogScene from '../assets/3d/wood_log.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function WoodLog(props) {
  const woodLogRef = useRef();
  const { nodes, materials } = useGLTF(woodLogScene);

  return (
    <group
      {...props}
      dispose={null}
      ref={woodLogRef}
    >
      <group
        rotation={[-Math.PI / 2, 0, -0.67]}
        scale={198.943}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WoodLog_1.geometry}
          material={materials.Wood}
          material-roughness={1.5}
          material-metalness={0.45}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WoodLog_2.geometry}
          material={materials.LightWood}
        />
      </group>
    </group>
  );
}

useGLTF.preload(woodLogScene);
export default WoodLog;
