"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Search,
    ShoppingCart,
    Star,
    Truck,
    Leaf,
    Apple,
    Wheat,
    Milk,
    Clock,
    User,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock Data for Fresh Produce
const FRESH_PRODUCE = [
    {
        id: 1,
        name: 'Organic Tomatoes',
        category: 'Vegetables',
        price: 40,
        unit: 'kg',
        rating: 4.8,
        seller: 'Ramesh Organics',
        image: '🍅',
        freshness: 'Harvested Today',
        tags: ['Organic', 'Locally Grown']
    },
    {
        id: 2,
        name: 'Fresh Spinach (Palak)',
        category: 'Vegetables',
        price: 25,
        unit: 'bunch',
        rating: 4.9,
        seller: 'Green Valley Farms',
        image: '🥬',
        freshness: 'Harvested Yesterday',
        tags: ['Pesticide Free']
    },
    {
        id: 3,
        name: 'Alphonso Mangoes',
        category: 'Fruits',
        price: 800,
        unit: 'dozen',
        rating: 5.0,
        seller: 'Ratnagiri Orchards',
        image: '🥭',
        freshness: 'Direct from Farm',
        tags: ['Premium', 'Seasonal']
    },
    {
        id: 4,
        name: 'Basmati Rice (aged)',
        category: 'Grains',
        price: 120,
        unit: 'kg',
        rating: 4.7,
        seller: 'Punjab Fields',
        image: '🍚',
        freshness: 'New Crop',
        tags: ['Aromatic']
    },
    {
        id: 5,
        name: 'Desi Cow Milk',
        category: 'Dairy',
        price: 70,
        unit: 'litre',
        rating: 4.9,
        seller: 'Happy Cows Dairy',
        image: '🥛',
        freshness: 'Morning Batch',
        tags: ['Raw', 'A2 Milk']
    },
    {
        id: 6,
        name: 'Red Onions',
        category: 'Vegetables',
        price: 30,
        unit: 'kg',
        rating: 4.5,
        seller: 'Nashik Onion Traders',
        image: '🧅',
        freshness: 'Standard Grade',
        tags: ['Essential']
    }
];

const CATEGORIES = [
    { name: 'All', icon: ShoppingBag },
    { name: 'Vegetables', icon: Leaf },
    { name: 'Fruits', icon: Apple },
    { name: 'Grains', icon: Wheat },
    { name: 'Dairy', icon: Milk },
];

export default function ConsumerStorePage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    const filteredProducts = FRESH_PRODUCE.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-[#030712] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                {/* Consumer Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 mb-3 hover:bg-green-500/20">
                            Direct from Farmers
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                            Fresh <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Farm-to-Table</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Support local farmers and eat healthy. Premium organic produce delivered within 24 hours.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/consumer/checkout">
                            <Button className="bg-white text-black hover:bg-gray-200 gap-2 relative h-12 px-6 rounded-full font-bold">
                                <ShoppingCart className="h-5 w-5" /> Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 text-white rounded-full text-xs flex items-center justify-center font-bold border-2 border-[#030712]">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Hero Banner */}
                <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-emerald-900/40 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-4 text-white">Weekly Organic Subscription Box</h2>
                        <p className="text-slate-300 mb-8 text-lg">
                            Get a curated basket of seasonal vegetables and fruits delivered to your doorstep every week. Save 15% on your first month!
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold h-12 px-8 rounded-full shadow-lg shadow-green-900/20 border-none">
                            Subscribe for ₹499/week
                        </Button>
                    </div>
                    <Leaf className="absolute -right-8 -bottom-8 text-green-500/20 h-64 w-64 rotate-12 transition-transform duration-700 group-hover:rotate-45" />
                    <Apple className="absolute right-32 -top-8 text-green-500/20 h-40 w-40 -rotate-12 transition-transform duration-700 group-hover:-rotate-45" />
                </div>

                {/* Search & Categories */}
                <div className="sticky top-24 z-20 py-4 flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
                    <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-xl -z-10 -mx-4 px-4 mask-image-gradient"></div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {CATEGORIES.map(cat => (
                            <Button
                                key={cat.name}
                                variant="ghost"
                                onClick={() => setActiveCategory(cat.name)}
                                className={`rounded-full border transition-all ${activeCategory === cat.name
                                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <cat.icon className="h-4 w-4 mr-2" />
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search fresh produce..."
                            className="pl-10 bg-white/5 border-white/10 rounded-full focus:bg-white/10 focus:border-green-500/50 text-white placeholder:text-slate-600 h-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-green-500/30 transition-all group hover:shadow-2xl hover:shadow-green-900/10"
                        >
                            <div className="h-48 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
                                <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl">
                                    {product.image}
                                </span>
                                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-green-400" /> {product.freshness}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{product.name}</h3>
                                        <p className="text-sm text-slate-400">by {product.seller}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full text-xs font-bold">
                                        <Star className="h-3 w-3 fill-yellow-400" /> {product.rating}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {product.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 text-slate-400 rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 border-t border-white/5">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-white">₹{product.price}</span>
                                        <span className="text-xs text-slate-500 font-medium">/{product.unit}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="rounded-full bg-green-500 hover:bg-green-600 text-white transition-all shadow-lg shadow-green-900/20 px-4"
                                        onClick={addToCart}
                                    >
                                        Add <ShoppingCart className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center pt-8 pb-12">
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                        <Truck className="h-4 w-4" /> Free delivery on orders above ₹499
                    </p>
                </div>

            </div>
        </main>
    );
}
