import huskyScene from '../assets/3d/husky.glb';
import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useFrame } from '@react-three/fiber';

const Husky = ({ isAnimating, animation, ...props }) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(huskyScene);
  const clonedScene = clone(scene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.metalness = 0;
      material.roughness = 1;
    });
  }, [materials]);

  useEffect(() => {
    if (!actions) {
      console.error('Les actions ne sont pas définies.');
      return;
    }
    Object.values(actions).forEach((action) => action.stop());

    if (isAnimating) {
      const actionsArray = [
        actions['Walk'],
        actions['Gallop'],
        actions['Eating'],
        actions['Idle_2_HeadLow'],
        actions['Jump_ToIdle']
      ].filter((action) => action); // Filtrage les animations undefined

      if (actionsArray.length === 0) {
        console.error('Aucune animation valide trouvée dans le modèle.');
        return;
      }

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
          }, 1100);
        }
      };

      actionsArray[currentIndex].reset().fadeIn(0.5).play();
      const interval = setInterval(switchAction, 5000);

      return () => {
        clearInterval(interval);
        actionsArray.forEach((action) => action.stop());
      };
    }
    if (animation) {
      console.log("Husky animation reçue :", animation);
      const action = actions[animation];
      if (action) {
        action.reset().fadeIn(0.5).play();
        return () => {
          action.stop();
        };
      } else {
        console.error(`L'animation ${animation} n'est pas disponible.`);
      }
    }
  }, [actions, isAnimating, animation]);

  // useFrame(() => {
  //   if (animation === 'Walk' && actions['Walk']?.isRunning()) {
  //     group.current.position.z += 0.08; // Vitesse d'avancement (ajuste selon tes besoins)
  //     console.log("Position Z en temps réel :", group.current.position.z); // Log en temps réel
  //   }
  // });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload(huskyScene);

export default Husky;
