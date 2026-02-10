"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    User,
    Star,
    ShieldCheck,
    Info,
    CheckCircle2,
    ArrowLeft,
    Tractor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { format, addDays } from 'date-fns';

// Mock Data
const RENTAL_DATA: any = {
    'r1': {
        id: 'r1',
        name: 'Mahindra JIVO 245 Tractor',
        category: 'Tractor',
        pricePerHour: 800,
        rating: 4.8,
        reviews: 42,
        image: '🚜',
        owner: 'Ramesh Farm Services',
        location: 'Vadodara, Gujarat',
        description: 'Compact 4WD tractor ideal for inter-culture operations in vineyards and orchards. High fuel efficiency and powerful torque.',
        specs: {
            'Power': '24 HP',
            'Drive': '4WD',
            'Lift Capacity': '750 kg',
            'Fuel Type': 'Diesel'
        }
    },
    'r2': {
        id: 'r2',
        name: 'Kubota Harvester DC-68G',
        category: 'Harvester',
        pricePerHour: 2500,
        rating: 4.9,
        reviews: 18,
        image: '⚙️',
        owner: 'Suraj Agrotech',
        location: 'Anand, Gujarat',
        description: 'High performance combine harvester for paddy and wheat. Excellent threshing and separation capacity.',
        specs: {
            'Power': '68 HP',
            'Cutting Width': '2.5 meters',
            'Grain Tank': '1 TON',
            'Fuel Type': 'Diesel'
        }
    }
};

export default function RentalDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const item = RENTAL_DATA[id] || RENTAL_DATA['r1'];

    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState<number>(4);
    const [isBooked, setIsBooked] = useState(false);

    const totalCost = item.pricePerHour * hours;
    const serviceFee = Math.round(totalCost * 0.05); // 5% fee
    const finalTotal = totalCost + serviceFee;

    const handleBook = () => {
        setIsBooked(true);
        // Reset after animation
        // setTimeout(() => setIsBooked(false), 3000); 
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto">

                <Link href="/rental" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Rentals
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Image & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 rounded-3xl border border-white/10 h-[400px] flex items-center justify-center relative overflow-hidden"
                        >
                            <span className="text-9xl">{item.image}</span>
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                    {item.category}
                                </Badge>
                            </div>
                        </motion.div>

                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{item.name}</h1>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <span className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1 text-orange-500" /> {item.location}
                                        </span>
                                        <span className="flex items-center">
                                            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" /> {item.rating} ({item.reviews} reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-invert border-t border-white/10 pt-6">
                            <h3 className="text-xl font-bold text-white">Description</h3>
                            <p className="text-slate-300">{item.description}</p>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(item.specs).map(([key, val]: [string, any]) => (
                                    <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">{key}</div>
                                        <div className="text-lg font-medium text-white">{val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white/5 rounded-3xl border border-white/10 p-6 sticky top-24">
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">₹{item.pricePerHour}</span>
                                <span className="text-slate-400">/hour</span>
                            </div>

                            {!isBooked ? (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4" /> Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="bg-black/20 border-white/10 text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> Duration (Hours)
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setHours(Math.max(1, hours - 1))}
                                                className="border-white/20 text-white hover:bg-white/10"
                                            >
                                                -
                                            </Button>
                                            <span className="flex-1 text-center font-bold text-xl">{hours} h</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setHours(hours + 1)}
                                                className="border-white/20 text-white hover:bg-white/10"
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 space-y-2">
                                        <div className="flex justify-between text-slate-400">
                                            <span>₹{item.pricePerHour} x {hours} hours</span>
                                            <span>₹{totalCost}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Service fee (5%)</span>
                                            <span>₹{serviceFee}</span>
                                        </div>
                                        <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                                            <span>Total</span>
                                            <span>₹{finalTotal}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg font-bold"
                                        onClick={handleBook}
                                    >
                                        Reserve Equipment
                                    </Button>

                                    <p className="text-xs text-center text-slate-500">
                                        You won't be charged yet.
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8 space-y-4"
                                >
                                    <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="h-10 w-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Booking Requested!</h3>
                                    <p className="text-slate-300">
                                        The owner will confirm your request shortly.
                                    </p>
                                    <div className="bg-white/5 p-4 rounded-xl text-left border border-white/10 mt-6">
                                        <div className="text-sm text-slate-400">Order ID #REQ-{Math.floor(Math.random() * 10000)}</div>
                                        <div className="font-bold text-white mt-1">{item.name}</div>
                                        <div className="text-sm text-slate-300 mt-2">
                                            {new Date(selectedDate).toDateString()} • {hours} Hours
                                        </div>
                                    </div>
                                    <Link href="/rental">
                                        <Button variant="outline" className="w-full mt-4 border-white/20 text-white">
                                            Browse More
                                        </Button>
                                    </Link>
                                </motion.div>
                            )}
                        </div>

                        <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10 flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-white text-sm">ClimateSync Guarantee</h4>
                                <p className="text-xs text-slate-400 mt-1">
                                    Equipment verified for quality. Payments held securely until service completion.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </main>
    );
}
