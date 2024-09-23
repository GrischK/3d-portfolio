import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import chairMugLampScene from '../assets/3d/chair_mug_lamp.glb';

export function ChairMugLamp(props) {
  const chairMugLampRef = useRef();
  const { nodes, materials, animations } = useGLTF(chairMugLampScene);
  const { actions } = useAnimations(animations, chairMugLampRef);

  useEffect(() => {
    console.log(actions);
    const currentAction = actions['Take 001'];

    if (currentAction) {
      // Lancer l'animation
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      // Arrêter l'animation proprement lors du démontage du composant
      if (currentAction) currentAction.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group
      ref={chairMugLampRef}
      {...props}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[-7.251, -0.79, -15.568]}
          rotation={[-1.419, 0, -0.545]}
        >
          <group
            name="chairfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="null1"
                  rotation={[-Math.PI, -0.592, -Math.PI]}
                >
                  <group
                    name="curve1"
                    position={[-37.66, 0, -4.994]}
                    rotation={[-Math.PI, -0.87, -Math.PI]}
                  />
                </group>
                <group
                  name="pPlane3"
                  position={[-12.197, 127.242, -7.213]}
                  rotation={[0, 1.136, 0]}
                >
                  <mesh
                    name="pPlane3_lamp_material_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane3_lamp_material_0.geometry}
                    material={materials.lamp_material}
                  />
                  <pointLight
                    intensity={2}
                    distance={10}
                    decay={2}
                    color={'#fffacd'}
                  />
                </group>
                <group name="polySurface15">
                  <mesh
                    name="polySurface15_lamp_material_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface15_lamp_material_0.geometry}
                    material={materials.lamp_material}
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

useGLTF.preload(chairMugLampScene);
export default ChairMugLamp;
