import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function FloatingObjects() {
  const groupRef = useRef();

  useFrame((state) => {
    // Make the group track the mouse position creating a parallax pop-out effect
    const x = (state.pointer.x * state.viewport.width) / 10;
    const y = (state.pointer.y * state.viewport.height) / 10;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.1);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.1);
    
    // Slight rotation based on mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.2, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, 2]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[2, -1, 3]}>
          <torusKnotGeometry args={[0.4, 0.1, 100, 16]} />
          <meshStandardMaterial color="#10b981" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={3}>
        <Text 
          fontSize={1.5} 
          color="#ffffff" 
          position={[0, 0, 1.5]}
          material-toneMapped={false}
        >
          Himanshu
        </Text>
      </Float>
    </group>
  );
}

export default function OutOfBounds() {
  return (
    <div className="page-container" style={{ background: '#e0e0e0' }}>
      {/* 2D Flat UI underneath */}
      <div style={{ position: 'absolute', zIndex: 1, textAlign: 'center', color: '#333' }}>
        <h1 style={{ color: '#333', textShadow: 'none', background: 'none', WebkitTextFillColor: 'initial' }}>
          Standard 2D Portfolio
        </h1>
        <p style={{ color: '#666' }}>
          Move your mouse around. The 3D elements will pop out of the screen, breaking the flat 2D layout and casting shadows over the interface.
        </p>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginTop: '40px',
          display: 'inline-block'
        }}>
          <h2>My Projects</h2>
          <p>Project 1 - Web Dev</p>
          <p>Project 2 - 3D Design</p>
        </div>
      </div>

      {/* 3D Canvas on top with pointerEvents 'none' so we can interact with UI if needed */}
      <div className="canvas-container" style={{ zIndex: 10, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          
          <FloatingObjects />

          {/* Shadows cast on the "screen" */}
          <ContactShadows 
            position={[0, -3, 0]} 
            opacity={0.5} 
            scale={20} 
            blur={2} 
            far={10} 
            resolution={512} 
            color="#000000" 
          />
        </Canvas>
      </div>
    </div>
  );
}
