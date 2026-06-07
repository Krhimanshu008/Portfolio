import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshPortalMaterial, RoundedBox, Text, CameraControls, useCursor } from '@react-three/drei';
import * as THREE from 'three';

function PortalScene() {
  const [hovered, setHovered] = useState(false);
  const portalMaterial = useRef();
  useCursor(hovered, 'pointer', 'auto');

  useFrame((state, delta) => {
    // Open portal on hover by animating blend
    const targetBlend = hovered ? 1 : 0;
    portalMaterial.current.blend = THREE.MathUtils.lerp(portalMaterial.current.blend, targetBlend, delta * 5);
  });

  return (
    <group position={[0, 0, -1]}>
      <Text font="Inter" fontSize={0.6} position={[0, 1.5, 0.05]} anchorY="bottom">
        Explore
      </Text>
      
      <RoundedBox 
        args={[4, 5, 0.1]} 
        radius={0.2} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={0.5} />
          <Environment preset="sunset" />
          
          <color attach="background" args={['#202020']} />
          
          {/* Inner World Content */}
          <group position={[0, -1, -3]}>
            <Text fontSize={1.5} color="#3b82f6" position={[0, 2, 0]}>Himanshu's</Text>
            <Text fontSize={1} color="#f0f0f0" position={[0, 0.5, 0]}>Portfolio World</Text>
            
            {/* Some floating geometry inside */}
            <mesh position={[-2, -1, 1]} rotation={[0.5, 0.5, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#10b981" />
            </mesh>
            <mesh position={[2, -1, 0]} rotation={[0.5, -0.5, 0]}>
              <coneGeometry args={[0.8, 1.5, 16]} />
              <meshStandardMaterial color="#8b5cf6" />
            </mesh>
          </group>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
}

export default function Portal() {
  return (
    <div className="page-container">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          
          <PortalScene />
          
          <CameraControls makeDefault minDistance={3} maxDistance={15} />
        </Canvas>
      </div>

      <div className="ui-overlay" style={{ pointerEvents: 'none' }}>
        <div className="glass-panel" style={{ position: 'absolute', bottom: '10%' }}>
          <p>Hover over the portal card to peer inside. Drag to look around.</p>
        </div>
      </div>
    </div>
  );
}
