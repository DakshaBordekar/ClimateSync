"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Star,
    ShoppingCart,
    Truck,
    ShieldCheck,
    ArrowLeft,
    Minus,
    Plus,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock Data (in a real app, this would come from an API based on ID)
const PRODUCTS: any = {
    '1': {
        id: 1,
        name: 'Hybrid Rice Seeds (High Yield)',
        category: 'Seeds',
        price: 450,
        unit: 'kg',
        rating: 4.8,
        reviews: 124,
        image: '🌾',
        seller: 'AgriGenetics Ltd.',
        description: 'Genetically improved hybrid rice seeds designed for high yield and disease resistance. Suitable for both Kharif and Rabi seasons. These seeds have been tested to withstand common pests and require 20% less water than traditional varieties.',
        features: ['Drought Resistant', 'High Yield Potential (upto 8 tons/ha)', 'Short duration (110-115 days)'],
        specifications: {
            'Germination Rate': '98%',
            'Purity': '99.5%',
            'Moisture': '12%',
            'Origin': 'Hyderabad, India'
        }
    },
    '2': {
        id: 2,
        name: 'Organic NPK Fertilizer',
        category: 'Fertilizers',
        price: 1200,
        unit: '50kg bag',
        rating: 4.5,
        reviews: 89,
        image: '🧪',
        seller: 'GreenEarth Organics',
        description: 'Complete organic nutrition for your crops. Balanced NPK ratio ensured to boost plant growth naturally without harming soil health. Enriched with micronutrients and beneficial microbes.',
        features: ['100% Organic Certified', 'Improved Soil Structure', 'Slow Release Formula'],
        specifications: {
            'Type': 'Granules',
            'NPK Ratio': '4:4:4',
            'Weight': '50 kg',
            'Shelf Life': '2 Years'
        }
    }
};

export default function ProductDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const product = PRODUCTS[id] || PRODUCTS['1']; // Fallback to first product if not found

    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <Link href="/store" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Store
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center h-[400px] lg:h-[500px] relative overflow-hidden group"
                    >
                        <span className="text-9xl group-hover:scale-110 transition-transform duration-500 cursor-zoom-in">
                            {product.image}
                        </span>
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                {product.category}
                            </Badge>
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center text-yellow-400">
                                    <Star className="h-4 w-4 fill-current mr-1" />
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                                <span>•</span>
                                <span className="text-emerald-400">In Stock</span>
                                <span>•</span>
                                <span>Sold by {product.seller}</span>
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-white">
                            ₹{product.price}
                            <span className="text-lg text-slate-500 font-normal ml-2">per {product.unit}</span>
                        </div>

                        <p className="text-slate-300 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {product.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                    <span className="text-sm text-slate-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Quantity</span>
                                <div className="flex items-center gap-4 bg-black/20 rounded-lg p-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-8 w-8 hover:bg-white/10"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="font-bold w-4 text-center">{quantity}</span>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-8 w-8 hover:bg-white/10"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className={`flex-1 gap-2 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-emerald-500 hover:bg-emerald-600'} text-white transition-all`}
                                    onClick={handleAddToCart}
                                >
                                    {isAdded ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5" /> Added to Cart
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-5 w-5" /> Add to Cart
                                        </>
                                    )}
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                    Buy Now
                                </Button>
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-lg font-bold text-white mb-4">Specifications</h3>
                            <div className="grid grid-cols-2 gap-y-4">
                                {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                                    <div key={key}>
                                        <div className="text-xs text-slate-500 uppercase">{key}</div>
                                        <div className="text-slate-300 font-medium">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>

            </div>
        </main>
    );
}
