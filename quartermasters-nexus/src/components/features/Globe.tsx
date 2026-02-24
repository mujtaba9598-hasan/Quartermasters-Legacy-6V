"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

extend({ Line_: THREE.Line });

/** Convert lat/lng to 3D position on sphere */
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const REGION_COLORS = {
  americas: "#60A5FA",
  europe: "#A78BFA",
  asia: "#34D399",
};

const connections = [
  { name: "London", lat: 51.5, lng: -0.12, region: "europe" as const },
  { name: "Singapore", lat: 1.35, lng: 103.8, region: "asia" as const },
  { name: "New York", lat: 40.71, lng: -74.0, region: "americas" as const },
  { name: "San Francisco", lat: 37.77, lng: -122.42, region: "americas" as const },
  { name: "Chicago", lat: 41.88, lng: -87.63, region: "americas" as const },
  { name: "Tokyo", lat: 35.6, lng: 139.6, region: "asia" as const },
  { name: "Zurich", lat: 47.3, lng: 8.5, region: "europe" as const },
];

const crossConnections = [
  { from: "London", to: "Zurich", color: REGION_COLORS.europe },
  { from: "San Francisco", to: "Chicago", color: REGION_COLORS.americas },
  { from: "Singapore", to: "Tokyo", color: REGION_COLORS.asia },
  { from: "New York", to: "London", color: REGION_COLORS.europe },
];

const mapNodes = [
  // Americas (Dense — US focus)
  ...[
    { lat: 34.05, lng: -118.24 }, { lat: 37.77, lng: -122.42 }, { lat: 41.88, lng: -87.63 },
    { lat: 29.76, lng: -95.37 }, { lat: 33.45, lng: -112.07 }, { lat: 47.6, lng: -122.33 },
    { lat: 25.76, lng: -80.19 }, { lat: 42.36, lng: -71.06 }, { lat: 39.74, lng: -104.99 },
    { lat: 43.65, lng: -79.38 }
  ].map(n => ({ ...n, region: "americas" as const })),

  // Europe (Hubs)
  ...[
    { lat: 51.5, lng: -0.1 }, { lat: 48.8, lng: 2.3 }, { lat: 52.5, lng: 13.4 },
    { lat: 40.4, lng: -3.7 }, { lat: 41.9, lng: 12.5 }, { lat: 52.3, lng: 4.9 },
    { lat: 47.3, lng: 8.5 }, { lat: 48.2, lng: 16.3 }, { lat: 59.3, lng: 18.0 },
    { lat: 53.3, lng: -6.2 }
  ].map(n => ({ ...n, region: "europe" as const })),

  // North America (Key Cities)
  ...[
    { lat: 40.7, lng: -74.0 }, { lat: 34.0, lng: -118.2 }, { lat: 41.8, lng: -87.6 },
    { lat: 29.7, lng: -95.3 }, { lat: 43.6, lng: -79.3 }, { lat: 37.7, lng: -122.4 },
    { lat: 25.7, lng: -80.1 }, { lat: 47.6, lng: -122.3 }, { lat: 38.9, lng: -77.0 }
  ].map(n => ({ ...n, region: "americas" as const })),

  // Asia-Pacific (Excl. China)
  ...[
    { lat: 1.35, lng: 103.8 }, { lat: 35.6, lng: 139.6 }, { lat: 37.5, lng: 126.9 },
    { lat: 19.0, lng: 72.8 }, { lat: 28.6, lng: 77.2 }, { lat: 13.7, lng: 100.5 },
    { lat: -6.2, lng: 106.8 }, { lat: -33.8, lng: 151.2 }, { lat: -37.8, lng: 144.9 }
  ].map(n => ({ ...n, region: "asia" as const })),
];

const headquarters = { lat: 34.05, lng: -118.24 }; // Los Angeles, California
const GLOBE_RADIUS = 2;

