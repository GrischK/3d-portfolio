import huskyScene from '../assets/3d/husky.glb';

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import Plane from './Plane.jsx';

const Husky = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(huskyScene);
  const { actions } = useAnimations(animations, group);

  console.log(actions);

  useEffect(() => {
    const walkAction = actions['Walk'];
    const gallopAction = actions['Gallop'];
    const eatingAction = actions['Eating'];

    if (!walkAction || !gallopAction) {
      console.log('Les actions Walk ou Gallop ne sont pas trouvées');
      return;
    }

    // Démarrer l'animation "Walk" avec un fondu d'entrée
    walkAction.reset().fadeIn(0.5).play();

    // Après 5 secondes, passer à "Gallop"
    const switchToGallop = setTimeout(() => {
      walkAction.fadeOut(0.5);
      gallopAction.reset().fadeIn(0.5).play();
    }, 5000);

    // const switchToEating = setTimeout(() => {
    //   eatingAction.fadeOut(0.5);
    //   eatingAction.reset().fadeIn(0.5).play();
    // }, 10000);

    // Répéter l'alternance toutes les 10 secondes
    const interval = setInterval(() => {
      if (walkAction.isRunning()) {
        walkAction.fadeOut(0.5);
        gallopAction.reset().fadeIn(0.5).play();
      } else {
        gallopAction.fadeOut(0.5);
        walkAction.reset().fadeIn(0.5).play();
      }
    }, 10000);

    // Nettoyage à la fin
    return () => {
      clearTimeout(switchToGallop);
      clearInterval(interval);
      walkAction.stop();
      gallopAction.stop();
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

useGLTF.preload('/Husky.glb');

export default Husky;
