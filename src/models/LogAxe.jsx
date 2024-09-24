import logAxeScene from '../assets/3d/log_axe.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function LogAxe(props) {
  const logAxeRef = useRef();
  const { nodes, materials } = useGLTF(logAxeScene);
  return (
    <group
      {...props}
      dispose={null}
      ref={logAxeRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1045108175.geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1045108175_1.geometry}
        material={materials.mat18}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1045108175_2.geometry}
        material={materials.mat16}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1045108175_3.geometry}
        material={materials.mat15}
      />
    </group>
  );
}

useGLTF.preload(logAxeScene);

export default LogAxe;
