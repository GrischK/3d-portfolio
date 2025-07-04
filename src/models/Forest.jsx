import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import camping from '../assets/3d/camping.glb';
import { useFrame, useThree } from '@react-three/fiber';
import BackPack from './BackPack.jsx';
import ChairMugLamp from './ChairMugLamp.jsx';
import { Stag } from './Stag.jsx';
import Kayak from './Kayak.jsx';
import Frog from './Frog.jsx';
import WoodLog from './WoodLog.jsx';
import SaladBowl from './SaladBowl.jsx';
import SodaCan from './SodaCan.jsx';
import Smoke from './Smoke.jsx';
import Pug from './Pug.jsx';
import Raccoon from './Racoon.jsx';
import StaticFox, { AnimatedFox } from './AnimatedFox.jsx';
import Mailbox from './MailBox.jsx';
import LogAxe from './LogAxe.jsx';

export function Forest({
  isRotating,
  setIsRotating,
  setCurrentStage,
  setShowGrabAnimation,
  setSpeed,
  ...props
}) {
  const forest = useRef();
  const { nodes, materials, animations } = useGLTF(camping);
  const { actions } = useAnimations(animations, forest);
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  useEffect(() => {
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

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    setShowGrabAnimation(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      // Déterminer le delta de mouvement
      const delta = (clientX - lastX.current) / viewport.width;

      // Ne permettre que la rotation vers la droite (si delta est positif)

      // TODO: uncomment to lock rotation
      // if (delta < 0) {
      forest.current.rotation.y += delta * 0.01 * Math.PI;
      // }

      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
      setSpeed(delta * 0.01 * Math.PI);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      if (!isRotating) {
        setIsRotating(true);
      }
      forest.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === 'ArrowRight') {
      if (!isRotating) {
        setIsRotating(true);
      }
      forest.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      forest.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [
    gl,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleKeyDown,
    handleKeyUp,
    handlePointerDown,
    handleTouchEnd,
    handleTouchMove
  ]);

  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      forest.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = forest.current.rotation.y;

      const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 0.2 && normalizedRotation <= 0.6:
          setCurrentStage(5);
          break;
        case normalizedRotation >= 1.4 && normalizedRotation <= 1.8:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 2.6 && normalizedRotation <= 3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 3.9 && normalizedRotation <= 4.3:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 5.15 && normalizedRotation <= 5.55:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <group
      ref={forest}
      {...props}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group
            name="f57d262c2aa44061846a12a5a8f3c5ddfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="pDisc1"
                  position={[0, -0.064, 0]}
                  scale={14.985}
                >
                  <mesh
                    name="pDisc1_lambert3_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pDisc1_lambert3_0.geometry}
                    material={materials.lambert3}
                  />
                </group>
                <group
                  name="pCylinder29"
                  position={[0.031, 1.5, 0.102]}
                >
                  <mesh
                    name="pCylinder29_lambert5_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder29_lambert5_0.geometry}
                    material={materials.lambert5}
                  />
                </group>
                <group
                  name="pCube4"
                  position={[2.807, 0.289, 1.726]}
                >
                  <mesh
                    name="pCube4_lambert8_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pCube4_lambert8_0.geometry}
                    material={materials.lambert8}
                  />
                </group>
                <group
                  name="polySurface90"
                  position={[0, -0.045, 0]}
                >
                  <group name="polySurface91">
                    <mesh
                      name="polySurface91_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface91_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface92">
                    <mesh
                      name="polySurface92_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface92_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface93">
                    <mesh
                      name="polySurface93_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface93_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface94">
                    <mesh
                      name="polySurface94_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface94_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface95">
                    <mesh
                      name="polySurface95_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface95_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface96">
                    <mesh
                      name="polySurface96_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface96_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface97">
                    <mesh
                      name="polySurface97_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface97_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface98">
                    <mesh
                      name="polySurface98_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface98_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface99">
                    <mesh
                      name="polySurface99_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface99_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface100">
                    <mesh
                      name="polySurface100_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface100_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface101">
                    <mesh
                      name="polySurface101_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface101_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface102">
                    <mesh
                      name="polySurface102_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface102_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface103">
                    <mesh
                      name="polySurface103_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface103_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface104">
                    <mesh
                      name="polySurface104_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface104_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface105">
                    <mesh
                      name="polySurface105_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface105_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface106">
                    <mesh
                      name="polySurface106_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface106_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface107">
                    <mesh
                      name="polySurface107_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface107_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface108">
                    <mesh
                      name="polySurface108_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface108_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface109">
                    <mesh
                      name="polySurface109_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface109_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface110">
                    <mesh
                      name="polySurface110_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface110_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface111">
                    <mesh
                      name="polySurface111_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface111_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface112">
                    <mesh
                      name="polySurface112_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface112_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface113">
                    <mesh
                      name="polySurface113_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface113_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface114">
                    <mesh
                      name="polySurface114_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface114_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface115">
                    <mesh
                      name="polySurface115_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface115_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface116">
                    <mesh
                      name="polySurface116_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface116_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface117">
                    <mesh
                      name="polySurface117_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface117_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface118">
                    <mesh
                      name="polySurface118_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface118_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface119">
                    <mesh
                      name="polySurface119_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface119_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface120">
                    <mesh
                      name="polySurface120_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface120_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface121">
                    <mesh
                      name="polySurface121_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface121_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface122">
                    <mesh
                      name="polySurface122_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface122_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface123">
                    <mesh
                      name="polySurface123_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface123_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface124">
                    <mesh
                      name="polySurface124_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface124_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface125">
                    <mesh
                      name="polySurface125_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface125_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface126"
                    position={[0, 0.594, 0]}
                  >
                    <mesh
                      name="polySurface126_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface126_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface127">
                    <mesh
                      name="polySurface127_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface127_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface128">
                    <mesh
                      name="polySurface128_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface128_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface129">
                    <mesh
                      name="polySurface129_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface129_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface130">
                    <mesh
                      name="polySurface130_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface130_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface131">
                    <mesh
                      name="polySurface131_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface131_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface132">
                    <mesh
                      name="polySurface132_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface132_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface133">
                    <mesh
                      name="polySurface133_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface133_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface134">
                    <mesh
                      name="polySurface134_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface134_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface135">
                    <mesh
                      name="polySurface135_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface135_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface136">
                    <mesh
                      name="polySurface136_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface136_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface137">
                    <mesh
                      name="polySurface137_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface137_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface138">
                    <mesh
                      name="polySurface138_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface138_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface139">
                    <mesh
                      name="polySurface139_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface139_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface140">
                    <mesh
                      name="polySurface140_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface140_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface141">
                    <mesh
                      name="polySurface141_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface141_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface142">
                    <mesh
                      name="polySurface142_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface142_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface143">
                    <mesh
                      name="polySurface143_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface143_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface144">
                    <mesh
                      name="polySurface144_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface144_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface145">
                    <mesh
                      name="polySurface145_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface145_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface146">
                    <mesh
                      name="polySurface146_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface146_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface147">
                    <mesh
                      name="polySurface147_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface147_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface148">
                    <mesh
                      name="polySurface148_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface148_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface149">
                    <mesh
                      name="polySurface149_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface149_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface150">
                    <mesh
                      name="polySurface150_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface150_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface151">
                    <mesh
                      name="polySurface151_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface151_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface152">
                    <mesh
                      name="polySurface152_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface152_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface153">
                    <mesh
                      name="polySurface153_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface153_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface154">
                    <mesh
                      name="polySurface154_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface154_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface155">
                    <mesh
                      name="polySurface155_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface155_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface156">
                    <mesh
                      name="polySurface156_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface156_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface157">
                    <mesh
                      name="polySurface157_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface157_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface158">
                    <mesh
                      name="polySurface158_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface158_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface159">
                    <mesh
                      name="polySurface159_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface159_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface160">
                    <mesh
                      name="polySurface160_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface160_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface161">
                    <group name="fire3transform2" />
                  </group>
                  <group name="polySurface162">
                    <mesh
                      name="polySurface162_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface162_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface163">
                    <mesh
                      name="polySurface163_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface163_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface164">
                    <mesh
                      name="polySurface164_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface164_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface165">
                    <mesh
                      name="polySurface165_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface165_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group name="polySurface166">
                    <mesh
                      name="polySurface166_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface166_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface167"
                    position={[-6.112, 0.538, -2.191]}
                    rotation={[3.118, -0.852, 3.11]}
                    scale={[1.687, 1, 1]}
                  >
                    <mesh
                      name="polySurface167_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface167_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface168"
                    position={[8.37, 0, -3.676]}
                    rotation={[0, -1.499, 0]}
                  >
                    <group name="fire3transform1" />
                  </group>
                  <group
                    name="polySurface173"
                    position={[-9.431, 0.614, 0.838]}
                    rotation={[0, -1.499, 0]}
                    scale={0.212}
                  >
                    <mesh
                      name="polySurface173_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface173_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface174"
                    position={[3.302, 0.055, -8.306]}
                    rotation={[-2.952, 0.02, -3.124]}
                    scale={[0.298, 0.212, 0.212]}
                  >
                    <mesh
                      name="polySurface174_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface174_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface175"
                    position={[-2.051, 0.102, -6.782]}
                    rotation={[Math.PI, -0.932, 3.131]}
                    scale={0.212}
                  >
                    <mesh
                      name="polySurface175_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface175_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface176"
                    position={[0.57, 0.069, -5.022]}
                    rotation={[Math.PI, -0.932, 3.131]}
                    scale={0.212}
                  >
                    <mesh
                      name="polySurface176_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface176_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface177"
                    position={[3.239, 0.581, 9.165]}
                    rotation={[0, -1.499, 0.195]}
                    scale={0.212}
                  >
                    <mesh
                      name="polySurface177_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface177_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface178"
                    position={[9.039, 0.107, 0.838]}
                    rotation={[Math.PI, 1.268, -3.068]}
                    scale={[0.483, 0.259, 0.322]}
                  >
                    <mesh
                      name="polySurface178_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface178_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface179"
                    position={[-4.021, 0.435, -8.306]}
                    rotation={[-2.952, 0.02, -2.91]}
                    scale={[0.298, 0.212, 0.212]}
                  >
                    <mesh
                      name="polySurface179_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface179_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface180"
                    position={[-6.92, 0.187, 2.779]}
                    rotation={[-2.952, 0.02, -2.929]}
                    scale={[0.298, 0.212, 0.212]}
                  >
                    <mesh
                      name="polySurface180_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface180_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface181"
                    position={[-5.588, 0.599, 6.921]}
                    rotation={[-2.952, 0.02, -2.869]}
                    scale={[0.298, 0.212, 0.212]}
                  >
                    <mesh
                      name="polySurface181_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface181_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                  <group
                    name="polySurface182"
                    position={[-2.11, 0.052, 6.956]}
                    rotation={[0, -1.499, 0.043]}
                    scale={0.212}
                  >
                    <mesh
                      name="polySurface182_lambert6_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface182_lambert6_0.geometry}
                      material={materials.lambert6}
                    />
                  </group>
                </group>
                <group
                  name="pPlane1"
                  position={[-4.679, -0.019, -3.485]}
                  rotation={[-0.03, 0.519, -1.457]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane1_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane1_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane2"
                  position={[-4.365, 0.066, 1.165]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane2_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane2_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane3"
                  position={[-4.07, -0.006, -1.739]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane3_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane3_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane4"
                  position={[-4.796, 0.066, -0.119]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane4_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane4_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane5"
                  position={[-5.997, 0.066, -0.002]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane5_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane5_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane6"
                  position={[-4.939, 0.066, 2.252]}
                  rotation={[-0.03, 0.519, -1.457]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane6_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane6_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane7"
                  position={[-5.507, -0.023, -1.596]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane7_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane7_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane8"
                  position={[-5.806, 0.066, 0.156]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane8_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane8_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane9"
                  position={[-5.806, 0.066, 0.48]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane9_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane9_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane10"
                  position={[-3.246, -0.033, 6.035]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane10_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane10_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane11"
                  position={[-3.82, 0.211, 7.122]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane11_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane11_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane12"
                  position={[-4.378, -0.041, 4.751]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane12_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane12_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane13"
                  position={[-3.652, 0.037, 3.131]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane13_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane13_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane14"
                  position={[-5.089, -0.026, 3.274]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane14_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane14_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane15"
                  position={[-4.261, 0.037, 1.385]}
                  rotation={[-0.055, -0.218, -1.603]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane15_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane15_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane16"
                  position={[-4.686, 0.047, 5.026]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane16_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane16_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane17"
                  position={[-4.686, 0.099, 5.35]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane17_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane17_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane18"
                  position={[-4.878, 0.039, 4.868]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane18_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane18_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane19"
                  position={[-2.365, -0.043, 6.535]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane19_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane19_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane20"
                  position={[-2.173, -0.04, 7.018]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane20_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane20_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane21"
                  position={[-2.173, -0.035, 6.694]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane21_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane21_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane22"
                  position={[-1.865, -0.024, 6.418]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane22_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane22_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane23"
                  position={[-0.733, 0.011, 7.702]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane23_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane23_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane24"
                  position={[-2.621, -0.028, 8.511]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane24_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane24_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane25"
                  position={[-0.773, 0.221, 9.195]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane25_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane25_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane26"
                  position={[-2.213, -0.022, 8.187]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane26_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane26_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane27"
                  position={[-2.405, -0.03, 8.896]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane27_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane27_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane28"
                  position={[-1.905, -0.012, 7.911]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane28_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane28_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane29"
                  position={[0.171, 0.552, 10.482]}
                  rotation={[-0.026, 0.596, -1.609]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane29_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane29_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane30"
                  position={[1.343, 0.611, 10.273]}
                  rotation={[-0.026, 0.596, -1.609]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane30_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane30_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane31"
                  position={[0.211, 0.283, 8.989]}
                  rotation={[-0.026, 0.596, -1.609]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane31_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane31_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane32"
                  position={[-4.62, 0.44, 7.42]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane32_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane32_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane33"
                  position={[-5.507, 0.582, 6.631]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane33_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane33_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane34"
                  position={[-4.485, 0.425, 6.665]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane34_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane34_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane35"
                  position={[-4.62, 0.428, 8.948]}
                  rotation={[0.32, 0.482, -1.776]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane35_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane35_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane36"
                  position={[-4.485, 0.402, 8.193]}
                  rotation={[0.32, 0.482, -1.776]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane36_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane36_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane37"
                  position={[-5.507, 0.705, 8.159]}
                  rotation={[0.32, 0.482, -1.776]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane37_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane37_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane38"
                  position={[-6.016, 0.735, 8.948]}
                  rotation={[0.384, 0.469, -1.806]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane38_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane38_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane39"
                  position={[-5.881, 0.828, 8.193]}
                  rotation={[0.32, 0.482, -1.776]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane39_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane39_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane40"
                  position={[-5.881, 0.772, 7.327]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane40_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane40_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane41"
                  position={[-5.229, 0.628, 7.293]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane41_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane41_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane42"
                  position={[-8.441, 0.476, 4.522]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane42_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane42_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane43"
                  position={[-9.092, 0.642, 4.557]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane43_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane43_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane44"
                  position={[-8.718, 0.662, 5.389]}
                  rotation={[0.03, 0.517, -1.637]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane44_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane44_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane45"
                  position={[-9.092, 0.706, 5.423]}
                  rotation={[0.122, 0.509, -1.682]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane45_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane45_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane46"
                  position={[-7.925, 0.788, 6.101]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane46_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane46_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane47"
                  position={[-7.925, 0.975, 6.967]}
                  rotation={[0.122, 0.509, -1.682]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane47_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane47_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane48"
                  position={[-7.551, 0.931, 6.933]}
                  rotation={[-0.178, 0.519, -1.534]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane48_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane48_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane49"
                  position={[-7.273, 0.696, 6.067]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane49_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane49_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane50"
                  position={[-5.953, 0.07, 4.41]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane50_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane50_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane51"
                  position={[-6.145, -0.005, 3.927]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane51_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane51_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane52"
                  position={[-4.292, 0.052, 2.585]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane52_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane52_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane53"
                  position={[-6.356, -0.007, 2.333]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane53_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane53_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane54"
                  position={[-8.504, 0.461, 1.165]}
                  rotation={[-0.03, 0.519, -1.457]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane54_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane54_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane55"
                  position={[-8.431, 0.459, 2.585]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane55_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane55_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane56"
                  position={[-7.79, 0.252, 3.131]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane56_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane56_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane57"
                  position={[-9.228, 0.589, 3.274]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane57_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane57_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane58"
                  position={[-9.078, 0.574, 2.252]}
                  rotation={[-0.03, 0.519, -1.457]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane58_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane58_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane59"
                  position={[-9.944, 0.702, 0.48]}
                  rotation={[-0.03, 0.519, -1.457]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane59_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane59_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane60"
                  position={[-6.815, -0.002, 3.131]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane60_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane60_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane61"
                  position={[-6.717, 0.184, 4.522]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane61_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane61_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane62"
                  position={[-7.181, 0.161, 3.998]}
                  rotation={[-0.103, 0.52, -1.571]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane62_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane62_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane63"
                  position={[-1.629, 0.037, -5.712]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane63_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane63_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane64"
                  position={[-0.918, 0.037, -4.235]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane64_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane64_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane65"
                  position={[-2.493, 0.036, -4.576]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane65_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane65_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane66"
                  position={[-2.685, 0.058, -5.058]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane66_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane66_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane67"
                  position={[-1.418, 0.021, -4.118]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane67_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane67_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane68"
                  position={[-0.191, 0.037, -5.855]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane68_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane68_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane69"
                  position={[-0.832, 0.052, -6.401]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane69_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane69_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane70"
                  position={[-1.479, 0.066, -6.733]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane70_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane70_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane71"
                  position={[-0.8, 0.037, -7.601]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane71_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane71_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane72"
                  position={[-0.905, 0.066, -7.821]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane72_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane72_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane73"
                  position={[1.18, 0.037, -5.712]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane73_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane73_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane74"
                  position={[1.891, 0.037, -4.235]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane74_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane74_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane75"
                  position={[0.316, 0.042, -4.576]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane75_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane75_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane76"
                  position={[0.124, 0.058, -5.058]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane76_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane76_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane77"
                  position={[1.391, 0.05, -4.118]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane77_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane77_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane78"
                  position={[2.617, 0.037, -5.855]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane78_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane78_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane79"
                  position={[1.977, 0.052, -6.401]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane79_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane79_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane80"
                  position={[1.33, 0.066, -6.733]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane80_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane80_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane81"
                  position={[2.008, 0.037, -7.601]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane81_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane81_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane82"
                  position={[1.904, 0.066, -7.821]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane82_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane82_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane83"
                  position={[4.335, 0.054, -4.432]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane83_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane83_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane84"
                  position={[5.41, -0.025, -3.974]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane84_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane84_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane85"
                  position={[4.143, 0.07, -4.915]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane85_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane85_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane86"
                  position={[3.827, 0.094, -5.711]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane86_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane86_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane87"
                  position={[5.199, 0.225, -5.568]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane87_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane87_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane88"
                  position={[5.909, 0.044, -4.091]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane88_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane88_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane89"
                  position={[6.636, 0.356, -5.711]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane89_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane89_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane90"
                  position={[5.995, 0.371, -6.257]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane90_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane90_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane91"
                  position={[5.349, 0.385, -6.59]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane91_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane91_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane92"
                  position={[-0.219, 0.615, -10.853]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane92_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane92_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane93"
                  position={[0.096, 0.488, -10.057]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane93_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane93_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane94"
                  position={[0.316, 0.096, -9.575]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane94_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane94_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane95"
                  position={[-0.918, 0.091, -9.234]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane95_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane95_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane96"
                  position={[-0.832, 0.7, -11.399]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane96_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane96_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane97"
                  position={[-1.479, 0.12, -11.732]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane97_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane97_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane98"
                  position={[1.18, 0.45, -10.711]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane98_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane98_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane99"
                  position={[1.33, 0.439, -11.732]}
                  rotation={[-0.613, -0.929, -2.052]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane99_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane99_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane100"
                  position={[1.391, 0.104, -9.117]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane100_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane100_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane101"
                  position={[1.891, 0.091, -9.234]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane101_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane101_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane102"
                  position={[1.977, 0.335, -11.399]}
                  rotation={[-0.789, -0.858, -2.195]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane102_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane102_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane103"
                  position={[-4.479, 0.498, -7.886]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane103_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane103_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane104"
                  position={[-3.08, 0.309, -8.305]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane104_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane104_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane105"
                  position={[-4.164, 0.371, -7.09]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane105_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane105_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane106"
                  position={[-2.283, 0.329, -8.994]}
                  rotation={[-0.789, -0.858, -2.195]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane106_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane106_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane107"
                  position={[-2.93, 0.397, -9.327]}
                  rotation={[-0.613, -0.929, -2.052]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane107_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane107_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane108"
                  position={[-5.092, 0.608, -8.432]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane108_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane108_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane109"
                  position={[-2.369, 0.085, -6.828]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane109_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane109_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane110"
                  position={[-2.869, 0.097, -6.711]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane110_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane110_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane111"
                  position={[-2.356, 0.06, -5.416]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane111_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane111_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane112"
                  position={[-2.251, 0.031, -5.196]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane112_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane112_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane113"
                  position={[-4.432, -0.017, -3.019]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane113_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane113_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane114"
                  position={[-5.143, 0.066, -4.496]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane114_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane114_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane115"
                  position={[-3.705, -0.021, -4.639]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane115_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane115_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane116"
                  position={[-5.441, 0.066, -2.743]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane116_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane116_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane117"
                  position={[-5.633, 0.066, -2.902]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane117_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane117_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane118"
                  position={[-5.441, -0.027, -2.42]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane118_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane118_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane119"
                  position={[-4.001, -0.006, -1.735]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane119_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane119_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane120"
                  position={[-3.896, -0.006, -1.515]}
                  rotation={[-0.06, -0.369, -1.604]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane120_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane120_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane121"
                  position={[-8.43, 0.46, -3.019]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane121_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane121_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane122"
                  position={[-9.141, 0.102, -4.496]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane122_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane122_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane123"
                  position={[-7.704, 0.037, -4.639]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane123_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane123_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane124"
                  position={[-9.439, 0.46, -2.743]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane124_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane124_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane125"
                  position={[-9.631, 0.46, -2.902]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane125_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane125_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane126"
                  position={[-9.439, 0.46, -2.42]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane126_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane126_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane127"
                  position={[-7.999, 0.232, -1.735]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane127_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane127_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane128"
                  position={[-7.894, 0.203, -1.515]}
                  rotation={[-0.06, -0.369, -1.604]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane128_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane128_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane129"
                  position={[-7.397, 0.499, -6.81]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane129_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane129_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane130"
                  position={[-6.784, 0.434, -6.264]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane130_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane130_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane131"
                  position={[-6.469, 0.262, -5.468]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane131_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane131_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane132"
                  position={[1.578, 0.283, 7.899]}
                  rotation={[-0.026, 0.596, -1.609]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane132_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane132_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane133"
                  position={[0.594, 0.221, 8.105]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane133_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane133_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane134"
                  position={[-1.038, -0.012, 7.806]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane134_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane134_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane135"
                  position={[-1.301, 0.035, 8.945]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane135_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane135_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane136"
                  position={[-0.893, 0.04, 8.621]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane136_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane136_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane137"
                  position={[-0.538, -0.009, 6.821]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane137_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane137_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane138"
                  position={[0.634, 0.072, 6.612]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane138_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane138_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane139"
                  position={[1.933, 0.523, 10.267]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane139_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane139_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane140"
                  position={[0.606, 0.373, 9.864]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane140_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane140_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane141"
                  position={[0.8, 0.271, 8.983]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane141_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane141_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane142"
                  position={[-5.269, -0.029, 1.165]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane142_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane142_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane143"
                  position={[-5.196, -0.044, 2.585]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane143_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane143_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane144"
                  position={[-7.048, -0.101, 3.927]}
                  rotation={[-0.03, 0.519, -1.607]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane144_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane144_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane145"
                  position={[-2.39, -0.024, 5.014]}
                  rotation={[0.072, 1.313, -1.694]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane145_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane145_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane146"
                  position={[-3.116, -0.041, 5.651]}
                  rotation={[0.072, 1.313, -1.694]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane146_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane146_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane147"
                  position={[-3.347, -0.024, 5.014]}
                  rotation={[-0.018, 0.763, -1.614]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane147_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane147_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane148"
                  position={[-3.017, -0.024, 4.013]}
                  rotation={[-0.018, 0.763, -1.614]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane148_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane148_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane149"
                  position={[-3.017, -0.024, 4.487]}
                  rotation={[-0.018, 0.763, -1.614]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane149_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane149_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane150"
                  position={[-3.946, -0.024, 4.151]}
                  rotation={[-0.031, 0.49, -1.606]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane150_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane150_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane151"
                  position={[-5.081, -0.016, -1.176]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane151_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane151_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane152"
                  position={[-3.64, -0.016, -0.168]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane152_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane152_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane153"
                  position={[-4.214, -0.016, 0.92]}
                  rotation={[-0.03, 0.519, -1.457]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane153_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane153_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane154"
                  position={[-4.072, -0.016, -1.452]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane154_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane154_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane155"
                  position={[-4.221, -0.016, -0.168]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane155_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane155_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane156"
                  position={[-4.221, -0.016, -0.889]}
                  rotation={[0.048, -0.215, -1.47]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane156_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane156_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane157"
                  position={[-3.809, -0.011, -3.591]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane157_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane157_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane158"
                  position={[-2.734, -0.026, -3.133]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane158_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane158_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane159"
                  position={[-2.234, -0.01, -3.25]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane159_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane159_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane160"
                  position={[-3.568, -0.06, -4.211]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane160_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane160_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane161"
                  position={[-4.001, -0.018, -4.073]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane161_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane161_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane162"
                  position={[-5.317, 0.066, -0.75]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane162_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane162_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane163"
                  position={[-3.705, -0.021, -3.663]}
                  rotation={[0.064, -0.365, -1.465]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane163_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane163_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane164"
                  position={[-2.234, -0.01, -2.274]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane164_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane164_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane165"
                  position={[-2.734, -0.026, -2.157]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane165_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane165_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane166"
                  position={[-3.809, -0.011, -2.615]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane166_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane166_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane167"
                  position={[-4.001, -0.018, -3.097]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane167_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane167_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane168"
                  position={[7.255, 0.046, -2.868]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane168_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane168_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane169"
                  position={[7.36, 0.025, -2.649]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane169_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane169_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane170"
                  position={[7.328, 0.02, -1.448]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane170_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane170_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane171"
                  position={[5.877, -0.054, -4.041]}
                  rotation={[-0.789, -0.858, -2.195]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane171_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane171_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane172"
                  position={[6.681, 0.265, -6.779]}
                  rotation={[0.181, -1.001, -1.388]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane172_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane172_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane173"
                  position={[7.328, 0.495, -6.447]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane173_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane173_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane174"
                  position={[7.242, 0.236, -4.281]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane174_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane174_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane175"
                  position={[7.94, 0.463, -5.901]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane175_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane175_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane176"
                  position={[8.476, 0.241, -4.622]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane176_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane176_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane177"
                  position={[8.256, 0.336, -5.105]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane177_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane177_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane178"
                  position={[10.136, 0.321, -3.072]}
                  rotation={[-0.789, -0.858, -2.195]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane178_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane178_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane179"
                  position={[10.051, 0.236, -4.281]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane179_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane179_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane180"
                  position={[9.551, 0.248, -4.164]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane180_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane180_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane181"
                  position={[9.49, 0.295, -3.404]}
                  rotation={[-0.613, -0.929, -2.052]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane181_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane181_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane182"
                  position={[9.34, 0.595, -5.758]}
                  rotation={[-0.098, -1.01, -1.63]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane182_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane182_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pCube5"
                  position={[4.066, 0.304, 0]}
                  rotation={[Math.PI, -0.362, -2.204]}
                  scale={[0.2, 0.982, 0.622]}
                >
                  <group name="transform11" />
                </group>
                <group
                  name="pPlatonic1"
                  position={[6.652, 0.163, -5.839]}
                  rotation={[-0.077, 0, 0]}
                  scale={[1, 1, 1.613]}
                >
                  <group name="transform8" />
                </group>
                <group
                  name="pPlatonic2"
                  position={[0.455, -0.035, 6.276]}
                  rotation={[-0.077, 0, 0]}
                  scale={[1, 0.558, 0.903]}
                >
                  <group name="transform7" />
                </group>
                <group
                  name="pPlatonic3"
                  position={[-8.045, 0.475, -0.655]}
                  rotation={[-0.077, 0, 0]}
                  scale={[0.711, 0.641, 1.09]}
                >
                  <group name="transform1" />
                </group>
                <group
                  name="pPlatonic4"
                  position={[8.864, -0.035, 2.788]}
                  rotation={[-0.077, 1.311, 0.386]}
                  scale={[0.261, 0.146, 0.235]}
                >
                  <group name="transform9" />
                </group>
                <group
                  name="pPlatonic5"
                  position={[4.695, -0.072, 4.521]}
                  rotation={[-0.077, 1.311, -1.135]}
                  scale={[0.261, 0.146, 0.235]}
                >
                  <group name="transform5" />
                </group>
                <group
                  name="pPlatonic6"
                  position={[1.838, -0.072, -1.93]}
                  rotation={[-0.077, 1.311, -1.135]}
                  scale={[0.261, 0.146, 0.235]}
                >
                  <group name="transform4" />
                </group>
                <group
                  name="pPlatonic7"
                  position={[-6.512, -0.072, 3.127]}
                  rotation={[-0.077, 1.311, 0.379]}
                  scale={[0.261, 0.146, 0.235]}
                >
                  <mesh
                    name="pPlatonic7_lambert7_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlatonic7_lambert7_0.geometry}
                    material={materials.lambert7}
                  />
                </group>
                <group
                  name="pPlatonic8"
                  position={[-0.265, -0.064, -6.451]}
                  rotation={[0.32, 0, 0]}
                  scale={[0.184, 0.118, 0.297]}
                >
                  <group name="transform3" />
                </group>
                <group
                  name="pPlatonic9"
                  position={[-3.702, -0.064, 0.678]}
                  rotation={[0.32, 0, 0]}
                  scale={[0.184, 0.118, 0.297]}
                >
                  <group name="transform2" />
                </group>
                <group
                  name="pPlatonic10"
                  position={[4.695, 0.26, 8.399]}
                  rotation={[-0.077, 1.311, -0.226]}
                  scale={[0.261, 0.146, 0.235]}
                >
                  <group name="transform6" />
                </group>
                <group name="pPlatonic11">
                  <group name="transform10" />
                </group>
                <group
                  name="pCube6"
                  position={[-0.245, 0.313, 0.566]}
                >
                  <mesh
                    name="pCube6_lambert7_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pCube6_lambert7_0.geometry}
                    material={materials.lambert7}
                  />
                </group>
                <group
                  name="pPlane184"
                  position={[1.61, -0.155, 1.723]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane184_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane184_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane185"
                  position={[-1.985, 0.082, 3.846]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane185_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane185_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane186"
                  position={[0.394, 3.924, 1.45]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane186_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane186_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane187"
                  position={[-2.961, -0.993, 2.443]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane187_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane187_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane188"
                  position={[1.911, 8.051, -2.183]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane188_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane188_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane189"
                  position={[0.283, 7.103, 0.959]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane189_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane189_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane190"
                  position={[-1.001, 0.21, 2.13]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane190_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane190_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane191"
                  position={[-2.848, 4.306, 1.896]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane191_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane191_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane192"
                  position={[2.035, 6.448, -1.815]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane192_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane192_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane193"
                  position={[-1.571, 2.198, 1.267]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane193_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane193_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane194"
                  position={[2.823, 4.467, 0.146]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane194_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane194_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane195"
                  position={[0.046, 0.524, 2.345]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane195_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane195_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group
                  name="pPlane196"
                  position={[2.069, -0.623, 0.721]}
                  rotation={[-0.659, -0.451, -1.899]}
                  scale={[0.156, 0.202, 0.101]}
                >
                  <mesh
                    name="pPlane196_lambert6_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pPlane196_lambert6_0.geometry}
                    material={materials.lambert6}
                  />
                </group>
                <group name="fire3polySurface161">
                  <group name="fire3polySurface162">
                    <mesh
                      name="fire3polySurface162_fire3lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.fire3polySurface162_fire3lambert2_0.geometry}
                      material={materials.fire3lambert2}
                    />
                  </group>
                  <group
                    name="fire3polySurface163"
                    position={[4.488, 0.119, 0.215]}
                    rotation={[0.307, 0.55, 2.265]}
                  >
                    <mesh
                      name="fire3polySurface163_fire3lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.fire3polySurface163_fire3lambert2_0.geometry}
                      material={materials.fire3lambert2}
                    />
                  </group>
                  <group name="fire3transform3" />
                  <group
                    name="polySurface163_1"
                    position={[3.314, -0.024, 0.894]}
                    rotation={[0.307, 0.55, 2.265]}
                    scale={0.23}
                  >
                    <mesh
                      name="polySurface163_fire3lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface163_fire3lambert2_0.geometry}
                      material={materials.fire3lambert2}
                    />
                  </group>
                  <group
                    name="polySurface183"
                    position={[3.115, 0.007, 0.773]}
                    rotation={[0.4, -0.03, 2.564]}
                    scale={0.23}
                  >
                    <mesh
                      name="polySurface183_fire3lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface183_fire3lambert2_0.geometry}
                      material={materials.fire3lambert2}
                    />
                  </group>
                  <group
                    name="polySurface184"
                    position={[3.524, 0.007, 0.711]}
                    rotation={[0.175, 0.95, 2.86]}
                    scale={0.23}
                  >
                    <mesh
                      name="polySurface184_fire3lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface184_fire3lambert2_0.geometry}
                      material={materials.fire3lambert2}
                    />
                  </group>
                  <group
                    name="polySurface185"
                    position={[3.524, 0.135, 0.711]}
                    rotation={[1.709, 1.088, 1.37]}
                    scale={0.23}
                  >
                    <mesh
                      name="polySurface185_fire3lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface185_fire3lambert2_0.geometry}
                      material={materials.fire3lambert2}
                    />
                  </group>
                </group>
                <group
                  name="fire6Group20972"
                  position={[2.825, 0.408, 1.729]}
                  scale={0.286}
                >
                  <mesh
                    name="0"
                    castShadow
                    receiveShadow
                    geometry={nodes['0'].geometry}
                    material={materials.lambert9}
                    morphTargetDictionary={nodes['0'].morphTargetDictionary}
                    morphTargetInfluences={nodes['0'].morphTargetInfluences}
                  />
                </group>
              </group>
            </group>
            <BackPack
              position={[12.5, -2, -8]}
              rotation={[0, 2, 0]}
              scale={1.4}
            />
            <LogAxe
              position={[11.5, -1.5, -9.5]}
              rotation={[0, 0, 0]}
              scale={8}
            />
            <ChairMugLamp
              position={[-3, -1.5, -15]}
              rotation={[0, -2.2, 0]}
              scale={0.01}
            />
            <WoodLog
              position={[-5.7, -1.5, -14.2]}
              rotation={[0, -2.7, 0]}
              scale={1}
            />
            <SaladBowl
              position={[-4.7, -0.4, -14.7]}
              rotation={[0, -2, 0]}
              scale={0.5}
            />
            <SodaCan
              position={[-5.3, -0.6, -14.4]}
              rotation={[0, -2, 0]}
              scale={0.03}
            />
            <Stag
              position={[-14.8, -2, 0.5]}
              rotation={[0, -3.2, 0]}
            />
            <Mailbox
              position={[-14.5, -2, 4]}
              rotation={[0, -1.5, 0]}
              scale={2.8}
            />
            <Kayak
              scale={1.8}
              position={[-4.2, 0, 11.2]}
              rotation={[6.6, 20.1, 0]}
            />
            <Frog
              scale={0.17}
              position={[-3, -1.6, 14.2]}
              rotation={[0, -1.6, 0]}
            />
            <Smoke
              scale={5}
              position={[3, 3, 1]}
            />
            <Pug
              scale={1.6}
              position={[9, 0, 5]}
              rotation={[0, 1.1, 0]}
            />
            <Raccoon
              scale={0.4}
              position={[3, 0, -8]}
              rotation={[0, 2.8, 0]}
            />
            <AnimatedFox
              scale={0.5}
              position={[-2, 0, -7]}
              rotation={[0.2, 3.6, 0.1]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(camping);
export default Forest;
