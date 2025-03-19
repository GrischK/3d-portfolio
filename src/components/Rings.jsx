import { Center, Float, useTexture } from '@react-three/drei';
import { useCallback, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Rings = ({ position,scale}) => {
  const refList = useRef([]);
  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  const texture = useTexture('textures/rings.png');
  const timeRef = useRef(0);

  // Initialisation de la rotation des anneaux à 0 au départ
  useEffect(() => {
    refList.current.forEach((ring) => {
      if (ring) {
        ring.rotation.set(0, 0, 0);
      }
    });
  }, []);

  useFrame((state, delta) => {
    if (refList.current.length === 0) return;

    const pos = Array.isArray(position) && position.length >= 3 ? position : [0, 0, 0];

    refList.current.forEach((ring) => {
      ring.position.set(pos[0], pos[1], pos[2]);
    });

    timeRef.current += delta;

    const animationDuration = 2.5; // Durée de l'animation pour un anneau
    const pauseDuration = 0.5; // Durée de la pause après que tous les anneaux ont terminé
    const maxStaggerDelay = (refList.current.length - 1) * 0.15; // Décalage max (dernier anneau)
    const totalAnimationDuration = animationDuration + maxStaggerDelay; // Temps total pour que tous les anneaux terminent
    const cycleDuration = totalAnimationDuration + pauseDuration; // Durée totale du cycle

    // Réinitialisation périodique une fois que tous les anneaux ont terminé et après la pause
    if (timeRef.current > cycleDuration) {
      timeRef.current = 0;
      refList.current.forEach((ring) => {
        ring.rotation.y = 0;
        ring.rotation.x = 0;
      });
    }

    refList.current.forEach((ring, index) => {
      const staggerDelay = index * 0.15; // Décalage de 0.15s par anneau
      const adjustedTime = Math.max(0, timeRef.current - staggerDelay);

      // Si on est dans la phase de pause (après totalAnimationDuration), on fixe la rotation à la position finale
      if (adjustedTime > animationDuration) {
        ring.rotation.y = Math.PI * 2; // On termine à une rotation complète
        ring.rotation.x = -Math.PI * 2; // On termine à une rotation complète
        return;
      }

      // Calcule de la progression de l'animation (0 à 1 sur animationDuration)
      const progress = Math.min(1, adjustedTime / animationDuration);

      // Rotation complète sur Y et X
      const targetRotationY = Math.PI * 2;
      const targetRotationX = -Math.PI * 2;

      // Interpolation pour une rotation fluide
      const rotationY = targetRotationY * progress;
      const rotationX = targetRotationX * progress;

      // On applique la rotation
      ring.rotation.y = rotationY;
      ring.rotation.x = rotationX;
    });
  });

  return (
    <Float floatIntensity={0.2}>
      <Center>
        <group scale={scale}>
          {Array.from({ length: 4 }, (_, index) => (
            <mesh key={index} ref={getRef}>
              <torusGeometry args={[(index + 1) * 0.5, 0.1]} />
              <meshMatcapMaterial matcap={texture} toneMapped={false} />
            </mesh>
          ))}
        </group>
      </Center>
    </Float>
  );
};

export default Rings;