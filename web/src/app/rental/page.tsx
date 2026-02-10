"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tractor,
    Calendar,
    Clock,
    MapPin,
    Search,
    Filter,
    Star,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock Data for Rentals
const RENTAL_EQUIPMENT = [
    {
        id: 'r1',
        name: 'Mahindra JIVO 245 Tractor',
        category: 'Tractor',
        pricePerHour: 800,
        rating: 4.8,
        reviews: 42,
        image: '🚜',
        owner: 'Ramesh Farm Services',
        location: 'Vadodara, Gujarat',
        distance: '5 km away',
        availability: 'Available Today'
    },
    {
        id: 'r2',
        name: 'Kubota Harvester DC-68G',
        category: 'Harvester',
        pricePerHour: 2500,
        rating: 4.9,
        reviews: 18,
        image: '⚙️',
        owner: 'Suraj Agrotech',
        location: 'Anand, Gujarat',
        distance: '12 km away',
        availability: 'Available Tomorrow'
    },
    {
        id: 'r3',
        name: 'DJI Agras T40 Spray Drone',
        category: 'Drone',
        pricePerHour: 1500,
        rating: 5.0,
        reviews: 12,
        image: '🛸',
        owner: 'SkyFarmers Pvt Ltd',
        location: 'Ahmedabad, Gujarat',
        distance: '25 km away',
        availability: 'Available Today'
    },
    {
        id: 'r4',
        name: 'Rotavator 6 Feet',
        category: 'Attachments',
        pricePerHour: 400,
        rating: 4.5,
        reviews: 30,
        image: '🔩',
        owner: 'Local Gram Panchayat',
        location: 'Local Village Center',
        distance: '2 km away',
        availability: 'reserved until 2 PM'
    }
];

const CATEGORIES = ['All', 'Tractor', 'Harvester', 'Drone', 'Attachments'];

export default function RentalPage() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams?.get('category') || 'All';
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEquip = RENTAL_EQUIPMENT.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Hero / Header */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-900 to-amber-900 border border-white/10 shadow-2xl">
                    <div className="p-8 md:p-12 relative z-10 max-w-3xl">
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-4">
                            MACHINERY ON DEMAND
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Rent Top-Tier <br />
                            <span className="text-orange-400">Farm Equipment</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white border-none h-12 px-8 text-lg">
                                Book Now
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-lg">
                                List Your Equipment
                            </Button>
                        </div>
                    </div>
                    {/* Abstract background graphics */}
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <Tractor className="absolute -right-12 -bottom-12 text-white/5 h-80 w-80 rotate-12" />
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-20 z-20 bg-slate-900/95 backdrop-blur py-4 border-b border-white/5">
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <Button
                                key={cat}
                                variant={activeCategory === cat ? "default" : "outline"}
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-6 ${activeCategory === cat
                                        ? 'bg-orange-500 hover:bg-orange-600 border-orange-500'
                                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search tractors, drones..."
                            className="pl-10 bg-white/5 border-white/10 text-white focus:border-orange-500/50 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Equipment List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredEquip.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all group hover:shadow-2xl hover:shadow-orange-900/20"
                            >
                                {/* Image Area */}
                                <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative group-hover:bg-slate-800 transition-colors">
                                    <span className="text-8xl group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl">
                                        {item.image}
                                    </span>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center">
                                        <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
                                        {item.rating}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                                        {item.availability}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
                                            {item.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                        <div className="flex items-center text-sm text-slate-400 gap-4">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {item.location}
                                            </span>
                                            <span className="text-xs bg-white/5 px-2 py-0.5 rounded">
                                                {item.distance}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div>
                                            <span className="text-2xl font-bold text-white">₹{item.pricePerHour}</span>
                                            <span className="text-slate-500 text-sm">/hour</span>
                                        </div>
                                        <Link href={`/rental/${item.id}`}>
                                            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 group-hover:pr-4 transition-all">
                                                Rent Now <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    );
}
