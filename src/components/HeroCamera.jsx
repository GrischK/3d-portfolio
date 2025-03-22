import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const HeroCamera = ({ isMobile, children }) => {
  const groupRef = useRef();

  let minPolarAngle = -Math.PI / 20; // Limite inférieure
  let maxPolarAngle = Math.PI / 30; // Limite supérieure

  useFrame((state, delta) => {
    let targetRotation;

    if (isMobile) {
      minPolarAngle = -Math.PI / 20;
      maxPolarAngle = Math.PI / 4;

      // Sur mobile : mouvement vertical basé sur le scroll
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollRange = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollRange > 0 ? scrollY / scrollRange : 0;

      // Calcul de la rotation verticale en fonction du scroll
      const verticalRotation = minPolarAngle + (maxPolarAngle - minPolarAngle) * scrollFraction;
      targetRotation = [verticalRotation, 0, 0]; // Mouvement uniquement sur l'axe Y (vertical)
    } else {
      // Sur pc : mouvement basé sur le pointeur
      targetRotation = [-state.pointer.y / 3, -state.pointer.x / 5, 0];
      // Limite de la rotation verticale
      targetRotation[0] = Math.min(Math.max(targetRotation[0], minPolarAngle), maxPolarAngle);
    }

    // Applique l'animation fluide avec easing
    easing.dampE(groupRef.current.rotation, targetRotation, 0.25, delta);
  });

  return <group ref={groupRef}>{children}</group>;
};

export default HeroCamera;
