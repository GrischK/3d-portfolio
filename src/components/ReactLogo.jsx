import { Float, useGLTF } from '@react-three/drei';
import reactLogo from '../assets/3d/react.glb';

const ReactLogo = (props) => {
  const { nodes, materials } = useGLTF(reactLogo);

  return (
    <Float floatIntensity={1.5}>
      <group {...props} scale={0.6} >
        <mesh
          geometry={nodes['React-Logo_Material002_0'].geometry}
          material={materials['Material.002']}
          position={[0, 0.079, 0.181]}
          rotation={[0, -Math.PI / 0.46, -Math.PI / 2]}
          scale={[0.392, 0.392, 0.527]}
        />
      </group>
    </Float>

  );
};

useGLTF.preload(reactLogo);
export default ReactLogo;