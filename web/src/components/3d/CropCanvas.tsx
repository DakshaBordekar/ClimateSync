"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Stars, Cloud, Instances, Instance } from '@react-three/drei';
import { ProceduralPlant } from './ProceduralPlant';

interface CropCanvasProps {
    cropType: string;
    growthStage: string;
    weather: any;
}

export const CropCanvas: React.FC<CropCanvasProps> = ({ cropType, growthStage, weather }) => {

    // Map string stage to numeric growth (0-1)
    const getGrowthFactor = (stage: string) => {
        const stages: { [key: string]: number } = {
            'seed': 0.1,
            'germination': 0.2,
            'seedling': 0.4,
            'vegetative': 0.6,
            'flowering': 0.8,
            'fruiting': 0.9,
            'harvest': 1.0
        };
        return stages[stage.toLowerCase()] || 0.5;
    };

    const growth = getGrowthFactor(growthStage);
    const isRaining = weather?.weather_condition?.toLowerCase().includes('rain');

    return (
        <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-900 to-slate-900 shadow-2xl border border-white/10 relative">
            <Canvas shadows camera={{ position: [0, 2, 4], fov: 50 }}>
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={1} />

                    {/* Environment */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 5, -10]} />

                    {/* Rain Effect */}
                    {isRaining && (
                        <Instances range={100}>
                            <cylinderGeometry args={[0.01, 0.01, 0.5]} />
                            <meshBasicMaterial color="#a5f3fc" transparent opacity={0.6} />
                            {/* In a real implementation, we'd use a custom rain particle system here */}
                        </Instances>
                    )}

                    {/* The Crop */}
                    <group position={[0, -1, 0]}>
                        {/* Soil */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                            <circleGeometry args={[3, 32]} />
                            <meshStandardMaterial color="#3d2b1f" roughness={1} />
                        </mesh>

                        <ProceduralPlant growth={growth} type={cropType} />
                        <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={10} color="#000000" />
                    </group>

                    {/* Controls */}
                    <OrbitControls
                        enablePan={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                    />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>

            {/* Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white/80 text-xs flex justify-between">
                <span>🌱 Growth: {Math.round(growth * 100)}%</span>
                <span>🌤️ {weather?.weather_condition || 'Clear'}</span>
            </div>
        </div>
    );
};
