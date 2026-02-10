"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ShoppingCart,
    Search,
    Filter,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Package,
    Wheat,
    Leaf,
    Cloud,
    Droplets
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchMarketPrices } from '@/lib/api';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Mock Data for Listings
const MOCK_LISTINGS = [
    { id: 1, crop: 'Rice (Basmati)', quantity: '500 kg', price: '₹4,500/quintal', seller: 'Rajesh Kumar', location: 'Punjab' },
    { id: 2, crop: 'Wheat (Sharbati)', quantity: '1200 kg', price: '₹2,800/quintal', seller: 'Amit Singh', location: 'MP' },
    { id: 3, crop: 'Cotton', quantity: '300 kg', price: '₹6,200/quintal', seller: 'Suresh Patel', location: 'Gujarat' },
    { id: 4, crop: 'Tomato', quantity: '100 kg', price: '₹20/kg', seller: 'Meena Devi', location: 'Nashik' },
    { id: 5, crop: 'Onion', quantity: '2000 kg', price: '₹18/kg', seller: 'Ramesh Pawar', location: 'Nashik' },
];

export default function MarketPage() {
    const [marketPrices, setMarketPrices] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadMarketPrices();
    }, []);

    const loadMarketPrices = async () => {
        try {
            const data = await fetchMarketPrices();
            if (data && data.success) {
                setMarketPrices(data.data);
            } else {
                // Fallback if API fails
                setMarketPrices({
                    rice: { current: 2800, trend: 5, history: [2600, 2650, 2700, 2750, 2800] },
                    wheat: { current: 2200, trend: -2, history: [2300, 2280, 2250, 2220, 2200] },
                    cotton: { current: 6500, trend: 8, history: [6000, 6100, 6300, 6400, 6500] },
                    potato: { current: 1500, trend: 12, history: [1200, 1300, 1350, 1400, 1500] }
                });
            }
        } catch (error) {
            console.error("Failed to load market prices", error);
        } finally {
            setLoading(false);
        }
    };

    const getCropIcon = (cropName: string) => {
        const name = cropName.toLowerCase();
        if (name.includes('rice') || name.includes('wheat') || name.includes('corn')) {
            return <Wheat className="h-6 w-6 text-yellow-400" />;
        }
        if (name.includes('cotton')) {
            return <Cloud className="h-6 w-6 text-slate-200" />;
        }
        if (name.includes('water') || name.includes('cane')) {
            return <Droplets className="h-6 w-6 text-blue-400" />;
        }
        return <Leaf className="h-6 w-6 text-green-400" />;
    };

    const getChartData = (label: string, data: number[], color: string) => ({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
        datasets: [
            {
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: 'rgba(0,0,0,0)',
                tension: 0.4,
                pointRadius: 4,
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index' as const, intersect: false },
        },
        scales: {
            x: { display: false },
            y: { display: false },
        },
        maintainAspectRatio: false,
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-900 to-indigo-900 p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white mb-2">Agri-Marketplace</h1>
                        <p className="text-blue-200 text-lg">Real-time prices, trends, and direct trading.</p>
                    </div>
                    <div className="relative z-10 mt-6 md:mt-0 flex gap-4">
                        <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
                            <Plus className="h-5 w-5" /> Sell Produce
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                            <ShoppingCart className="h-5 w-5" /> My Orders
                        </Button>
                    </div>
                    {/* Background decorations */}
                    <DollarSign className="absolute right-0 bottom-0 text-white/5 h-64 w-64 -mr-8 -mb-8 rotate-12" />
                </div>

                {/* Market Trends (Ticker Tape Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {marketPrices && Object.entries(marketPrices).map(([crop, data]: [string, any]) => (
                        <motion.div
                            key={crop}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="capitalize text-lg font-semibold text-white flex items-center gap-2">
                                    {getCropIcon(crop)} {crop}
                                </h3>
                                <div className={`flex items-center text-sm font-bold ${data.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {data.trend >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                    {Math.abs(data.trend)}%
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-white mb-4">₹{data.current}<span className="text-xs text-slate-400 font-normal">/quintal</span></div>
                            <div className="h-16 w-full">
                                <Line
                                    data={getChartData(crop, data.history, data.trend >= 0 ? '#4ade80' : '#f87171')}
                                    options={chartOptions}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Marketplace Listings */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Package className="text-blue-400" /> Recent Listings
                        </h2>
                        <div className="flex w-full md:w-auto gap-2">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                                <Input
                                    placeholder="Search crops..."
                                    className="pl-10 bg-white/5 border-white/10 text-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_LISTINGS.filter(item => item.crop.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all group"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            {getCropIcon(item.crop)}
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold border border-green-500/30">
                                            VERIFIED SELLER
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{item.crop}</h3>
                                    <p className="text-slate-400 text-sm mb-4">Sold by {item.seller} • {item.location}</p>

                                    <div className="flex justify-between items-center py-4 border-t border-white/10 mb-4">
                                        <div>
                                            <div className="text-xs text-slate-400">Quantity</div>
                                            <div className="font-semibold text-white">{item.quantity}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400">Price</div>
                                            <div className="font-bold text-green-400 text-lg">{item.price}</div>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:scale-[1.02] transition-transform">
                                        Contact Seller
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
