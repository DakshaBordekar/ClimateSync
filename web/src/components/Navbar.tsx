"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloudSun, Tractor, Calculator, Sprout, ShoppingBag, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Weather", icon: CloudSun },
        { href: "/farming", label: "Farming", icon: Tractor },
        { href: "/profit", label: "Profit", icon: Calculator },
        { href: "/rental", label: "Rentals", icon: Truck },
        { href: "/consumer", label: "Store", icon: ShoppingBag },
    ];

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl shadow-black/50"
            >
                {/* Logo Section */}
                <div className="flex items-center gap-2 px-4 py-2 mr-2 border-r border-white/10">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-1.5 rounded-lg shadow-lg shadow-green-500/20">
                        <Sprout className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-white tracking-tight hidden sm:block">
                        Climate<span className="text-green-400">Sync</span>
                    </span>
                </div>

                {/* Links */}
                <div className="flex items-center">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 rounded-full group transition-colors"
                            >
                                <div className={cn(
                                    "absolute inset-0 rounded-full transition-all duration-300",
                                    isActive ? "bg-white/10 scale-100" : "scale-0 group-hover:scale-100 group-hover:bg-white/5"
                                )} />

                                <span className={cn(
                                    "relative flex items-center gap-2 text-sm font-medium transition-colors",
                                    isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                )}>
                                    <Icon className={cn("h-4 w-4", isActive && "text-green-400")} />
                                    <span className="hidden md:inline">{link.label}</span>
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* CTA / Modes */}
                <div className="ml-2 pl-2 border-l border-white/10 flex items-center">
                    {pathname?.startsWith('/consumer') ? (
                        <Link href="/farming" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all" title="Farmer Mode">
                            <Tractor className="h-4 w-4" />
                        </Link>
                    ) : (
                        <Link href="/consumer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-900/20 transition-all ml-1">
                            Buy
                        </Link>
                    )}
                </div>
            </motion.nav>
        </div>
    );
}
