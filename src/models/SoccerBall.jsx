import soccerBall from '../assets/3d/soccer_ball.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SoccerBall(props) {
  const soccerBallRef = useRef();
  const { nodes, materials } = useGLTF(soccerBall);
  return (
    <group
      {...props}
      dispose={null}
      ref={soccerBallRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Icosphere_Icosphere006-Mesh'].geometry}
        material={materials.white}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Icosphere_Icosphere006-Mesh_1'].geometry}
        material={materials.black}
      />
    </group>
  );
}

useGLTF.preload(soccerBall);
export default SoccerBall;
