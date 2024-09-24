import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import germanShepardScene from '../assets/3d/german_shepard.glb';

export function GermanShepard({ isRotating, speed, ...props }) {
  const germanShepardRef = useRef();
  const { nodes, materials, animations } = useGLTF(germanShepardScene);
  const { actions } = useAnimations(animations, germanShepardRef);

  useEffect(() => {
    const walkAction = actions['Walk'];
    const idleAction = actions['Idle'];

    if (!walkAction || !idleAction) return;

    if (isRotating) {
      walkAction.reset().fadeIn(0.5).play();
      idleAction.fadeOut(0.5);
    } else {
      walkAction.fadeOut(0.5);
      idleAction.reset().fadeIn(0.5).play();
    }

    // console.log(speed);
  }, [actions, isRotating, speed]);

  return (
    <group
      ref={germanShepardRef}
      {...props}
      dispose={null}
    >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="AnimalArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Body} />
            <primitive object={nodes.IKBackLegL} />
            <primitive object={nodes.IKFrontLegL} />
            <primitive object={nodes.IKBackLegR} />
            <primitive object={nodes.IKFrontLegR} />
          </group>
          <skinnedMesh
            name="GermanShepherd"
            geometry={nodes.GermanShepherd.geometry}
            material={materials.Atlas}
            skeleton={nodes.GermanShepherd.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(germanShepardScene);
export default GermanShepard;
