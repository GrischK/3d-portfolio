import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import backPackScene from '../assets/3d/backPack.glb';

export function BackPack(props) {
  const backPackRef = useRef();
  const { nodes, materials, animations } = useGLTF(backPackScene);
  const { actions } = useAnimations(animations, backPackRef);

  useEffect(() => {
    const currentAction = actions['Take 001'];

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group
      ref={backPackRef}
      {...props}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[1.577, 0, 0]}
        >
          <group
            name="c3f9b05879ee4dae849c190bdb9257e0fbx"
            rotation={[-Math.PI, 0, 0]}
            scale={0.001}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.material}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.light}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.light}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.light}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <group
                    name="Object_6"
                    position={[-496.99, 9.427, 727.028]}
                  />
                  <group
                    name="Object_8"
                    position={[666.386, -265.648, 366.733]}
                  />
                  <group
                    name="Object_10"
                    position={[666.386, -265.648, 366.733]}
                  />
                  <group
                    name="Object_12"
                    position={[666.386, -265.648, 366.733]}
                  />
                  <group name="toon_bag">
                    <mesh
                      name="toon_bag_bag_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.toon_bag_bag_0.geometry}
                      material={materials.material}
                    />
                  </group>
                  <group
                    name="toon_pan"
                    position={[-496.99, 9.427, 727.028]}
                  />
                  <group
                    name="light006"
                    position={[1004.338, -297.412, 366.733]}
                  />
                  <group name="ground">
                    <mesh
                      name="ground_ground_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.ground_ground_0.geometry}
                      material={materials.ground}
                    />
                  </group>
                  <group
                    name="light009"
                    position={[-831.695, -648.044, 564.987]}
                  />
                  <group
                    name="light010"
                    position={[401.704, 748.133, 948.894]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('../assets/3d/backPack.glb');
export default BackPack;
