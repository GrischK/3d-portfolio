import animatedFoxScene from '../assets/3d/animated_fox.glb';
import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

export function AnimatedFox(props) {
  const staticFoxRef = useRef();
  const { nodes, materials, animations } = useGLTF(animatedFoxScene);
  const { actions } = useAnimations(animations, staticFoxRef);

  useEffect(() => {
    const actionsArray = [
      actions['AnimalArmature|Idle_2'],
      actions['AnimalArmature|Idle'],
      actions['AnimalArmature|Idle_2_HeadLow'],
      actions['AnimalArmature|Eating']
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
      ref={staticFoxRef}
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
            name="Fox"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Fox_1"
              geometry={nodes.Fox_1.geometry}
              material={materials.Main}
              skeleton={nodes.Fox_1.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
            <skinnedMesh
              name="Fox_2"
              geometry={nodes.Fox_2.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Fox_2.skeleton}
            />
            <skinnedMesh
              name="Fox_3"
              geometry={nodes.Fox_3.geometry}
              material={materials.Grey}
              skeleton={nodes.Fox_3.skeleton}
            />
            <skinnedMesh
              name="Fox_4"
              geometry={nodes.Fox_4.geometry}
              material={materials.Black}
              skeleton={nodes.Fox_4.skeleton}
            />
            <skinnedMesh
              name="Fox_5"
              geometry={nodes.Fox_5.geometry}
              material={materials.Eyes}
              skeleton={nodes.Fox_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(animatedFoxScene);
export default AnimatedFox;
