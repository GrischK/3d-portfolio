import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import germanShepardScene from '../assets/3d/german_shepard.glb';
import { useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';

export function GermanShepard({ isRotating, speed, ...props }) {
  const germanShepardRef = useRef();
  const { nodes, materials, animations } = useGLTF(germanShepardScene);
  const { actions } = useAnimations(animations, germanShepardRef);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    const walkAction = actions['Walk'];
    const idleAction = actions['Idle'];
    const runAction = actions['Run'];

    if (!walkAction || !idleAction || !runAction) return;

    idleAction.play();

    return () => {
      // Arrête les animations lorsque le composant est démonté
      walkAction.stop();
      idleAction.stop();
      runAction.stop();
    };
  }, [actions]);

  useFrame(() => {
    const walkAction = actions['Walk'];
    const idleAction = actions['Idle'];
    const runAction = actions['Run'];

    if (isRotating) {
      if (speed < -0.03 && !isTabletOrMobile) {
        if (!runAction.isRunning()) {
          runAction.reset().fadeIn(isTabletOrMobile ? 0.05 : 0.4).play();
          idleAction.fadeOut(isTabletOrMobile ? 0.05 : 0.4);
          walkAction.fadeOut(isTabletOrMobile ? 0.05 : 0.4);
        }
      } else if (speed > -0.03 && speed < 0) {
        walkAction.timeScale = 1;

        if (!walkAction.isRunning()) {
          walkAction.reset().fadeIn(0.4).play();
          idleAction.fadeOut(0.4);
          runAction.fadeOut(0.4);
        }
      } else if (speed > 0) {
        walkAction.timeScale = -1;

        if (!walkAction.isRunning()) {
          walkAction.reset().fadeIn(0.4).play();
          idleAction.fadeOut(0.4);
          runAction.fadeOut(0.4);
        }
      }
    } else {
      walkAction.timeScale = 1;

      if (!idleAction.isRunning()) {
        idleAction.reset().fadeIn(0.4).play();
        walkAction.fadeOut(0.4);
        runAction.fadeOut(0.4);
      }
    }
  });

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
