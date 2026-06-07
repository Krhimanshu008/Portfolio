import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function GlassShard({ position, rotation, shattered }) {
  const mesh = useRef();
  const initialPos = useRef(new THREE.Vector3(...position));
  const targetPos = useRef(new THREE.Vector3(
    position[0] + (Math.random() - 0.5) * 10,
    position[1] + (Math.random() - 0.5) * 10,
    position[2] + (Math.random() * 5 + 2)
  ));
  
  const initialRot = useRef(new THREE.Euler(...rotation));
  const targetRot = useRef(new THREE.Euler(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  ));

  useFrame((state, delta) => {
    if (shattered) {
      mesh.current.position.lerp(targetPos.current, delta * 2);
      
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRot.current.x, delta);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRot.current.y, delta);
      mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, targetRot.current.z, delta);
      
      mesh.current.material.opacity = THREE.MathUtils.lerp(mesh.current.material.opacity, 0, delta);
    } else {
      mesh.current.position.lerp(initialPos.current, delta * 2);
      mesh.current.rotation.setFromVector3(initialRot.current);
      mesh.current.material.opacity = THREE.MathUtils.lerp(mesh.current.material.opacity, 1, delta * 2);
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshPhysicalMaterial 
        transmission={1} 
        roughness={0.1} 
        thickness={0.5} 
        ior={1.5} 
        transparent 
        opacity={1}
        color="#88ccff"
      />
    </mesh>
  );
}

function ShatterScreen({ shattered, onClick }) {
  // Create a grid of "shards" (using planes for simplicity, but simulating glass)
  const shards = [];
  for (let i = -2; i <= 2; i++) {
    for (let j = -1; j <= 1; j++) {
      shards.push(
        <GlassShard 
          key={`${i}-${j}`} 
          position={[i * 1.5, j * 1.5, 2]} 
          rotation={[0, 0, 0]} 
          shattered={shattered} 
        />
      );
    }
  }

  return (
    <group onClick={onClick}>
      {shards}
    </group>
  );
}

function PortfolioContent() {
  return (
    <group position={[0, 0, -2]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text fontSize={1} color="#ffffff" position={[0, 1, 0]}>
          Himanshu
        </Text>
        <Text fontSize={0.4} color="#aaaaaa" position={[0, 0, 0]}>
          Interactive 3D Portfolio
        </Text>
      </Float>
      
      {/* 3D representations of CV and Images can go here */}
      <mesh position={[-2, -1.5, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#3b82f6" />
        <Text fontSize={0.2} position={[0, 0, 0.06]} color="white">CV PDF</Text>
      </mesh>

      <mesh position={[2, -1.5, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#10b981" />
        <Text fontSize={0.2} position={[0, 0, 0.06]} color="white">Projects</Text>
      </mesh>
    </group>
  );
}

export default function Shatter() {
  const [shattered, setShattered] = useState(false);

  return (
    <div className="page-container">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          
          <PresentationControls 
            global 
            rotation={[0, 0, 0]} 
            polar={[-0.4, 0.2]} 
            azimuth={[-0.4, 0.2]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <PortfolioContent />
            <ShatterScreen shattered={shattered} onClick={() => setShattered(!shattered)} />
          </PresentationControls>
        </Canvas>
      </div>
      
      <div className="ui-overlay" style={{ pointerEvents: 'none' }}>
        {!shattered && (
          <div className="glass-panel" style={{ position: 'absolute', bottom: '10%' }}>
            <p>Click the glass to break the 4th wall</p>
          </div>
        )}
        {shattered && (
          <button 
            className="premium-btn" 
            style={{ position: 'absolute', bottom: '10%', pointerEvents: 'auto' }}
            onClick={() => setShattered(false)}
          >
            Restore Glass
          </button>
        )}
      </div>
    </div>
  );
}
