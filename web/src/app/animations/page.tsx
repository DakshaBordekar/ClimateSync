"use client";

import React, { useState } from 'react';
import { CropCanvas } from '@/components/3d/CropCanvas';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sprout, Wind, CloudRain, Sun } from 'lucide-react';

export default function AnimationsPage() {
    const [crop, setCrop] = useState('rice');
    const [stage, setStage] = useState('vegetative');
    const [weatherCondition, setWeatherCondition] = useState('Clear');

    const crops = ['rice', 'wheat', 'cotton', 'corn', 'sugarcane'];
    const stages = ['seed', 'germination', 'seedling', 'vegetative', 'flowering', 'fruiting', 'harvest'];
    const weathers = ['Clear', 'Rain', 'Cloudy'];

    const weatherData = {
        city_name: "Demo",
        temperature: 25,
        humidity: 60,
        rainfall: weatherCondition === 'Rain' ? 10 : 0,
        weather_description: weatherCondition,
        weather_condition: weatherCondition
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        3D Crop Laboratory
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Interactive showcase of procedural crop generation and environmental effects.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10"
                    >
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Sprout className="text-green-400" /> Controls
                        </h2>

                        <div className="space-y-3">
                            <label className="text-sm text-slate-400">Crop Type</label>
                            <div className="flex flex-wrap gap-2">
                                {crops.map(c => (
                                    <Button
                                        key={c}
                                        variant={crop === c ? "default" : "outline"}
                                        onClick={() => setCrop(c)}
                                        className={`capitalize ${crop === c ? 'bg-green-600 hover:bg-green-700' : 'bg-transparent border-white/20 text-white hover:bg-white/10'}`}
                                    >
                                        {c}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm text-slate-400">Growth Stage</label>
                            <div className="flex flex-wrap gap-2">
                                {stages.map(s => (
                                    <Button
                                        key={s}
                                        size="sm"
                                        variant={stage === s ? "default" : "outline"}
                                        onClick={() => setStage(s)}
                                        className={`capitalize ${stage === s ? 'bg-blue-600 hover:bg-blue-700' : 'bg-transparent border-white/20 text-white hover:bg-white/10'}`}
                                    >
                                        {s}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm text-slate-400">Weather Condition</label>
                            <div className="flex gap-2">
                                <Button
                                    variant={weatherCondition === 'Clear' ? "default" : "outline"}
                                    onClick={() => setWeatherCondition('Clear')}
                                    className={weatherCondition === 'Clear' ? 'bg-yellow-600' : 'bg-transparent border-white/20'}
                                >
                                    <Sun className="h-4 w-4 mr-2" /> Sunny
                                </Button>
                                <Button
                                    variant={weatherCondition === 'Rain' ? "default" : "outline"}
                                    onClick={() => setWeatherCondition('Rain')}
                                    className={weatherCondition === 'Rain' ? 'bg-blue-600' : 'bg-transparent border-white/20'}
                                >
                                    <CloudRain className="h-4 w-4 mr-2" /> Rain
                                </Button>
                                <Button
                                    variant={weatherCondition === 'Cloudy' ? "default" : "outline"}
                                    onClick={() => setWeatherCondition('Cloudy')}
                                    className={weatherCondition === 'Cloudy' ? 'bg-gray-600' : 'bg-transparent border-white/20'}
                                >
                                    <Wind className="h-4 w-4 mr-2" /> Cloudy
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Canvas */}
                    <div className="lg:col-span-2 h-[500px]">
                        <CropCanvas
                            cropType={crop}
                            growthStage={stage}
                            weather={weatherData}
                        />

                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm text-slate-400">Growth Factor</div>
                                <div className="text-xl font-bold text-green-400">
                                    {Math.round((stages.indexOf(stage) + 1) / stages.length * 100)}%
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm text-slate-400">Health</div>
                                <div className="text-xl font-bold text-green-400">Optimal</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm text-slate-400">Est. Yield</div>
                                <div className="text-xl font-bold text-green-400">High</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
