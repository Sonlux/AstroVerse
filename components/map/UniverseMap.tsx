import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

type PlanetProps = {
  name: string;
  position: [number, number, number];
  size: number;
  textureUrl: string;
  rotationSpeed?: number;
};

// Planet component with texture mapping
function Planet({ name, position, size, textureUrl, rotationSpeed = 0.005 }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Use try-catch with useTexture to handle missing textures
  let texture;
  try {
    texture = useTexture(textureUrl);
  } catch (error) {
    console.warn(`Texture not found for ${name}: ${textureUrl}`);
    // Use a default color instead
    texture = null;
  }
  
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={clicked ? size * 1.2 : size}
      >
        <sphereGeometry args={[1, 32, 32]} />
        {texture ? (
          <meshStandardMaterial 
            map={texture} 
            emissive={hovered ? new THREE.Color(0x444444) : new THREE.Color(0x000000)}
          />
        ) : (
          <meshStandardMaterial 
            color={new THREE.Color(Math.random() * 0xffffff)} 
            emissive={hovered ? new THREE.Color(0x444444) : new THREE.Color(0x000000)}
          />
        )}
      </mesh>
      
      {/* Label that always faces the camera */}
      {hovered && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          depthWrite={false} // Changed from depthTest to depthWrite
        >
          {name}
        </Text>
      )}
    </group>
  );
}

// Main scene component
function UniverseScene() {
  const { camera } = useThree();
  const [starCount, setStarCount] = useState(5000);
  
  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 10, 30);
    
    // Simple performance detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setStarCount(2000); // Fewer stars for mobile devices
    }
  }, [camera]);

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light simulating the sun */}
      <directionalLight position={[0, 0, 0]} intensity={1} />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={1} />
      
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      
      {/* Planets - positions are simplified for demonstration */}
      <Planet 
        name="Mercury" 
        position={[5, 0, 0]} 
        size={0.4} 
        textureUrl="/textures/mercury.jpg"
        rotationSpeed={0.01}
      />
      <Planet 
        name="Venus" 
        position={[8, 0, 0]} 
        size={0.9} 
        textureUrl="/textures/venus.jpg" 
        rotationSpeed={0.008}
      />
      <Planet 
        name="Earth" 
        position={[12, 0, 0]} 
        size={1} 
        textureUrl="/textures/earth.jpg" 
        rotationSpeed={0.01}
      />
      <Planet 
        name="Mars" 
        position={[16, 0, 0]} 
        size={0.5} 
        textureUrl="/textures/mars.jpg" 
        rotationSpeed={0.012}
      />
      <Planet 
        name="Jupiter" 
        position={[22, 0, 0]} 
        size={2} 
        textureUrl="/textures/jupiter.jpg" 
        rotationSpeed={0.004}
      />
      <Planet 
        name="Saturn" 
        position={[30, 0, 0]} 
        size={1.8} 
        textureUrl="/textures/saturn.jpg" 
        rotationSpeed={0.003}
      />
      <Planet 
        name="Uranus" 
        position={[36, 0, 0]} 
        size={1.2} 
        textureUrl="/textures/uranus.jpg" 
        rotationSpeed={0.002}
      />
      <Planet 
        name="Neptune" 
        position={[42, 0, 0]} 
        size={1.2} 
        textureUrl="/textures/neptune.jpg" 
        rotationSpeed={0.001}
      />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true} 
        zoomSpeed={0.6} 
        panSpeed={0.5} 
        rotateSpeed={0.5} 
      />
    </>
  );
}

// Main exported component with Canvas
export default function UniverseMap() {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 30, 100]} />
        <UniverseScene />
      </Canvas>
    </div>
  );
}