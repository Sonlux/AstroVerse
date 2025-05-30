"use client";

import {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Satellite as SatelliteType } from "../../app/satellites/page"; // Import Satellite type from page.tsx
// import { propagate, get } from "satellite.js"; // Old import
import * as satellite from 'satellite.js'; // Corrected import

// Define the type for the SatelliteMap component props
export type SatelliteMapProps = {
  satellites: SatelliteType[];
  selectedSatellite: SatelliteType | null;
  onSelectSatellite: Dispatch<SetStateAction<SatelliteType | null>>;
};

// Extend SatelliteType to include TLE data for calculation
interface SatelliteData extends SatelliteType {
  line1: string;
  line2: string;
}

// Custom hook to simulate fetching TLE data and calculating positions
function useSatelliteData(satellites: SatelliteType[]) {
  const [processedSatellites, setProcessedSatellites] = useState<
    Array<
      SatelliteData & {
        position: THREE.Vector3 | null;
        orbit: THREE.Vector3[] | null;
      }
    >
  >([]);

  useEffect(() => {
    // Simulate fetching TLE data. In a real app, this would come from an API.
    const fetchTleData = async () => {
      const tleData: Record<string, { line1: string; line2: string }> = {
        "1": {
          // ISS
          line1:
            "1 25544U 98067A   23300.12345678  .00000000  00000-0  00000+0 0  9999",
          line2:
            "2 25544  51.6416 247.4627 0006703 300.0000  60.0000 15.49150000000000",
        },
        "2": {
          // Starlink-1234 (example TLE, not real)
          line1:
            "1 48208U 21027A   23300.12345678  .00000000  00000-0  00000+0 0  9999",
          line2:
            "2 48208  53.0000 100.0000 0002000 000.0000  000.0000 15.00000000000000",
        },
      };

      const dataWithTle = satellites.map((s) => ({
        ...s,
        line1: tleData[s.id]?.line1 || "",
        line2: tleData[s.id]?.line2 || "",
      }));
      setProcessedSatellites(
        dataWithTle.map((s) => ({ ...s, position: null, orbit: null }))
      );
    };

    fetchTleData();
  }, [satellites]);

  useFrame(() => {
    const now = new Date();
    setProcessedSatellites((prev) =>
      prev.map((s) => {
        if (!s.line1 || !s.line2) return s; // Skip if TLE data is missing

        try {
          // Use satellite.twoline2satrec and satellite.propagate
          const satrec = satellite.twoline2satrec(s.line1, s.line2);
          const positionAndVelocity = satellite.propagate(satrec, now);
          const positionEci = positionAndVelocity.position;

          if (positionEci) {
            // Convert ECI coordinates to ECF (Earth-Centered Fixed) for rendering
            const gmst = satellite.gstime(now);
            const positionGd = satellite.eciToGeodetic(positionEci, gmst);

            // Convert geodetic coordinates to Cartesian (x, y, z)
            const earthRadius = 6371; // km
            const altitude = positionGd.height / earthRadius; // Normalize altitude to Earth's radius (1 unit)

            const lat = positionGd.latitude;
            const lon = positionGd.longitude;

            const x = (1 + altitude) * Math.cos(lat) * Math.cos(lon);
            const y = (1 + altitude) * Math.cos(lat) * Math.sin(lon);
            const z = (1 + altitude) * Math.sin(lat);

            const newPosition = new THREE.Vector3(x, y, z);

            // Calculate orbit path (simplified for now)
            const orbitPoints: THREE.Vector3[] = [];
            for (let i = 0; i < 1440; i += 60) { // 24 hours, every 60 minutes
              const futureTime = new Date(now.getTime() + i * 60 * 1000);
              // Use satellite.propagate
              const futurePositionAndVelocity = satellite.propagate(satrec, futureTime);
              const futurePositionEci = futurePositionAndVelocity.position;

              if (futurePositionEci) {
                // Use satellite.gstime and satellite.eciToGeodetic
                const futureGmst = satellite.gstime(futureTime);
                const futurePositionGd = satellite.eciToGeodetic(
                  futurePositionEci,
                  futureGmst
                );

                const futureAltitude = futurePositionGd.height / earthRadius;
                const futureLat = futurePositionGd.latitude;
                const futureLon = futurePositionGd.longitude;

                const fx =
                  (1 + futureAltitude) *
                  Math.cos(futureLat) *
                  Math.cos(futureLon);
                const fy =
                  (1 + futureAltitude) *
                  Math.cos(futureLat) *
                  Math.sin(futureLon);
                const fz = (1 + futureAltitude) * Math.sin(futureLat);
                orbitPoints.push(new THREE.Vector3(fx, fy, fz));
              }
            }

            return { ...s, position: newPosition, orbit: orbitPoints };
          }
        } catch (error) {
          console.error(
            `Error calculating position for satellite ${s.name}:`,
            error
          );
        }
        return s; // Return original satellite if calculation fails
      })
    );
  });

  return processedSatellites;
}

