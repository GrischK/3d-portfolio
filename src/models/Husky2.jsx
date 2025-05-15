import huskyScene from '../assets/3d/husky.glb';
import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useFrame } from '@react-three/fiber';

const Husky2 = ({ currentAnimation, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(huskyScene);
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

export default Husky2;
