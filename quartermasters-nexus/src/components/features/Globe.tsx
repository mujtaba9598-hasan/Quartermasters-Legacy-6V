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

const connections = [
  { name: "London", lat: 51.5, lng: -0.12 },
  { name: "Singapore", lat: 1.35, lng: 103.8 },
  { name: "New York", lat: 40.71, lng: -74.0 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Riyadh", lat: 24.7, lng: 46.7 },
  { name: "Tokyo", lat: 35.6, lng: 139.6 },
  { name: "Zurich", lat: 47.3, lng: 8.5 },
];

const mapNodes = [
  // Middle East (Dense)
  { lat: 25.2, lng: 55.3 }, // Dubai
  { lat: 24.7, lng: 46.7 }, // Riyadh
  { lat: 24.4, lng: 54.3 }, // Abu Dhabi
  { lat: 25.3, lng: 51.5 }, // Doha
  { lat: 29.3, lng: 47.9 }, // Kuwait
  { lat: 26.0, lng: 50.5 }, // Manama
  { lat: 23.6, lng: 58.5 }, // Muscat
  { lat: 21.5, lng: 39.1 }, // Jeddah
  { lat: 30.0, lng: 31.2 }, // Cairo
  { lat: 31.9, lng: 35.9 }, // Amman

  // Europe (Hubs)
  { lat: 51.5, lng: -0.1 }, // London
  { lat: 48.8, lng: 2.3 },  // Paris
  { lat: 52.5, lng: 13.4 }, // Berlin
  { lat: 40.4, lng: -3.7 }, // Madrid
  { lat: 41.9, lng: 12.5 }, // Rome
  { lat: 52.3, lng: 4.9 },  // Amsterdam
  { lat: 47.3, lng: 8.5 },  // Zurich
  { lat: 48.2, lng: 16.3 }, // Vienna
  { lat: 59.3, lng: 18.0 }, // Stockholm
  { lat: 53.3, lng: -6.2 }, // Dublin

  // North America (Key Cities)
  { lat: 40.7, lng: -74.0 }, // NYC
  { lat: 34.0, lng: -118.2 }, // LA
  { lat: 41.8, lng: -87.6 }, // Chicago
  { lat: 29.7, lng: -95.3 }, // Houston
  { lat: 43.6, lng: -79.3 }, // Toronto
  { lat: 37.7, lng: -122.4 }, // SF
  { lat: 25.7, lng: -80.1 }, // Miami
  { lat: 47.6, lng: -122.3 }, // Seattle
  { lat: 38.9, lng: -77.0 }, // DC

  // Asia-Pacific (Excl. China)
  { lat: 1.35, lng: 103.8 }, // Singapore
  { lat: 35.6, lng: 139.6 }, // Tokyo
  { lat: 37.5, lng: 126.9 }, // Seoul
  { lat: 19.0, lng: 72.8 },  // Mumbai
  { lat: 28.6, lng: 77.2 },  // New Delhi
  { lat: 13.7, lng: 100.5 }, // Bangkok
  { lat: -6.2, lng: 106.8 }, // Jakarta
  { lat: -33.8, lng: 151.2 }, // Sydney
  { lat: -37.8, lng: 144.9 }, // Melbourne
];

const headquarters = { lat: 34.05, lng: -118.24 }; // Los Angeles, California
const GLOBE_RADIUS = 2;

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
        color="#2d4a40"
        wireframe
        transparent
        opacity={0.15}
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
    return connections.map((c) => {
      const target = latLngToVector3(c.lat, c.lng, GLOBE_RADIUS);
      const mid = hqPos.clone().add(target).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.4);
      const curve = new THREE.QuadraticBezierCurve3(hqPos, mid, target);
      return { curve, name: c.name };
    });
  }, []);

  return (
    <group ref={beamsRef}>
      {curves.map((c, i) => {
        const points = c.curve.getPoints(40).map((p) => [p.x, p.y, p.z] as [number, number, number]);
        return (
          <Line
            key={i}
            points={points}
            color="#C15A2C"
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        );
      })}
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
        {/* Pin glow */}
        <mesh position={hqPos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#C15A2C" />
        </mesh>
        {/* Pulse ring */}
        <mesh position={hqPos}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial
            color="#C15A2C"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function NodePoints() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  const positions = useMemo(
    () => mapNodes.map((c) => latLngToVector3(c.lat, c.lng, GLOBE_RADIUS)),
    []
  );

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#8B9E94" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <GlobeWireframe />
      <ConnectionBeams />
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
          className="glass pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-5 py-3"
          style={{ borderColor: "var(--color-accent-gold)" }}
        >
          <p
            className="text-xs font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-accent-gold)",
            }}
          >
            HQ: California
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-dim)" }}
          >
            Active Projects: 12
          </p>
        </div>
      )}
    </div>
  );
}
