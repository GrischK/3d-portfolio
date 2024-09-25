import React, { useState, useEffect } from 'react';
import grabHand from '../assets/icons/cursor-grab.svg';
import grabbingHand from '../assets/icons/cursor-grabbed.svg';

const GrabAnimation = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGrabbing((prev) => !prev);
    }, 2000); // Changer d'image toutes les 2 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle à la destruction du composant
  }, []);

  return (
    <div className="grab absolute h-20 w-40 transform translate-x-[-50%] left-1/2 flex items-center justify-center bottom-44 z-9">
      <img
        className={`handIcon h-10 w-10 transform translate-x-[-50%] left-1/2 top-0 ${isGrabbing ? 'handIcon--grabbing' : ''}`}
        src={isGrabbing ? grabbingHand : grabHand}
        alt={isGrabbing ? 'grabbing hand' : 'grab hand'}
      />
      <div
        className={`handIcon_circle transform translate-x-[-50%] left-1/2 top-0 ${isGrabbing ? 'handIcon_circle--displaying' : ''}`}
      />
      <span className="absolute top-10">Drap to explore</span>
    </div>
  );
};

export default GrabAnimation;