function GlobeAtmosphere() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((_state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={meshRef}>
      {/* Secondary subtle wireframe */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.01, 48, 48]} />
        <meshBasicMaterial color="#C15A2C" wireframe transparent opacity={0.04} />
      </mesh>
      {/* Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.02, 48, 48]} />
        <meshBasicMaterial color="#1B3A4B" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.15, 48, 48]} />
        <meshBasicMaterial color="#3B82C4" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial
        color="#1E5A7E"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function ConnectionBeams() {
  const beamsRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y += delta * 0.06;
    }
  });

  const curves = useMemo(() => {
    const hqPos = latLngToVector3(headquarters.lat, headquarters.lng, GLOBE_RADIUS);

    // HQ to Hubs
    const hqArcs = connections.map((c) => {
      const target = latLngToVector3(c.lat, c.lng, GLOBE_RADIUS);
      const mid = hqPos.clone().add(target).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.4);
      const curve = new THREE.QuadraticBezierCurve3(hqPos, mid, target);
      return { curve, color: REGION_COLORS[c.region] };
    });

    // Cross Hubs
    const crossArcs = crossConnections.map((cross) => {
      const p1 = connections.find(c => c.name === cross.from)!;
      const p2 = connections.find(c => c.name === cross.to)!;
      const v1 = latLngToVector3(p1.lat, p1.lng, GLOBE_RADIUS);
      const v2 = latLngToVector3(p2.lat, p2.lng, GLOBE_RADIUS);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.2); // Flatter arc
      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      return { curve, color: cross.color };
    });

    return [...hqArcs, ...crossArcs];
  }, []);

  return (
    <group ref={beamsRef}>
      {curves.map((c, i) => {
        const points = c.curve.getPoints(40).map((p) => [p.x, p.y, p.z] as [number, number, number]);
        return (
          <Line
            key={i}
            points={points}
            color={c.color}
            lineWidth={1.5}
            transparent
            opacity={0.7}
          />
        );
      })}
    </group>
  );
}

function CityMarkers() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  const markers = useMemo(() => {
    return connections.map(c => ({
      pos: latLngToVector3(c.lat, c.lng, GLOBE_RADIUS),
      color: REGION_COLORS[c.region],
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {markers.map((m, i) => (
        <group key={i} position={m.pos as unknown as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={m.color} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.09, 0.14, 32]} />
            <meshBasicMaterial color={m.color} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HQPin() {
  const pinRef = useRef<THREE.Group>(null);
  const hqPos = useMemo(
    () => latLngToVector3(headquarters.lat, headquarters.lng, GLOBE_RADIUS),
    []
  );

  useFrame((_state, delta) => {
    if (pinRef.current) {
      pinRef.current.parent!.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      <group ref={pinRef}>
        <mesh position={hqPos as unknown as [number, number, number]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#C15A2C" />
        </mesh>
        <mesh position={hqPos as unknown as [number, number, number]}>
          <ringGeometry args={[0.11, 0.16, 32]} />
          <meshBasicMaterial color="#C15A2C" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={hqPos as unknown as [number, number, number]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color="#C15A2C" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

function NodePoints() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;

      const time = state.clock.getElapsedTime();
      // oscillate between 1.0 and 1.3 over 2s
      const scale = 1.0 + (Math.sin(time * Math.PI) * 0.5 + 0.5) * 0.3;
      groupRef.current.children.forEach(child => {
        child.scale.setScalar(scale);
      });
    }
  });

  const nodes = useMemo(
    () => mapNodes.map((c) => ({
      pos: latLngToVector3(c.lat, c.lng, GLOBE_RADIUS),
      color: REGION_COLORS[c.region],
    })),
    []
  );

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos as unknown as [number, number, number]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={n.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <GlobeAtmosphere />
      <GlobeWireframe />
      <ConnectionBeams />
      <CityMarkers />
      <HQPin />
      <NodePoints />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </>
  );
}

interface GlobeProps {
  className?: string;
}

export function Globe({ className = "" }: GlobeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <GlobeScene />
      </Canvas>

      {/* HQ Data Card on hover */}
      {hovered && (
        <div
          className="glass pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-5 py-3 border"
          style={{ borderColor: "rgba(193,90,44,0.3)" }}
        >
          <p
            className="text-xs font-semibold whitespace-nowrap"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-accent-gold)",
            }}
          >
            Global HQ: California, USA
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--color-text-dim)" }}
          >
            7 Strategic Hubs | 4 Continents | 30+ Cities
          </p>
        </div>
      )}
    </div>
  );
}