// Satellite component
function Satellite({
  satellite,
  selected,
  onSelect,
}: {
  satellite: SatelliteData & {
    position: THREE.Vector3 | null;
    orbit: THREE.Vector3[] | null;
  };
  selected: boolean;
  onSelect: (satellite: SatelliteType) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Simple color based on type
  const color =
    satellite.type === "ISS"
      ? "red"
      : satellite.type === "Starlink"
      ? "blue"
      : "gray";

  if (!satellite.position) return null; // Don't render if position is not calculated yet

  return (
    <group>
      <mesh
        position={satellite.position}
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(satellite)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={
            selected || hovered
              ? new THREE.Color(color).multiplyScalar(2)
              : color
          }
        />
        {(hovered || selected) && (
          <Html position={[0.05, 0.05, 0]}>
            <div className="text-white text-xs bg-black bg-opacity-50 p-1 rounded whitespace-nowrap">
              {satellite.name}
            </div>
          </Html>
        )}
      </mesh>
      {satellite.orbit && satellite.orbit.length > 1 && (
        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              array={
                new Float32Array(satellite.orbit.flatMap((v) => v.toArray()))
              }
              count={satellite.orbit.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={color} linewidth={1} />
        </line>
      )}
    </group>
  );
}

// Earth component
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // Attempt to load textures. If loading fails, use a basic material.
  const textures = useMemo(() => {
    try {
      const textureLoader = new THREE.TextureLoader();
      const atmosphere = textureLoader.load("/textures/earth_atmos_4k.jpg");
      const specular = textureLoader.load("/textures/earth_specular_4k.jpg");
      const lights = textureLoader.load("/textures/earth_lights_4k.jpg");
      return { atmosphere, specular, lights };
    } catch (error) {
      console.warn("Could not load Earth textures. Using basic material.", error);
      return null;
    }
  }, []);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005; // Slower rotation for better visualization
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      {textures ? (
        <meshPhongMaterial
          map={textures.atmosphere}
          specularMap={textures.specular}
          emissiveMap={textures.lights}
          emissive={0xffffff} // Adjust emissive color as needed
          emissiveIntensity={0.05} // Adjust intensity for night lights
        />
      ) : (
        <meshStandardMaterial color="darkgreen" /> // Fallback basic material
      )}
    </mesh>
  );
}

// SatelliteScene component
function SatelliteScene({
  satellites,
  selectedSatellite,
  onSelectSatellite,
}: SatelliteMapProps) {
  const { camera } = useThree();
  const processedSatellites = useSatelliteData(satellites);

  useEffect(() => {
    camera.position.set(0, 0, 3); // Initial camera position
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Earth />
      {processedSatellites.map((satellite) => (
        <Satellite
          key={satellite.id}
          satellite={satellite}
          selected={selectedSatellite?.id === satellite.id}
          onSelect={onSelectSatellite}
        />
      ))}
      <OrbitControls enableZoom enablePan enableRotate />
    </>
  );
}

export default function SatelliteMap(props: SatelliteMapProps) {
  return (
    <Canvas>
      <SatelliteScene {...props} />
    </Canvas>
  );
}
