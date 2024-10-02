import pugScene from '../assets/3d/pug.glb';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Pug(props) {
  const pugRef = useRef();
  const { nodes, materials, animations } = useGLTF(pugScene);
  const { actions } = useAnimations(animations, pugRef);

  useEffect(() => {
    const actionsArray = [
      actions['AnimalArmature|Idle_2'],
      actions['AnimalArmature|Idle'],
      actions['AnimalArmature|Idle_2_HeadLow']
    ];
    let currentIndex = 0;

    const switchAction = () => {
      const currentAction = actionsArray[currentIndex];
      const nextAction = actionsArray[(currentIndex + 1) % actionsArray.length];

      currentAction.fadeOut(0.5);
      nextAction.reset().fadeIn(0.5).play();

      currentIndex = (currentIndex + 1) % actionsArray.length;
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
      ref={pugRef}
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
            name="Pug001"
            geometry={nodes.Pug001.geometry}
            material={materials.Atlas}
            skeleton={nodes.Pug001.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Pug002"
            geometry={nodes.Pug002.geometry}
            material={materials.Atlas}
            skeleton={nodes.Pug002.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Pug"
            geometry={nodes.Pug.geometry}
            material={materials.Atlas}
            skeleton={nodes.Pug.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(pugScene);
export default Pug;
