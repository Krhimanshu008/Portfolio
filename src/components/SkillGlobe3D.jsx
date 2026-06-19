import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { globeNodes, skillCategories, timelineData } from '../data/journeyData';

const GlobeNode = ({ node, isActive, isDimmed, onClick, occlude }) => {
  const meshRef = useRef();
  const color = skillCategories[node.categoryId].color;

  // Animate node if active
  useFrame((state) => {
    if (isActive && meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(node);
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent
          opacity={isDimmed ? 0.2 : (isActive ? 1 : 0.8)} 
        />
      </mesh>
      
      {/* Outer glow for active nodes */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      )}

      {/* HTML Label */}
      <Html 
        distanceFactor={4} 
        zIndexRange={[100, 0]} 
        className="node-html-label"
        occlude={occlude}
      >
        <div 
          className="node-label" 
          style={{
            opacity: isDimmed ? 0.3 : 1,
            color: isActive ? '#fff' : '#ccc',
            fontWeight: isActive ? 'bold' : 'normal',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.3s ease',

          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(node);
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
};

const ShootingStar = () => {
  const meshRef = useRef();
  const [trailColor, setTrailColor] = useState(skillCategories.tech.color);
  
  const animState = useRef({
    start: globeNodes[0],
    end: globeNodes[1],
    progress: 0,
    curve: null
  });

  if (!animState.current.curve) {
    const pos1 = new THREE.Vector3(...animState.current.start.position).normalize().multiplyScalar(1.5);
    const pos2 = new THREE.Vector3(...animState.current.end.position).normalize().multiplyScalar(1.5);
    const mid = pos1.clone().add(pos2).multiplyScalar(0.5).normalize().multiplyScalar(1.8);
    animState.current.curve = new THREE.QuadraticBezierCurve3(pos1, mid, pos2);
  }

  useFrame((state, delta) => {
    const cycle = Math.floor(state.clock.elapsedTime / 10);
    const colorKeys = Object.keys(skillCategories);
    const currentColorId = colorKeys[cycle % colorKeys.length];
    const newColor = skillCategories[currentColorId].color;
    
    if (trailColor !== newColor) {
      setTrailColor(newColor);
    }
    
    if (meshRef.current) {
      meshRef.current.material.color.lerp(new THREE.Color(trailColor), 0.02);

      const speed = 0.5;
      animState.current.progress += delta * speed;
      
      if (animState.current.progress >= 1) {
        animState.current.start = animState.current.end;
        let newEnd = globeNodes[Math.floor(Math.random() * globeNodes.length)];
        while (newEnd.id === animState.current.start.id) {
          newEnd = globeNodes[Math.floor(Math.random() * globeNodes.length)];
        }
        animState.current.end = newEnd;
        animState.current.progress = 0;
        
        const pos1 = new THREE.Vector3(...animState.current.start.position).normalize().multiplyScalar(1.5);
        const pos2 = new THREE.Vector3(...animState.current.end.position).normalize().multiplyScalar(1.5);
        const mid = pos1.clone().add(pos2).multiplyScalar(0.5).normalize().multiplyScalar(1.8);
        animState.current.curve = new THREE.QuadraticBezierCurve3(pos1, mid, pos2);
      }
      
      const point = animState.current.curve.getPoint(animState.current.progress);
      meshRef.current.position.copy(point);
    }
  });

  return (
    <Trail
      width={0.2}
      length={6}
      color={new THREE.Color(trailColor)}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color={trailColor} transparent opacity={0.8} />
      </mesh>
    </Trail>
  );
};

const RotatingGroup = ({ activeGlobeNode, activeTimelineId, interactionSource, onNodeClick }) => {
  const groupRef = useRef();
  const sphereRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Auto rotate slowly
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central faint wireframe sphere */}
      <Sphere ref={sphereRef} args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </Sphere>

      {/* Plot nodes */}
      {globeNodes.map((node) => {
        let isActive = false;
        let isDimmed = false;

        if (interactionSource === 'globe') {
          isActive = activeGlobeNode && activeGlobeNode.id === node.id;
          isDimmed = activeGlobeNode && activeGlobeNode.id !== node.id;
        } else if (interactionSource === 'timeline' && activeTimelineId) {
          const activeEntry = timelineData.find(item => item.id === activeTimelineId);
          if (activeEntry) {
            const nodeLabelLower = node.label.toLowerCase();
            isActive = activeEntry.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return tagLower.includes(nodeLabelLower) || 
                     nodeLabelLower.includes(tagLower) ||
                     (nodeLabelLower === "stat audit" && tagLower.includes("audit"));
            });
            isDimmed = !isActive;
          }
        }

        // Ensure nodes sit exactly on the radius of 1.5
        const pos = new THREE.Vector3(...node.position).normalize().multiplyScalar(1.5);

        return (
          <GlobeNode 
            key={node.id} 
            node={{ ...node, position: [pos.x, pos.y, pos.z] }} 
            isActive={isActive} 
            isDimmed={isDimmed}
            onClick={onNodeClick} 
            occlude={[sphereRef]}
          />
        );
      })}

      {/* Light Beam / Shooting Star */}
      <ShootingStar />
    </group>
  );
};

const SkillGlobe3D = ({ activeGlobeNode, activeTimelineId, interactionSource, onNodeClick }) => {
  return (
    <div className="globe-container">
      <Canvas style={{ overflow: 'visible' }} camera={{ position: [0, 0, 3.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false} /* Handled manually in RotatingGroup to avoid conflicts with drag */
          rotateSpeed={0.4}  /* Controls how fast the globe spins when you drag it with the mouse */
        />
        <RotatingGroup 
          activeGlobeNode={activeGlobeNode} 
          activeTimelineId={activeTimelineId} 
          interactionSource={interactionSource}
          onNodeClick={onNodeClick} 
        />
      </Canvas>
    </div>
  );
};

export default SkillGlobe3D;
