import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import carScene from '../assets/3d/car.glb';

export function Car(props) {
  const { nodes, materials } = useGLTF(carScene)
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Spare_Tire.geometry}
          material={materials.Texture}
          position={[-0.787, 1.08, -0.041]}
          rotation={[-1.655, 0, Math.PI / 2]}
          scale={[13.887, 106.316, 13.887]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bag.geometry}
          material={materials.Texture}
          position={[0.436, 0.679, 0.402]}
          scale={[38.943, 5.087, 5.087]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tire3.geometry}
          material={materials.Texture}
          position={[-2.124, -0.351, -0.219]}
          rotation={[-1.571, -1.557, 1.571]}
          scale={[13.887, 13.887, 106.316]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tire1.geometry}
          material={materials.Texture}
          position={[2.109, -0.351, -0.219]}
          rotation={[0, 1.571, 0]}
          scale={[13.887, 13.887, 106.316]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tire4.geometry}
          material={materials.Texture}
          position={[-2.124, 0.608, -0.219]}
          rotation={[-1.571, -1.557, 1.571]}
          scale={[13.887, 13.887, 106.316]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tire2.geometry}
          material={materials.Texture}
          position={[2.109, 0.608, -0.219]}
          rotation={[0, 1.571, 0]}
          scale={[13.887, 13.887, 106.316]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car001.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.478, 3.659, 3.659]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Car002_1.geometry}
          material={materials.Texture}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Car002_2.geometry}
          material={materials.Glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car003.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car004.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car005.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car006.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car007.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car008.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car009.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car010.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car011.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car012.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car013.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car014.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.478, 3.659, 3.659]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Car015_1.geometry}
          material={materials.Texture}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Car015_2.geometry}
          material={materials.Glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car016.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car017.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car018.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car019.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car020.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car021.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car022.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car023.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car024.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car025.geometry}
        material={materials.Texture}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.478, 3.659, 3.659]}
      />
    </group>
  )
}

useGLTF.preload(carScene)
