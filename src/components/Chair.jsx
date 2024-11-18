import { useGLTF } from '@react-three/drei';

const Chair = (props) => {
  const { nodes, materials } = useGLTF('../../public/chair.gltf');
  return (
    <group
      {...props}
      dispose={null}
      position-y={-1.3}
    >
      <mesh
        geometry={nodes.Chair.geometry}
        material={materials.Chair}
      />
      <mesh
        geometry={nodes.Cushion.geometry}
        material={materials.Cushion}
        position={[0, 0.064, 0.045]}
      />
      <mesh
        geometry={nodes.Legs1.geometry}
        material={materials.Legs}
      />
      <mesh
        geometry={nodes.Legs2.geometry}
        material={materials.Legs}
        visible={false}
      />
    </group>
  );
};

useGLTF.preload('../assets/3d/chair.gltf');

export default Chair;
