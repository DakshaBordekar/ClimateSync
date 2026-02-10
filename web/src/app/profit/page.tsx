"use client";

import { useState, useEffect } from "react";
import {
    Calculator,
    Sprout,
    LineChart,
    TrendingUp,
    DollarSign,
    PieChart,
    Lightbulb,
    Info,
    ChevronRight,
    Globe,
    Leaf
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MetricCard } from "@/components/MetricCard";
import { fetchProfitPrediction, fetchCurrentWeather } from "@/lib/api";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface ProfitData {
    grossRevenue: number;
    totalCosts: number;
    netProfit: number;
    returnOnInvestment: number;
}

interface Scenario {
    name: string;
    probability: number;
    description: string;
    profit: ProfitData;
    yield: { totalYield: number };
}

interface PredictionResult {
    profit: ProfitData;
    scenarios: Scenario[];
    costs: {
        breakdown: { [key: string]: number };
    };
    recommendations: { type: string; title: string; message: string; }[];
}

export default function ProfitPage() {
    const [formData, setFormData] = useState({
        location: "",
        crop: "",
        farmSize: 1,
        organicFertilizer: false,
        micronutrients: false,
        advancedPestControl: false,
        biologicalPestControl: false,
        irrigationType: "flood",
        managementLevel: 1.0,
        marketPriceAdjustment: 0
    });

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);

    const calculateProfit = async () => {
        setIsCalculating(true);
        try {
            // 1. Get current weather for the location (needed for prediction)
            // If location is not provided or weather fetch fails, API might use defaults or fail
            let weatherData = null;
            if (formData.location) {
                const weatherResponse = await fetchCurrentWeather(formData.location);
                if (weatherResponse && weatherResponse.success) {
                    weatherData = weatherResponse.data;
                }
            }

            // 2. Prepare payload for Profit API
            const payload = {
                cropId: formData.crop,
                location: formData.location,
                farmSize: formData.farmSize,
                inputSelections: {
                    organicFertilizer: formData.organicFertilizer,
                    micronutrients: formData.micronutrients,
                    advancedPestControl: formData.advancedPestControl,
                    biologicalPestControl: formData.biologicalPestControl,
                    irrigationType: formData.irrigationType,
                    managementLevel: formData.managementLevel
                },
                marketPriceAdjustment: formData.marketPriceAdjustment / 100, // Convert percentage to decimal
                weatherData: weatherData ? {
                    temperature: weatherData.temperature,
                    humidity: weatherData.humidity,
                    rainfall: weatherData.rainfall
                } : undefined
            };

            // 3. Call Profit API
            const response = await fetchProfitPrediction(payload);

            if (response && response.success) {
                const data = response.data;
                setResult({
                    profit: data.prediction.profit,
                    scenarios: data.prediction.scenarios,
                    costs: data.prediction.costs,
                    recommendations: data.recommendations
                });
            } else {
                console.error("Failed to calculate profit");
                // Optional: Show error toast/message
            }
        } catch (error) {
            console.error("Error calculating profit:", error);
        } finally {
            setIsCalculating(false);
        }
    };


    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans text-slate-100">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-4 animate-pulse">
                        <Calculator className="h-10 w-10 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Smart Farmer <span className="text-green-400">Profit Calculator</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Predict yields, calculate returns, and optimize your farming decisions with AI-powered insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                    <Sprout className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-xl font-bold">Farming Inputs</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">📍 Farm Location</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500"
                                            placeholder="Search location..."
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Crop Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">🌾 Select Crop</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={formData.crop}
                                        onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                                    >
                                        <option value="" className="text-black">Choose a crop...</option>
                                        <option value="rice" className="text-black">🌾 Rice (धान)</option>
                                        <option value="wheat" className="text-black">🌾 Wheat (गेहूं)</option>
                                        <option value="cotton" className="text-black">🌿 Cotton (कपास)</option>
                                        <option value="sugarcane" className="text-black">🎋 Sugarcane (गन्ना)</option>
                                        <option value="tomato" className="text-black">🍅 Tomato (टमाटर)</option>
                                        <option value="onion" className="text-black">🧅 Onion (प्याज)</option>
                                    </select>
                                </div>

                                {/* Farm Size */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">📏 Farm Size (Hectares)</label>
                                    <Input
                                        type="number"
                                        min="0.1"
                                        className="bg-black/20 border-white/10 text-white"
                                        value={formData.farmSize}
                                        onChange={(e) => setFormData({ ...formData, farmSize: parseFloat(e.target.value) })}
                                    />
                                </div>

                                {/* Investment Options */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">💰 Investment Options</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'organicFertilizer', label: 'Organic Fertilizer' },
                                            { id: 'micronutrients', label: 'Micronutrients' },
                                            { id: 'advancedPestControl', label: 'Advanced Pest Control' }
                                        ].map((item) => (
                                            <label key={item.id} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-white/5 transition">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-green-500 rounded border-white/30 bg-black/20"
                                                    checked={formData[item.id as keyof typeof formData] as boolean}
                                                    onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                                                />
                                                <span className="text-sm text-slate-300">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Irrigation */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">💧 Irrigation Method</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.irrigationType}
                                        onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                                    >
                                        <option value="flood" className="text-black">Flood Irrigation</option>
                                        <option value="sprinkler" className="text-black">Sprinkler Irrigation</option>
                                        <option value="drip" className="text-black">Drip Irrigation (Efficient)</option>
                                    </select>
                                </div>

                                {/* Advanced Toggle */}
                                <button
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className="flex items-center text-sm text-green-400 hover:text-green-300 transition"
                                >
                                    <ChevronRight className={cn("h-4 w-4 mr-1 transition-transform", showAdvanced && "rotate-90")} />
                                    Advanced Options
                                </button>

                                <AnimatePresence>
                                    {showAdvanced && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden space-y-4 pt-2"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300">🎯 Management Level</label>
                                                <select
                                                    className="w-full h-10 px-3 rounded-md bg-black/20 border border-white/10 text-white"
                                                    value={formData.managementLevel}
                                                    onChange={(e) => setFormData({ ...formData, managementLevel: parseFloat(e.target.value) })}
                                                >
                                                    <option value="0.8" className="text-black">Basic (80%)</option>
                                                    <option value="1.0" className="text-black">Standard (100%)</option>
                                                    <option value="1.2" className="text-black">Advanced (120%)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300">📈 Market Price Adjustment (%)</label>
                                                <Input
                                                    type="number"
                                                    className="bg-black/20 border-white/10 text-white"
                                                    value={formData.marketPriceAdjustment}
                                                    onChange={(e) => setFormData({ ...formData, marketPriceAdjustment: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Button
                                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-3 shadow-lg shadow-green-900/20"
                                    onClick={calculateProfit}
                                    disabled={isCalculating || !formData.crop}
                                >
                                    {isCalculating ? (
                                        <>Processing...</>
                                    ) : (
                                        <><Calculator className="mr-2 h-5 w-5" /> Calculate Profit Prediction</>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Summary Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <MetricCard
                                        label="Gross Revenue"
                                        value={`₹${result.profit.grossRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                        icon={DollarSign}
                                        color="blue"
                                    />
                                    <MetricCard
                                        label="Total Costs"
                                        value={`₹${result.profit.totalCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                        icon={TrendingUp}
                                        color="red"
                                    />
                                    <MetricCard
                                        label="Net Profit"
                                        value={`₹${result.profit.netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                        icon={Leaf}
                                        color="green"
                                    />
                                    <MetricCard
                                        label="ROI"
                                        value={`${result.profit.returnOnInvestment.toFixed(1)}%`}
                                        icon={LineChart}
                                        color="purple"
                                    />
                                </div>

                                {/* Charts Area */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-lg font-semibold mb-4 text-slate-200">Scenario Analysis</h3>
                                        <div className="h-64">
                                            <Bar
                                                data={{
                                                    labels: result.scenarios.map(s => s.name),
                                                    datasets: [
                                                        {
                                                            label: 'Net Profit',
                                                            data: result.scenarios.map(s => s.profit.netProfit),
                                                            backgroundColor: ['rgba(34, 197, 94, 0.6)', 'rgba(234, 179, 8, 0.6)', 'rgba(239, 68, 68, 0.6)'],
                                                            borderColor: ['rgba(34, 197, 94, 1)', 'rgba(234, 179, 8, 1)', 'rgba(239, 68, 68, 1)'],
                                                            borderWidth: 1
                                                        }
                                                    ]
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { display: false } },
                                                    scales: {
                                                        y: { ticks: { color: 'rgba(255,255,255,0.7)' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                                                        x: { ticks: { color: 'rgba(255,255,255,0.7)' }, grid: { display: false } }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-lg font-semibold mb-4 text-slate-200">Cost Breakdown</h3>
                                        <div className="h-64 flex justify-center">
                                            <Doughnut
                                                data={{
                                                    labels: Object.keys(result.costs.breakdown),
                                                    datasets: [{
                                                        data: Object.values(result.costs.breakdown),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.7)',
                                                            'rgba(54, 162, 235, 0.7)',
                                                            'rgba(255, 206, 86, 0.7)',
                                                            'rgba(75, 192, 192, 0.7)',
                                                            'rgba(153, 102, 255, 0.7)',
                                                            'rgba(255, 159, 64, 0.7)',
                                                        ],
                                                        borderWidth: 0
                                                    }]
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        legend: { position: 'right', labels: { color: 'rgba(255,255,255,0.8)' } }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5 text-yellow-400" /> Smart Recommendations
                                    </h3>
                                    <div className="space-y-4">
                                        {result.recommendations.map((rec, idx) => (
                                            <div key={idx} className={cn(
                                                "p-4 rounded-lg flex items-start gap-4 border-l-4",
                                                rec.type === 'success' ? "bg-green-500/10 border-green-500" :
                                                    rec.type === 'warning' ? "bg-yellow-500/10 border-yellow-500" :
                                                        "bg-blue-500/10 border-blue-500"
                                            )}>
                                                <Info className={cn("h-5 w-5 mt-0.5",
                                                    rec.type === 'success' ? "text-green-400" :
                                                        rec.type === 'warning' ? "text-yellow-400" :
                                                            "text-blue-400"
                                                )} />
                                                <div>
                                                    <h4 className="font-semibold text-slate-200">{rec.title}</h4>
                                                    <p className="text-sm text-slate-400">{rec.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                <div className="bg-slate-800 p-4 rounded-full mb-4">
                                    <LineChart className="h-12 w-12 text-slate-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Ready to Calculate</h3>
                                <p className="max-w-md">Select your crop and enter farm details to generate detailed profit predictions and scenarios.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


