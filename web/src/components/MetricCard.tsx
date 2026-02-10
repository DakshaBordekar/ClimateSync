"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color: "blue" | "green" | "red" | "purple";
    className?: string;
}

export function MetricCard({ label, value, icon: Icon, color, className }: MetricCardProps) {
    const colorStyles = {
        blue: "text-blue-400 bg-blue-500/10",
        green: "text-green-400 bg-green-500/10",
        red: "text-red-400 bg-red-500/10",
        purple: "text-purple-400 bg-purple-500/10",
    };

    return (
        <div className={cn("bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center", className)}>
            <div className={cn("p-2 rounded-lg mb-3", colorStyles[color])}>
                <Icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-lg md:text-xl font-bold text-white mt-1">{value}</p>
        </div>
    );
}
