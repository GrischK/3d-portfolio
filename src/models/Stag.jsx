import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import stagScene from '../assets/3d/stag.glb';

export function Stag(props) {
  const stagRef = useRef();
  const { nodes, materials, animations } = useGLTF(stagScene);
  const { actions } = useAnimations(animations, stagRef);

  useEffect(() => {
    const actionsArray = [
      actions['Idle'],
      actions['Eating'],
      actions['Idle_2'],
      actions['Idle_Headlow'],
      actions['Idle_2']
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
      ref={stagRef}
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
            name="Stag"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Stag_1"
              geometry={nodes.Stag_1.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Stag_1.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
            <skinnedMesh
              name="Stag_2"
              geometry={nodes.Stag_2.geometry}
              material={materials.Material}
              skeleton={nodes.Stag_2.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
            <skinnedMesh
              name="Stag_3"
              geometry={nodes.Stag_3.geometry}
              material={materials['Material.010']}
              skeleton={nodes.Stag_3.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
            <skinnedMesh
              name="Stag_4"
              geometry={nodes.Stag_4.geometry}
              material={materials['Material.001']}
              skeleton={nodes.Stag_4.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
            <skinnedMesh
              name="Stag_5"
              geometry={nodes.Stag_5.geometry}
              material={materials['Material.011']}
              skeleton={nodes.Stag_5.skeleton}
              material-roughness={0.8} // Augmenter la rugosité pour réduire la brillance
              material-metalness={0.1}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(stagScene);
