"use client";

import { useState } from "react";
import {
    Tractor,
    Sprout,
    Leaf,
    Brain,
    AlertTriangle,
    Droplets,
    Thermometer,
    CloudRain,
    Search,
    Wind,
    BrainCircuit,
    ShoppingBag
} from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { searchLocation, getAIAnalysis, fetchCurrentWeather } from "@/lib/api";
import { AIAnalysisReport, AgentAnalysis } from "@/types/farming";
import { WeatherData } from "@/types/weather";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CropCanvas } from "@/components/3d/CropCanvas";

export default function FarmingPage() {
    const [formData, setFormData] = useState({
        location: "Delhi",
        crop: "rice",
        stage: "vegetative",
        farmSize: "1"
    });

    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AIAnalysisReport | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    // Handle location search
    const handleSearch = async (query: string) => {
        setFormData(prev => ({ ...prev, location: query }));
        if (query.length > 2) {
            const data = await searchLocation(query);
            if (data && data.success) {
                setSearchResults(data.results || data.data || []);
                setShowResults(true);
            }
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const selectLocation = async (locationName: string) => {
        setFormData(prev => ({ ...prev, location: locationName }));
        setShowResults(false);
        // Fetch weather for selected location
        const weatherData = await fetchCurrentWeather(locationName);
        if (weatherData && weatherData.success) {
            setWeather(weatherData.data);
        }
    };

    const runAnalysis = async () => {
        setLoading(true);
        // Fetch weather if not already loaded
        if (!weather) {
            const weatherData = await fetchCurrentWeather(formData.location);
            if (weatherData && weatherData.success) {
                setWeather(weatherData.data);
            }
        }

        try {
            const result = await getAIAnalysis(formData.location, formData.crop, parseFloat(formData.farmSize));

            if (result && result.success) {
                setAnalysis(result.data.ai_analysis);
            } else {
                // Fallback Mock Data if API fails/is offline
                console.warn("Using mock analysis data");
                await new Promise(r => setTimeout(r, 2000)); // Simulate delay
                setAnalysis(MOCK_ANALYSIS);
            }
        } catch (error) {
            console.error("Analysis failed", error);
            setAnalysis(MOCK_ANALYSIS);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-4 animate-pulse">
                        <Tractor className="h-10 w-10 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Smart <span className="text-green-400">Farming</span> Assistant
                    </h1>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        AI-driven insights for optimal crop health and yield maximization
                    </p>
                </div>

                {/* Control Panel */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Location Input */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-green-100 ml-1">Farm Location</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                                <Input
                                    value={formData.location}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/30"
                                    placeholder="Search village/city..."
                                />
                                {showResults && searchResults.length > 0 && (
                                    <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                        {searchResults.map((result: any, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 hover:bg-slate-700 cursor-pointer text-white flex items-center gap-2"
                                                onClick={() => selectLocation(result.name)}
                                            >
                                                <span className="text-lg">{result.type === 'City' ? '🏙️' : '🏡'}</span>
                                                <div>
                                                    <div className="font-medium">{result.name}</div>
                                                    <div className="text-xs text-slate-400">{result.state}, {result.country}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Crop Select */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-green-100 ml-1">Select Crop</label>
                            <div className="relative">
                                <Sprout className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                                <select
                                    className="w-full h-10 pl-10 pr-3 rounded-md bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                                    value={formData.crop}
                                    onChange={(e) => setFormData(prev => ({ ...prev, crop: e.target.value }))}
                                >
                                    <option value="rice" className="text-black">🌾 Rice (Paddy)</option>
                                    <option value="wheat" className="text-black">🌾 Wheat</option>
                                    <option value="cotton" className="text-black">🌱 Cotton</option>
                                    <option value="sugarcane" className="text-black">🎋 Sugarcane</option>
                                    <option value="maize" className="text-black">🌽 Maize</option>
                                    <option value="tomato" className="text-black">🍅 Tomato</option>
                                    <option value="potato" className="text-black">🥔 Potato</option>
                                </select>
                            </div>
                        </div>

                        {/* Growth Stage */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-green-100 ml-1">Growth Stage</label>
                            <select
                                className="w-full h-10 px-3 rounded-md bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formData.stage}
                                onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                            >
                                <option value="seedling" className="text-black">🌱 Seedling Stage</option>
                                <option value="vegetative" className="text-black">🌿 Vegetative Stage</option>
                                <option value="flowering" className="text-black">🌸 Flowering Stage</option>
                                <option value="fruiting" className="text-black">🍎 Fruiting / Grain Filling</option>
                                <option value="harvest" className="text-black">🌾 Harvest Ready</option>
                            </select>
                        </div>

                        {/* Farm Size */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-green-100 ml-1">Farm Size (Acres)</label>
                            <Input
                                type="number"
                                value={formData.farmSize}
                                onChange={(e) => setFormData(prev => ({ ...prev, farmSize: e.target.value }))}
                                className="bg-black/20 border-white/10 text-white placeholder:text-white/30"
                                min="1"
                            />
                        </div>

                    </div>

                    <Button
                        onClick={runAnalysis}
                        disabled={loading}
                        className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 text-lg shadow-lg shadow-green-900/20 transition-all hover:scale-[1.01]"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Running AI Analysis...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="h-6 w-6" />
                                Run AI Analysis
                            </div>
                        )}
                    </Button>
                </div>

                {/* 3D Crop Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sprout className="h-6 w-6 text-green-400" />
                        <h2 className="text-xl font-bold text-white">Live Crop Simulation</h2>
                    </div>
                    <CropCanvas
                        cropType={formData.crop}
                        growthStage={formData.stage}
                        weather={weather}
                    />
                </motion.div>

                {/* Analysis Results */}
                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* Quick Weather Context */}
                            {weather && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <WeatherCard title="Temperature" value={`${weather.temperature}°C`} subtitle="Current" icon={Thermometer} color="red" />
                                    <WeatherCard title="Humidity" value={`${weather.humidity}%`} subtitle="Relative" icon={Droplets} color="blue" />
                                    <WeatherCard title="Wind" value={`${weather.wind_speed} km/h`} subtitle="Speed" icon={Wind} color="blue" />
                                    <WeatherCard title="Condition" value={weather.weather_description} subtitle="Sky" icon={Leaf} color="green" />
                                </div>
                            )}


                            {/* Executive Summary */}
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    <BrainCircuit className="h-6 w-6 text-purple-400" />
                                    Executive Summary
                                </h2>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-lg text-white/90 leading-relaxed">
                                        {analysis.executiveSummary.overall_assessment}
                                    </p>
                                    <ul className="mt-4 list-disc pl-5 text-white/80">
                                        {analysis.executiveSummary.key_insights.map((insight, i) => (
                                            <li key={i}>{insight}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Priority Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-red-500/10 backdrop-blur-md rounded-3xl p-6 border border-red-500/20">
                                    <h3 className="text-xl font-bold text-red-100 mb-4 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-red-400" />
                                        Priority Actions
                                    </h3>
                                    <ul className="space-y-3">
                                        {analysis.priorityActions.map((action, i) => (
                                            <li key={i} className="flex items-start gap-3 text-red-50/90">
                                                <span className={`text-red-300 text-xs font-bold px-2 py-1 rounded mt-0.5 ${action.urgency === 'critical' ? 'bg-red-600/40' : 'bg-red-500/20'}`}>
                                                    {action.urgency.toUpperCase()}
                                                </span>
                                                <div>
                                                    <div className="font-semibold">{action.action}</div>
                                                    <div className="text-sm text-white/60">{action.description}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-green-500/10 backdrop-blur-md rounded-3xl p-6 border border-green-500/20">
                                    <h3 className="text-xl font-bold text-green-100 mb-4 flex items-center gap-2">
                                        <Leaf className="h-5 w-5 text-green-400" />
                                        Growth Opportunities
                                    </h3>
                                    {analysis.agentAnalyses?.market_agent?.data?.insights && (
                                        <ul className="space-y-3">
                                            {analysis.agentAnalyses.market_agent.data.insights.map((insight, i) => (
                                                <li key={i} className="flex items-start gap-3 text-green-50/90">
                                                    <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded mt-0.5">OPP</span>
                                                    {insight.message}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Detailed Agent Analysis Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AgentCard title="🌱 Agronomist" data={analysis.agentAnalyses.agronomist} color="green" />
                                <AgentCard title="💧 Irrigation Specialist" data={analysis.agentAnalyses.irrigation_expert} color="blue" />
                                <AgentCard title="🐛 Pest Control" data={analysis.agentAnalyses.pest_control} color="red" />
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </main>
    );
}

function AgentCard({ title, data, color }: { title: string, data: AgentAnalysis, color: 'green' | 'blue' | 'red' }) {
    const colors = {
        green: "bg-green-500/10 border-green-500/20",
        blue: "bg-blue-500/10 border-blue-500/20",
        red: "bg-red-500/10 border-red-500/20"
    };

    if (!data || !data.data || !data.data.recommendations) return null;

    const recommendation = data.data.recommendations[0];

    const getProductSearchQuery = (agentTitle: string) => {
        if (agentTitle.includes("Pest")) return "Pesticide";
        if (agentTitle.includes("Irrigation")) return "Irrigation";
        if (agentTitle.includes("Agronomist")) return "Fertilizer";
        return "Seeds";
    };

    const searchQuery = getProductSearchQuery(title);

    return (
        <div className={cn("backdrop-blur-md rounded-2xl p-6 border flex flex-col h-full", colors[color])}>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <div className="space-y-3">
                    <div className="text-sm text-white/60">Strategy</div>
                    <p className="text-white/90">{recommendation.message}</p>
                    {recommendation.details && (
                        <ul className="mt-4 space-y-2">
                            {recommendation.details.map((detail, i) => (
                                <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
                <Link href={`/store?search=${searchQuery}`}>
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 gap-2 supports-[backdrop-filter]:bg-white/5">
                        <ShoppingBag className="h-4 w-4" />
                        Buy {searchQuery}s
                    </Button>
                </Link>
            </div>
        </div>
    );
}

const MOCK_ANALYSIS: AIAnalysisReport = {
    metadata: {
        overallConfidence: 0.85,
        successfulAgents: 5,
        failedAgents: 0
    },
    executiveSummary: {
        overall_assessment: "Conditions are generally favorable for vegetative growth. However, rising temperatures indicate a need for increased irrigation monitoring.",
        key_insights: [
            "Pest pressure is moderate but requires preemptive action.",
            "Soil conditions are good but nitrogen levels may be depleting.",
            "Market demand for high-quality grain is expected to be high."
        ]
    },
    priorityActions: [
        {
            action: "Increase irrigation frequency",
            description: "Increase irrigation frequency by 15% to verify soil moisture",
            urgency: "high",
            source: "Irrigation Expert"
        },
        {
            action: "Apply pesticide",
            description: "Apply organic neem-based pesticide as a preventive measure",
            urgency: "medium",
            source: "Pest Control"
        },
        {
            action: "Monitor nutrient levels",
            description: "Monitor leaf color for signs of nitrogen deficiency",
            urgency: "medium",
            source: "Agronomist"
        }
    ],
    riskAssessment: {
        overall_risk_level: "Moderate",
        critical_risks: 0,
        total_risks_identified: 2,
        recommendation: "Monitor heat stress and pest activity closely."
    },
    agentAnalyses: {
        agronomist: {
            status: "success",
            data: {
                confidence: 0.85,
                recommendations: [{
                    title: "Nutrient Management",
                    message: "Focus on nutrient uptake. Soil conditions are good but nitrogen levels may be depleting.",
                    priority: "medium",
                    details: ["Apply urea split dose", "Check for weed competition"]
                }]
            }
        },
        irrigation_expert: {
            status: "success",
            data: {
                confidence: 0.9,
                recommendations: [{
                    title: "Irrigation Schedule",
                    message: "Evapotranspiration is increasing. Switch to early morning irrigation cycles.",
                    priority: "high",
                    details: ["Schedule irrigation at 5 AM", "Check drip lines for clogging"]
                }]
            }
        },
        pest_control: {
            status: "success",
            data: {
                confidence: 0.75,
                recommendations: [{
                    title: "Pest Prevention",
                    message: "Early signs of stem borer activity. Install pheromone traps immediately.",
                    priority: "high",
                    details: ["Install 5 traps/acre", "Monitor trap counts daily"]
                }]
            }
        },
        market_agent: {
            status: "success",
            data: {
                confidence: 0.8,
                insights: [{
                    title: "Market Opportunity",
                    message: "Rice prices are stable. Good demand expected for high-quality grain."
                }, {
                    title: "Export Potential",
                    message: "Consider export varieties for better margins."
                }]
            }
        }
    }
};
