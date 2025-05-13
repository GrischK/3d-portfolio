import huskyScene from '../assets/3d/husky.glb';
import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useFrame } from '@react-three/fiber';

const Husky2 = ({ currentAnimation, ...props }) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(huskyScene);
  const { actions } = useAnimations(animations, group);
  const previousAnimation = useRef();

  console.log(currentAnimation);
  console.log(previousAnimation);

  useEffect(() => {
    if (previousAnimation.current && previousAnimation.current !== currentAnimation) {
      const prevAction = actions[previousAnimation.current];
      if (prevAction) {
        prevAction.fadeOut(0.5);
      }
    }

    const currentAction = actions[currentAnimation];
    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    previousAnimation.current = currentAnimation;

    return () => {
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [currentAnimation, actions]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <primitive object={huskyScene} />
    </group>
  );
};

useGLTF.preload(huskyScene);

export default Husky2;
