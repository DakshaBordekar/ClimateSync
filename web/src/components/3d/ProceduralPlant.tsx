"use client";

import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ProceduralPlantProps {
    growth: number; // 0 to 1
    type: string;
    position?: [number, number, number];
}

const PlantBranch = ({ position, rotation, scale, depth, type, color, growth }: any) => {
    if (depth <= 0 || scale < 0.1) return null;

    // Branch geometry depends on type
    const branchLength = type === 'corn' ? 1.5 : 1.0;
    const branchThickness = type === 'corn' ? 0.08 : 0.04;

    return (
        <group position={position} rotation={rotation}>
            {/* Main Stem Segment */}
            <mesh position={[0, branchLength * scale * 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[branchThickness * scale * 0.8, branchThickness * scale, branchLength * scale, 8]} />
                <meshStandardMaterial color="#166534" roughness={0.8} />
            </mesh>

            {/* Leaves */}
            <group position={[0, branchLength * scale * 0.5, 0]}>
                {Array.from({ length: 2 }).map((_, i) => (
                    <mesh
                        key={i}
                        rotation={[Math.PI / 4, (Math.PI / 2) * i + (Math.random() * 0.5), 0]}
                        position={[0, 0, 0]}
                        castShadow
                    >
                        <sphereGeometry args={[0.15 * scale, 4, 8]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                ))}
            </group>

            {/* Child Branches (Recursion) */}
            {depth > 1 && (
                <group position={[0, branchLength * scale, 0]}>
                    <PlantBranch
                        position={[0, 0, 0]}
                        rotation={[0, 0, Math.PI / 6]}
                        scale={scale * 0.8}
                        depth={depth - 1}
                        type={type}
                        color={color}
                        growth={growth}
                    />
                    <PlantBranch
                        position={[0, 0, 0]}
                        rotation={[0, 0, -Math.PI / 6]}
                        scale={scale * 0.8}
                        depth={depth - 1}
                        type={type}
                        color={color}
                        growth={growth}
                    />
                </group>
            )}
        </group>
    );
};

export const ProceduralPlant: React.FC<ProceduralPlantProps> = ({ growth, type, position = [0, 0, 0] }) => {
    const groupRef = useRef<THREE.Group>(null);
    const targetScale = Math.max(0.1, growth);

    // Dynamic color based on crop type
    const color = useMemo(() => {
        switch (type) {
            case 'rice': return '#4ade80';
            case 'wheat': return '#facc15';
            case 'cotton': return '#ffffff';
            case 'corn': return '#fbbf24';
            default: return '#22c55e';
        }
    }, [type]);

    useFrame((state: any, delta: number) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();
            // Gentle Sway
            groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;

            // Growth scaling
            const newScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 1.5 * delta);
            groupRef.current.scale.setScalar(newScale);
        }
    });

    // Determine complexity based on growth
    const depth = Math.floor(growth * 4) + 1; // 1 to 5 levels of branching

    return (
        <group ref={groupRef} position={position} scale={0}>
            {/* Roots Base - visualized as a small mount */}
            <mesh position={[0, 0, 0]} scale={[1, 0.5, 1]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color="#2d1b0f" />
            </mesh>

            <PlantBranch
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1}
                depth={depth}
                type={type}
                color={color}
                growth={growth}
            />
        </group>
    );
};
