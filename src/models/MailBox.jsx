import mailBoxScene from '../assets/3d/mailbox.glb';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Mailbox(props) {
  const mailBoxref = useRef();
  const { nodes, materials } = useGLTF(mailBoxScene);
  return (
    <group
      {...props}
      dispose={null}
      ref={mailBoxref}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mailbox.geometry}
        material={materials.Material}
        scale={100}
        material-roughness={1.5} // Augmenter la rugosité pour réduire la brillance
        material-metalness={0.45}
      />
    </group>
  );
}

useGLTF.preload(mailBoxScene);
export default Mailbox;
