import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import frogScene from '../assets/3d/frog.glb';

export function Frog(props) {
  const frogRef = useRef();
  const { nodes, materials, animations } = useGLTF(frogScene);
  const { actions } = useAnimations(animations, frogRef);

  useEffect(() => {
    const currentAction = actions['FrogArmature|Frog_Jump'];

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [actions]);

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
