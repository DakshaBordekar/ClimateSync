"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Trash2,
    Plus,
    Minus,
    ShieldCheck,
    CreditCard,
    Truck,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock Cart Data
const INITIAL_CART = [
    { id: 1, name: 'Organic Tomatoes', price: 40, quantity: 2, unit: 'kg', image: '🍅' },
    { id: 2, name: 'Fresh Spinach', price: 25, quantity: 1, unit: 'bunch', image: '🥬' },
    { id: 3, name: 'Alphonso Mangoes', price: 800, quantity: 1, unit: 'dozen', image: '🥭' },
];

export default function CheckoutPage() {
    const [cart, setCart] = useState(INITIAL_CART);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(0, item.quantity + delta) };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 499 ? 0 : 40;
    const total = subtotal + deliveryFee;

    const handleCheckout = () => {
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-neutral-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center"
                >
                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
                    <p className="text-slate-500 mb-8">
                        Thank you for supporting local farmers. Your fresh produce will arrive by tomorrow morning.
                    </p>
                    <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-500">Order ID</span>
                            <span className="font-mono font-bold">#ORD-28943</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Paid</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                    <Link href="/consumer">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12">
                            Continue Shopping
                        </Button>
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-neutral-50 text-slate-900">
            <div className="max-w-4xl mx-auto">

                <div className="flex items-center gap-4 mb-8">
                    <Link href="/consumer">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Your Cart</h1>
                    <Badge variant="secondary" className="ml-2 bg-slate-200 text-slate-700">
                        {cart.length} items
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
                                >
                                    <div className="h-20 w-20 bg-slate-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                                        {item.image}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800">{item.name}</h3>
                                        <p className="text-sm text-slate-500">₹{item.price} per {item.unit}</p>
                                    </div>

                                    <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-full hover:bg-white"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-full hover:bg-white"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <div className="font-bold text-lg min-w-[3rem] text-right">
                                        ₹{item.price * item.quantity}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {cart.length === 0 && (
                            <div className="text-center py-20 text-slate-400">
                                Your cart is empty.
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Delivery Fee</span>
                                    <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                    </span>
                                </div>
                                <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-xl text-slate-900">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-slate-900 hover:bg-green-600 text-white h-14 rounded-full text-lg font-bold shadow-xl shadow-green-900/10 transition-all hover:scale-105"
                                disabled={cart.length === 0}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </Button>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <ShieldCheck className="h-4 w-4 text-green-600" /> Secure Payments
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <Truck className="h-4 w-4 text-green-600" /> Delivery by Tomorrow
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
