"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon;
    color?: "blue" | "red" | "green" | "purple" | "yellow" | "teal" | "orange";
    className?: string;
    delay?: number;
}

export function WeatherCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "blue",
    className,
    delay = 0,
}: WeatherCardProps) {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } },
    };

    const colorStyles = {
        blue: "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30",
        red: "bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/30",
        green: "bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30",
        purple: "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30",
        yellow: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
        teal: "bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-teal-500/30",
        orange: "bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30",
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            className={cn(
                "relative overflow-hidden rounded-2xl p-6 backdrop-blur-md border border-white/10 shadow-lg",
                colorStyles[color],
                className
            )}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10 shadow-inner">
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white/90">{title}</h3>
            </div>

            <div className="relative z-10">
                <div className="text-4xl font-bold text-white mb-1 drop-shadow-md">
                    {value}
                </div>
                <p className="text-sm text-white/70 font-medium">{subtitle}</p>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        </motion.div>
    );
}
