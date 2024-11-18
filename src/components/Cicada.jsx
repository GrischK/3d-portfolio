import React, { useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import cicada from '../assets/3d/cicada.glb';

const Cicada = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(cicada);
  const { actions } = useAnimations(animations, group);
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.503}
        >
          <group
            name="78b7bfc15f9b487abaedaa116ee633befbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="CICADA_PAINT"
                  rotation={[0, -1.571, 0]}
                  scale={0.025}
                >
                  <group
                    name="Object_5"
                    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  >
                    <mesh
                      name="CICADA_PAINT_CICADA_PAINT_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CICADA_PAINT_CICADA_PAINT_0.geometry}
                      material={materials.CICADA_PAINT}
                    />
                  </group>
                  <group name="BODY">
                    <group
                      name="Object_8"
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                    >
                      <mesh
                        name="BODY_CICADA_DEFAULT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.BODY_CICADA_DEFAULT_0.geometry}
                        material={materials.CICADA_DEFAULT}
                      />
                    </group>
                    <group
                      name="LEFT_DOOR"
                      position={[34.563, 27.1, 31.487]}
                    >
                      <group
                        name="Object_11"
                        position={[-34.563, -27.1, -31.487]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="LEFT_DOOR_CICADA_PAINT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.LEFT_DOOR_CICADA_PAINT_0.geometry}
                          material={materials.CICADA_PAINT}
                        />
                      </group>
                      <group
                        name="left_door_glass"
                        position={[-8.969, 13.089, -19.182]}
                      >
                        <group
                          name="Object_14"
                          position={[-25.595, -40.189, -12.305]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="left_door_glass_CICADA_GLASS_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.left_door_glass_CICADA_GLASS_0.geometry}
                            material={materials.CICADA_GLASS}
                          />
                        </group>
                      </group>
                      <group name="DOOR_L_CHROME">
                        <group
                          name="Object_17"
                          position={[-34.563, -27.1, -31.487]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="DOOR_L_CHROME_CICADA_DEFAULT_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.DOOR_L_CHROME_CICADA_DEFAULT_0.geometry}
                            material={materials.CICADA_DEFAULT}
                          />
                        </group>
                      </group>
                      <group name="DOOR_L_MATTE">
                        <group
                          name="Object_20"
                          position={[-34.563, -27.1, -31.487]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="DOOR_L_MATTE_CICADA_DEFAULT_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.DOOR_L_MATTE_CICADA_DEFAULT_0.geometry}
                            material={materials.CICADA_DEFAULT}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="RIGHT_DOOR"
                      position={[-34.535, 27.1, 31.487]}
                    >
                      <group
                        name="Object_23"
                        position={[34.535, -27.1, -31.487]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="RIGHT_DOOR_CICADA_PAINT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.RIGHT_DOOR_CICADA_PAINT_0.geometry}
                          material={materials.CICADA_PAINT}
                        />
                      </group>
                      <group
                        name="right_door_glass"
                        position={[8.94, 13.089, -19.182]}
                      >
                        <group
                          name="Object_26"
                          position={[25.595, -40.189, -12.305]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="right_door_glass_CICADA_GLASS_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.right_door_glass_CICADA_GLASS_0.geometry}
                            material={materials.CICADA_GLASS}
                          />
                        </group>
                      </group>
                      <group name="DOOR_R_CHROME">
                        <group
                          name="Object_29"
                          position={[34.535, -27.1, -31.487]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="DOOR_R_CHROME_CICADA_DEFAULT_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.DOOR_R_CHROME_CICADA_DEFAULT_0.geometry}
                            material={materials.CICADA_DEFAULT}
                          />
                        </group>
                      </group>
                      <group name="DOOR_R_MATTE">
                        <group
                          name="Object_32"
                          position={[34.535, -27.1, -31.487]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="DOOR_R_MATTE_CICADA_DEFAULT_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.DOOR_R_MATTE_CICADA_DEFAULT_0.geometry}
                            material={materials.CICADA_DEFAULT}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="right_front_wheel"
                      position={[-28.418, 11.433, 50.45]}
                    >
                      <group
                        name="Object_35"
                        position={[28.418, -11.433, -50.45]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="right_front_wheel_CICADA_DEFAULT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.right_front_wheel_CICADA_DEFAULT_0.geometry}
                          material={materials.CICADA_DEFAULT}
                        />
                      </group>
                    </group>
                    <group
                      name="right_rear_wheel"
                      position={[-28.418, 11.433, -33.232]}
                    >
                      <group
                        name="Object_38"
                        position={[28.418, -11.433, 33.232]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="right_rear_wheel_CICADA_DEFAULT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.right_rear_wheel_CICADA_DEFAULT_0.geometry}
                          material={materials.CICADA_DEFAULT}
                        />
                      </group>
                    </group>
                    <group
                      name="left_rear_wheel"
                      position={[28.473, 11.433, -33.232]}
                    >
                      <group
                        name="Object_41"
                        position={[-28.473, -11.433, 33.232]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="left_rear_wheel_CICADA_DEFAULT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.left_rear_wheel_CICADA_DEFAULT_0.geometry}
                          material={materials.CICADA_DEFAULT}
                        />
                      </group>
                    </group>
                    <group
                      name="left_front_wheel"
                      position={[28.473, 11.433, 50.45]}
                    >
                      <group
                        name="Object_44"
                        position={[-28.473, -11.433, -50.45]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="left_front_wheel_CICADA_DEFAULT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.left_front_wheel_CICADA_DEFAULT_0.geometry}
                          material={materials.CICADA_DEFAULT}
                        />
                      </group>
                    </group>
                    <group name="glass">
                      <group
                        name="Object_47"
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="glass_CICADA_GLASS_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.glass_CICADA_GLASS_0.geometry}
                          material={materials.CICADA_GLASS}
                        />
                      </group>
                    </group>
                    <group name="inside">
                      <group
                        name="Object_50"
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="inside_CICADA_DEFAULT_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.inside_CICADA_DEFAULT_0.geometry}
                          material={materials.CICADA_DEFAULT}
                        />
                      </group>
                      <group
                        name="steering_wheel"
                        position={[15.557, 36.749, 24.661]}
                        rotation={[-2.531, 0, 0]}
                      >
                        <group
                          name="Object_53"
                          position={[-15.557, 44.248, -0.877]}
                          rotation={[0.96, 0, Math.PI / 2]}
                        >
                          <mesh
                            name="steering_wheel_CICADA_DEFAULT_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.steering_wheel_CICADA_DEFAULT_0.geometry}
                            material={materials.CICADA_DEFAULT}
                          />
                        </group>
                      </group>
                    </group>
                    <group name="front_lamp_glass">
                      <group
                        name="Object_56"
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="front_lamp_glass_CICADA_LAMPS_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.front_lamp_glass_CICADA_LAMPS_0.geometry}
                          material={materials.CICADA_LAMPS}
                        />
                      </group>
                    </group>
                    <group name="rear_lamp_glass">
                      <group
                        name="Object_59"
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="rear_lamp_glass_CICADA_LAMPS_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.rear_lamp_glass_CICADA_LAMPS_0.geometry}
                          material={materials.CICADA_LAMPS}
                        />
                      </group>
                    </group>
                    <group name="CICADA_CHROME">
                      <group
                        name="Object_62"
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      >
                        <mesh
                          name="CICADA_CHROME_CICADA_CHROME_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.CICADA_CHROME_CICADA_CHROME_0.geometry}
                          material={materials.CICADA_CHROME}
                        />
                      </group>
                    </group>
                  </group>
                </group>
                <group
                  name="cicada_shadow"
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={0.025}
                >
                  <group
                    name="Object_65"
                    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  >
                    <mesh
                      name="cicada_shadow_CICADA_SHADOW_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.cicada_shadow_CICADA_SHADOW_0.geometry}
                      material={materials.CICADA_SHADOW}
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
};

useGLTF.preload('../assets/3d/cicada.glb');

export default Cicada;
