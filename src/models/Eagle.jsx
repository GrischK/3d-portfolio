import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import eagleScene from '../assets/3d/eagle.glb';
import { useFrame } from '@react-three/fiber';

export function Eagle(props) {
  const eagleRef = useRef();
  const { nodes, materials, animations } = useGLTF(eagleScene);
  const { actions } = useAnimations(animations, eagleRef);
  console.log('action', actions);
  useEffect(() => {
    actions['Armature|ArmatureAction'].play();
  }, []);

  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    eagleRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (eagleRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      eagleRef.current.rotation.y = Math.PI;
    } else if (eagleRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      eagleRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (eagleRef.current.rotation.y === 0) {
      // Moving forward
      eagleRef.current.position.x += 0.01;
      eagleRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      eagleRef.current.position.x -= 0.01;
      eagleRef.current.position.z += 0.01;
    }
  });

  return (
    <group
      ref={eagleRef}
      {...props}
      dispose={null}
      position={[-5, 2, 1]}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 2]}
        >
          <group
            name="28cda374b0a148f08c02cc3b107c685dfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="RetopoFlow"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="Armature"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials['Material.001']}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group
                      name="Object_8"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
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

useGLTF.preload(eagleScene);
export default Eagle;
