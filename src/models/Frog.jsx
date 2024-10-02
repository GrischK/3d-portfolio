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
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const currentAction = actions['FrogArmature|Frog_Jump'];

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
      currentAction.setLoop(THREE.LoopRepeat, Infinity);
    }

    return () => {
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [actions]);

  useFrame(() => {
    const currentAction = actions['FrogArmature|Frog_Jump'];
    if (frogRef.current && currentAction) {
      const progress = currentAction.time / currentAction.getClip().duration; // Progression de l'animation (entre 0 et 1)

      // La grenouille saute entre 0.2 et 0.8 de l'animation
      if (progress > 0.2 && progress < 0.8) {
        setIsJumping(true);
      } else {
        setIsJumping(false);
      }

      const posX = frogRef.current.position.x;

      // Vérifie les limites du mouvement et change la direction
      if (posX <= -6.5) {
        setDirection(1); // Change de direction vers la droite
        setTargetRotation(1.6); // Tourner à droite
      } else if (posX >= -3) {
        setDirection(-1); // Change de direction vers la gauche
        setTargetRotation(-1.6); // Tourner à gauche
      }

      // Interpolation fluide de la rotation
      frogRef.current.rotation.y = THREE.MathUtils.lerp(
        frogRef.current.rotation.y,
        targetRotation,
        0.1 // Ajuste la vitesse de rotation
      );

      // La grenouille n'avance que lorsque l'animation de saut est active
      if (isJumping) {
        frogRef.current.position.x += 0.01 * direction;
      }
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
