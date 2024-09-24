import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import frogScene from '../assets/3d/frog.glb';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Frog(props) {
  const frogRef = useRef();
  const { nodes, materials, animations } = useGLTF(frogScene);
  const { actions } = useAnimations(animations, frogRef);
  const [direction, setDirection] = useState(1); // 1 = vers la gauche, -1 = vers la droite
  const [targetRotation, setTargetRotation] = useState(-1.6); // Rotation initiale de la grenouille

  useEffect(() => {
    const currentAction = actions['FrogArmature|Frog_Jump'];

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [actions]);

  useFrame(() => {
    if (frogRef.current) {
      const posX = frogRef.current.position.x;

      // Vérifie les limites du mouvement
      if (posX <= -6) {
        setDirection(1); // Change de direction vers la droite
        setTargetRotation(1.6); // Définir la rotation cible vers la droite
      } else if (posX >= -3) {
        setDirection(-1); // Change de direction vers la gauche
        setTargetRotation(-1.6); // Définir la rotation cible vers la gauche
      }

      // Interpolation fluide de la rotation
      frogRef.current.rotation.y = THREE.MathUtils.lerp(
        frogRef.current.rotation.y,
        targetRotation,
        0.1 // Modifier ce facteur pour une interpolation plus ou moins rapide
      );

      // Mise à jour la position de la grenouille
      frogRef.current.position.x += 0.01 * direction;
    }
  });

  return (
    <group
      ref={frogRef}
      {...props}
      dispose={null}
    >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="FrogArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.root} />
          </group>
          <group
            name="Frog"
            position={[-0.011, 0.049, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Frog_1"
              geometry={nodes.Frog_1.geometry}
              material={materials.Green}
              skeleton={nodes.Frog_1.skeleton}
            />
            <skinnedMesh
              name="Frog_2"
              geometry={nodes.Frog_2.geometry}
              material={materials.Yellow}
              skeleton={nodes.Frog_2.skeleton}
            />
            <skinnedMesh
              name="Frog_3"
              geometry={nodes.Frog_3.geometry}
              material={materials.Red}
              skeleton={nodes.Frog_3.skeleton}
            />
            <skinnedMesh
              name="Frog_4"
              geometry={nodes.Frog_4.geometry}
              material={materials.Black}
              skeleton={nodes.Frog_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(frogScene);

export default Frog;
