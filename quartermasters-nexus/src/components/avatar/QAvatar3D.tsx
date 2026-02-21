'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, MeshPhysicalMaterial } from 'three';

interface QAvatar3DProps {
    chatState: 'idle' | 'thinking' | 'speaking' | 'presenting';
    className?: string; // Sizing passed by parent
}

function Polyhedron({ chatState }: { chatState: 'idle' | 'thinking' | 'speaking' | 'presenting' }) {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<MeshPhysicalMaterial>(null);

    useFrame((state, rawDelta) => {
        const delta = Math.min(rawDelta, 0.1); // Cap delta to prevent huge jumps

        if (!meshRef.current || !materialRef.current) return;

        const time = state.clock.getElapsedTime();

        // Base states
        let rotSpeed = 0.3;
        let emissiveIntensity = 1.0;

        switch (chatState) {
            case 'idle':
                rotSpeed = 0.3;
                const idleScale = 1.0 + Math.sin(time * 0.5) * 0.02; // breathing
                meshRef.current.scale.lerp({ x: idleScale, y: idleScale, z: idleScale } as any, 5 * delta);
                emissiveIntensity = 0.5 + Math.sin(time * 0.5) * 0.2;
                break;
            case 'thinking':
                rotSpeed = 1.2;
                // Pseudo vertex-displacement via rapidly shifting axial scale
                meshRef.current.scale.set(
                    1.0 + Math.sin(time * 15) * 0.03,
                    1.0 + Math.cos(time * 14) * 0.03,
                    1.0 + Math.sin(time * 13) * 0.03
                );
                emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.5;
                break;
            case 'speaking':
                rotSpeed = 0.6;
                // Faster cycle ~0.5s = Math.PI * 4 rad/s
                const speakScale = 1.0 + Math.abs(Math.sin(time * Math.PI * 4)) * 0.08;
                meshRef.current.scale.lerp({ x: speakScale, y: speakScale, z: speakScale } as any, 8 * delta);
                emissiveIntensity = 1.0 + Math.abs(Math.sin(time * Math.PI * 4)) * 1.5;
                break;
            case 'presenting':
                rotSpeed = 0.15;
                meshRef.current.scale.lerp({ x: 1.15, y: 1.15, z: 1.15 } as any, 5 * delta);
                emissiveIntensity = 2.0;
                break;
        }

        // Apply rotation
        meshRef.current.rotation.y += rotSpeed * delta;
        meshRef.current.rotation.x += (rotSpeed * 0.5) * delta;

        // Apply emissive intensity smooth damp
        materialRef.current.emissiveIntensity += (emissiveIntensity - materialRef.current.emissiveIntensity) * 5 * delta;
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
                ref={materialRef}
                color="#0A1628"
                emissive="#C15A2C"
                emissiveIntensity={1}
                roughness={0.1}
                metalness={0.3}
                transmission={0.6}
                thickness={1.5}
            />
        </mesh>
    );
}

export function QAvatar3D({ chatState, className = '' }: QAvatar3DProps) {
    return (
        <div className={className}>
            <React.Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[5, 5, 5]} color="#C15A2C" intensity={0.8} />
                    <Polyhedron chatState={chatState} />
                </Canvas>
            </React.Suspense>
        </div>
    );
}
