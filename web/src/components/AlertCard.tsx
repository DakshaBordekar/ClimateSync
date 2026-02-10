"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlertCardProps {
    title: string;
    riskLevel: "Low" | "Moderate" | "Medium" | "High" | "Critical";
    icon: LucideIcon;
    stats: { label: string; value: string; icon: LucideIcon }[];
    description?: string;
    color: "red" | "blue" | "orange" | "teal";
    onAnalyze?: () => void;
    delay?: number;
}

export function AlertCard({
    title,
    riskLevel,
    icon: Icon,
    stats,
    description = "Loading analysis...",
    color,
    onAnalyze,
    delay = 0,
}: AlertCardProps) {

    const colorStyles = {
        red: {
            border: "border-red-500/30",
            bg: "bg-red-500/10",
            text: "text-red-400",
            badge: "bg-red-500/20 text-red-300",
            glow: "shadow-red-500/20",
            btn: "bg-red-600 hover:bg-red-700",
        },
        blue: {
            border: "border-blue-500/30",
            bg: "bg-blue-500/10",
            text: "text-blue-400",
            badge: "bg-blue-500/20 text-blue-300",
            glow: "shadow-blue-500/20",
            btn: "bg-blue-600 hover:bg-blue-700",
        },
        orange: {
            border: "border-orange-500/30",
            bg: "bg-orange-500/10",
            text: "text-orange-400",
            badge: "bg-orange-500/20 text-orange-300",
            glow: "shadow-orange-500/20",
            btn: "bg-orange-600 hover:bg-orange-700",
        },
        teal: {
            border: "border-teal-500/30",
            bg: "bg-teal-500/10",
            text: "text-teal-400",
            badge: "bg-teal-500/20 text-teal-300",
            glow: "shadow-teal-500/20",
            btn: "bg-teal-600 hover:bg-teal-700",
        },
    };

    const styles = colorStyles[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={cn(
                "relative overflow-hidden rounded-3xl p-6 backdrop-blur-md border shadow-xl transition-all",
                styles.bg,
                styles.border,
                styles.glow
            )}
        >
            {/* Animated Background Effect */}
            <div className={cn("absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-transparent to-white/5")} />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl bg-white/10 backdrop-blur-sm", styles.text)}>
                            <Icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{title}</h3>
                            <div className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide mt-1", styles.badge)}>
                                {riskLevel} Risk
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                                <stat.icon className="h-3 w-3" />
                                {stat.label}
                            </div>
                            <div className="text-lg font-bold text-white">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5">
                    <p className="text-sm text-white/80 leading-relaxed">{description}</p>
                </div>

                <Button
                    className={cn("w-full shadow-lg transition-all", styles.btn)}
                    onClick={onAnalyze}
                >
                    Analyze Risk
                </Button>
            </div>
        </motion.div>
    );
}
