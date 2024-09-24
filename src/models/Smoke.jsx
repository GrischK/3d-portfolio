import smokeScene from '../assets/3d/smoke.glb';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Smoke(props) {
  const smokeRef = useRef();
  const { nodes, materials, animations } = useGLTF(smokeScene);
  const { actions } = useAnimations(animations, smokeRef);

  useEffect(() => {
    const currentAction = actions['Default Take'];

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group
      ref={smokeRef}
      {...props}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group
            name="9359f27b8c624b9a98d96c8bd164755ffbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="gtmfc_smoke_1"
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <group
                    name="smoke_012"
                    position={[0.016, -0.024, 0.128]}
                    rotation={[1.823, 0.483, 2.159]}
                    scale={1.008}
                  >
                    <mesh
                      name="smoke_012_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_012_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_011"
                    position={[0.005, -0.003, 0.104]}
                    rotation={[1.299, -0.55, 0.683]}
                    scale={1.008}
                  >
                    <mesh
                      name="smoke_011_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_011_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_010"
                    position={[-0.064, -0.087, 0.465]}
                    rotation={[2.075, 1.169, -2.118]}
                    scale={0.71}
                  >
                    <mesh
                      name="smoke_010_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_010_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_009"
                    position={[0.017, -0.065, -0.575]}
                    rotation={[0.826, -0.505, 0.09]}
                    scale={0}
                  >
                    <mesh
                      name="smoke_009_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_009_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_008"
                    position={[0.001, 0.024, 0.065]}
                    rotation={[0.638, 0.262, 0.522]}
                    scale={[0.23, 0.208, 0.23]}
                  >
                    <mesh
                      name="smoke_008_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_008_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_007"
                    position={[-0.014, 0.081, 0.93]}
                    rotation={[1.222, 0.183, 0.421]}
                    scale={[0.755, 0.564, 0.753]}
                  >
                    <mesh
                      name="smoke_007_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_007_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_005"
                    position={[0.017, -0.059, 0.405]}
                    rotation={[1.056, -0.624, 0.035]}
                    scale={[0.321, 0.312, 0.318]}
                  >
                    <mesh
                      name="smoke_005_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_005_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                  <group
                    name="smoke_004"
                    position={[-0.064, -0.087, -0.57]}
                    rotation={[1.686, 0.98, -1.705]}
                    scale={0}
                  >
                    <mesh
                      name="smoke_004_fire_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.smoke_004_fire_0.geometry}
                      material={materials.fire}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(smokeScene);
export default Smoke;
