import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import wolfScene from '../assets/3d/wolf.glb';

export function Wolf({ isRotating, ...props }) {
  const wolf = useRef();
  const { nodes, materials, animations } = useGLTF(wolfScene);
  const { actions } = useAnimations(animations, wolf);

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
  }, [actions, isRotating]);

  return (
    <group
      ref={wolf}
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
          <group
            name="Wolf"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Wolf_1"
              geometry={nodes.Wolf_1.geometry}
              material={materials.Main}
              skeleton={nodes.Wolf_1.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
            <skinnedMesh
              name="Wolf_2"
              geometry={nodes.Wolf_2.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Wolf_2.skeleton}
            />
            <skinnedMesh
              name="Wolf_3"
              geometry={nodes.Wolf_3.geometry}
              material={materials.Eyes_Black}
              skeleton={nodes.Wolf_3.skeleton}
            />
            <skinnedMesh
              name="Wolf_4"
              geometry={nodes.Wolf_4.geometry}
              material={materials.Nose}
              skeleton={nodes.Wolf_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(wolfScene);

export default Wolf;
