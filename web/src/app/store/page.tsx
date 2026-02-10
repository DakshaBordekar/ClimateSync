"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Search,
    Filter,
    ShoppingCart,
    Star,
    Truck,
    ShieldCheck,
    Sprout,
    Hammer,
    Droplets
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock Data for Input Products
const INPUT_PRODUCTS = [
    {
        id: 1,
        name: 'Hybrid Rice Seeds (High Yield)',
        category: 'Seeds',
        price: 450,
        unit: 'kg',
        rating: 4.8,
        reviews: 124,
        image: '🌾',
        seller: 'AgriGenetics Ltd.',
        tags: ['Drought Resistant', 'High Yield']
    },
    {
        id: 2,
        name: 'Organic NPK Fertilizer',
        category: 'Fertilizers',
        price: 1200,
        unit: '50kg bag',
        rating: 4.5,
        reviews: 89,
        image: '🧪',
        seller: 'GreenEarth Organics',
        tags: ['Organic', 'Eco-Friendly']
    },
    {
        id: 3,
        name: 'Neem-based Pesticide',
        category: 'Pesticides',
        price: 350,
        unit: 'Litre',
        rating: 4.2,
        reviews: 56,
        image: '🛡️',
        seller: 'BioShield',
        tags: ['Natural', 'Safe for Pets']
    },
    {
        id: 4,
        name: 'Wheat Seeds (Sharbati)',
        category: 'Seeds',
        price: 600,
        unit: 'kg',
        rating: 4.9,
        reviews: 210,
        image: '🌾',
        seller: 'Punjab Agro',
        tags: ['Premium Quality', 'Disease Resistant']
    },
    {
        id: 5,
        name: 'Drip Irrigation Kit (1 Acre)',
        category: 'Machinery',
        price: 15000,
        unit: 'set',
        rating: 4.7,
        reviews: 34,
        image: '💧',
        seller: 'Jain Irrigation',
        tags: ['Water Saving', 'Easy Install']
    },
    {
        id: 6,
        name: 'Solar Insect Trap',
        category: 'Machinery',
        price: 2500,
        unit: 'unit',
        rating: 4.6,
        reviews: 78,
        image: '☀️',
        seller: 'SolarFarm Tech',
        tags: ['Renewable', 'Effective']
    }
];

const CATEGORIES = [
    { name: 'All', icon: ShoppingBag },
    { name: 'Seeds', icon: Sprout },
    { name: 'Fertilizers', icon: Droplets },
    { name: 'Machinery', icon: Hammer },
];

export default function InputStorePage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = INPUT_PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-900 to-teal-900 p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-4 hover:bg-emerald-500/30">
                            FARMER'S INPUT STORE
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Quality Inputs for <br /> <span className="text-emerald-400">Better Harvests</span>
                        </h1>
                        <p className="text-emerald-100/80 text-lg mb-8">
                            Buy verified seeds, fertilizers, and machinery directly from top suppliers.
                            Get doorstep delivery and expert guidance.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                Shop Now
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Bulk Order
                            </Button>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent" />
                    <ShoppingBag className="absolute -right-8 -bottom-8 text-white/5 h-64 w-64 rotate-12" />
                </div>

                {/* Categories & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-20 z-20 bg-slate-900/95 backdrop-blur py-4 border-b border-white/5">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <Button
                                key={cat.name}
                                variant={activeCategory === cat.name ? "default" : "outline"}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`whitespace-nowrap ${activeCategory === cat.name
                                    ? 'bg-emerald-600 hover:bg-emerald-700'
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                    }`}
                            >
                                <cat.icon className="h-4 w-4 mr-2" />
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search seeds, equipment..."
                                className="pl-10 bg-white/5 border-white/10 text-white focus:border-emerald-500/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5 relative">
                            <ShoppingCart className="h-5 w-5 text-slate-300" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                                0
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Link href={`/store/${product.id}`} key={product.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all group hover:shadow-xl hover:shadow-emerald-900/20 h-full flex flex-col"
                            >
                                <div className="h-48 bg-white/5 flex items-center justify-center relative overflow-hidden">
                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                                        {product.image}
                                    </span>
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-black/50 backdrop-blur border-white/10 text-white hover:bg-black/60">
                                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                            {product.rating}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4 flex-1 flex flex-col">
                                    <div>
                                        <div className="text-xs text-emerald-400 font-medium mb-1 uppercase tracking-wider">
                                            {product.category}
                                        </div>
                                        <h3 className="text-lg font-bold text-white leading-tight mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-slate-400">By {product.seller}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                        <div>
                                            <div className="text-2xl font-bold text-white">
                                                ₹{product.price}
                                                <span className="text-sm text-slate-500 font-normal ml-1">
                                                    /{product.unit}
                                                </span>
                                            </div>
                                        </div>
                                        <Button size="icon" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white h-10 w-10 shrink-0">
                                            <ShoppingCart className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            <ShieldCheck className="h-3 w-3 text-emerald-500" /> Verified
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Truck className="h-3 w-3 text-blue-500" /> Fast Delivery
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    );
}
