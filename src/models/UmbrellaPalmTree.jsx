import umbrellaPalmTreeScene from '../assets/3d/umbrella_palm_tree.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function UmbrellaPalmTree(props) {
  const umbrellaPalmTreeRef = useRef();
  const { nodes, materials } = useGLTF(umbrellaPalmTreeScene);
  return (
    <group {...props} dispose={null} ref={umbrellaPalmTreeRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.UmbrellaPalmTree_mesh.geometry}
        material={materials.UmbrellaPalmTree_mat}
      />
    </group>
  );
}

useGLTF.preload(umbrellaPalmTreeScene);
export default UmbrellaPalmTree;
