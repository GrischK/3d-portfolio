import soccerStadium from '../assets/3d/soccer_stadium.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import SoccerField from './SoccerField.jsx';

export function SoccerStadium(props) {
  const soccerStadiumRef = useRef();
  const { nodes, materials } = useGLTF(soccerStadium);
  return (
    <group
      {...props}
      dispose={null}
      ref={soccerStadiumRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1.geometry}
        material={materials['14___Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_1.geometry}
        material={materials['10___Default']}
      />
      {/*<mesh*/}
      {/*  castShadow*/}
      {/*  receiveShadow*/}
      {/*  geometry={nodes.Box007_1_2.geometry}*/}
      {/*  material={materials['01___Default']}*/}
      {/*/>*/}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_3.geometry}
        material={materials['08___Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_5.geometry}
        material={materials.Material__853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_6.geometry}
        material={materials.Material__852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_7.geometry}
        material={materials.Material__856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_8.geometry}
        material={materials.Material__855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_9.geometry}
        material={materials.Material__857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_10.geometry}
        material={materials.Material__854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_11.geometry}
        material={materials['13___Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_12.geometry}
        material={materials['04___Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_13.geometry}
        material={materials.Material__694}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_14.geometry}
        material={materials['20___Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box007_1_15.geometry}
        material={materials['15___Default']}
      />
      <SoccerField
        scale={52}
        position={[26.5, 35, 1]}
        rotation={[0, 1.57, 0]}
      />
    </group>
  );
}

useGLTF.preload(soccerStadium);
export default SoccerStadium;
