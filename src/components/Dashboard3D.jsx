import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

// A custom shader material to darken the edges of the portrait so it blends into the black background
const VignetteImageMaterial = {
  uniforms: {
    tDiffuse: { value: null },
    mouse: { value: new THREE.Vector2(0.5, 0.5) },
    resolution: { value: new THREE.Vector2(1, 1) },
    darkness: { value: 1.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 mouse;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(tDiffuse, vUv);
      
      // Calculate distance from center for vignette
      float dist = distance(vUv, vec2(0.5, 0.5));
      
      // Subtle dynamic lighting based on mouse
      float lightDist = distance(vUv, mouse);
      float lightIntensity = smoothstep(0.8, 0.0, lightDist) * 0.5; // Mouse glow
      
      // Vignette effect (darken edges significantly to blend with black background)
      float vignette = smoothstep(0.6, 0.2, dist);
      
      // Combine effects
      vec3 finalColor = texColor.rgb * vignette + (texColor.rgb * lightIntensity);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

export function InteractivePortrait() {
  const texture = useTexture('/Himanshu.jpeg');
  const materialRef = useRef();
  const planeRef = useRef();
  const { viewport } = useThree();

  const planeWidth = viewport.width > 8 ? 6 : viewport.width * 0.7;
  const planeHeight = planeWidth * 1.33;

  useFrame((state) => {
    // Note: Parallax movement on the plane has been removed as requested.
    // The portrait will remain fixed, but the light will still interact.

    // Update shader uniforms for dynamic lighting
    if (materialRef.current) {
      const uvMouseX = (state.pointer.x + 1) / 2;
      const uvMouseY = (state.pointer.y + 1) / 2;

      materialRef.current.uniforms.mouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.mouse.value.x, uvMouseX, 0.1
      );
      materialRef.current.uniforms.mouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.mouse.value.y, uvMouseY, 0.1
      );
    }
  });

  return (
    <mesh ref={planeRef} position={[0, 0, -2]}>
      <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[VignetteImageMaterial]}
        uniforms-tDiffuse-value={texture}
        uniforms-mouse-value={new THREE.Vector2(0.5, 0.5)}
        transparent={true}
      />
    </mesh>
  );
}

export function FloatingAccents() {
  const { viewport } = useThree();

  const rightEdge = viewport.width / 2;
  const topEdge = viewport.height / 2;

  return (
    <group position={[rightEdge - 3, topEdge - 2, -1]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[1, -1, 1]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#00d2ff" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[-1, 1, 0]}>
          <torusGeometry args={[0.5, 0.05, 16, 100]} />
          <meshBasicMaterial color="#ff5757" />
        </mesh>
      </Float>
    </group>
  );
}

// A cute minimalist primitive robot
export function CuteRobot() {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  // Bouncing and waving animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Bounce
    groupRef.current.position.y = Math.sin(time * 3) * 0.2;
    // Look around
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;

    // Wave arms
    if (leftArmRef.current) leftArmRef.current.rotation.z = Math.sin(time * 5) * 0.3 - 0.5;
    if (rightArmRef.current) rightArmRef.current.rotation.z = -Math.sin(time * 5) * 0.3 + 0.5;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 0.4, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Visor/Eye */}
      <mesh position={[0, 0.2, 0.25]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.4, 0.1, 0]} ref={leftArmRef}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
          <meshStandardMaterial color="#ff5757" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.4, 0.1, 0]} ref={rightArmRef}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
          <meshStandardMaterial color="#ff5757" />
        </mesh>
      </group>

      {/* Antenna */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}
