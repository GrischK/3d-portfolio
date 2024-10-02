import huskyScene from '../assets/3d/husky.glb';

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Husky = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(huskyScene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const actionsArray = [
      actions['Walk'],
      actions['Gallop'],
      actions['Eating'],
      actions['Idle_2_HeadLow'],
      actions['Jump_ToIdle']
    ];
    let currentIndex = 0;

    const switchAction = () => {
      const currentAction = actionsArray[currentIndex];
      const nextAction = actionsArray[(currentIndex + 1) % actionsArray.length];

      currentAction.fadeOut(0.5);
      nextAction.reset().fadeIn(0.5).play();

      currentIndex = (currentIndex + 1) % actionsArray.length;

      if (nextAction === actions['Jump_ToIdle']) {
        setTimeout(() => {
          nextAction.fadeOut(0.5);
          const nextAfterJump = actionsArray[(currentIndex + 1) % actionsArray.length];
          nextAfterJump.reset().fadeIn(0.5).play();
          currentIndex = (currentIndex + 1) % actionsArray.length;
        }, 1100); // 2,5 secondes
      }
    };

    // Démarrer la première action
    actionsArray[currentIndex].reset().fadeIn(0.5).play();

    // Alterner toutes les 5 secondes
    const interval = setInterval(switchAction, 5000);

    // Nettoyage à la fin
    return () => {
      clearInterval(interval);
      actionsArray.forEach((action) => action.stop());
    };
  }, [actions]);

  return (
    <group
      ref={group}
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
            name="Cube"
            position={[0, 0, 0.062]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Cube_1"
              geometry={nodes.Cube_1.geometry}
              material={materials.Material}
              skeleton={nodes.Cube_1.skeleton}
            />
            <skinnedMesh
              name="Cube_2"
              geometry={nodes.Cube_2.geometry}
              material={materials['Material.001']}
              skeleton={nodes.Cube_2.skeleton}
            />
            <skinnedMesh
              name="Cube_3"
              geometry={nodes.Cube_3.geometry}
              material={materials['Material.006']}
              skeleton={nodes.Cube_3.skeleton}
            />
            <skinnedMesh
              name="Cube_4"
              geometry={nodes.Cube_4.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Cube_4.skeleton}
            />
            <skinnedMesh
              name="Cube_5"
              geometry={nodes.Cube_5.geometry}
              material={materials['Material.002']}
              skeleton={nodes.Cube_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(huskyScene);

export default Husky;
