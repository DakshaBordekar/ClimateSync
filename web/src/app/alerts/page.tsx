"use client";

import { useEffect, useState } from "react";
import {
    ShieldAlert,
    MapPin,
    Search,
    Thermometer,
    Droplets,
    CloudRain,
    Wind,
    Flame,
    Waves,
    Sprout,
    Ship,
    Clock,
    ArrowUp,
    Calendar,
    CloudFog
} from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { AlertCard } from "@/components/AlertCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchAlerts, fetchCurrentWeather } from "@/lib/api";
import { Alert, AlertsResponse } from "@/types/alerts";
import { WeatherData } from "@/types/weather";

export default function AlertsPage() {
    const [location, setLocation] = useState("Delhi");
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    const loadData = async (loc: string) => {
        setLoading(true);
        try {
            const [alertsData, weatherData] = await Promise.all([
                fetchAlerts(loc),
                fetchCurrentWeather(loc)
            ]);

            if (alertsData && alertsData.success) {
                setAlerts(alertsData.data.alerts);
            } else {
                setAlerts(MOCK_ALERTS); // Fallback to mock if API fails
            }

            if (weatherData && weatherData.success) {
                setWeather(weatherData.data);
            }
        } catch (error) {
            console.error("Failed to load data", error);
            setAlerts(MOCK_ALERTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(location);
    }, []);

    const handleSearch = () => {
        loadData(location);
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-4 animate-pulse">
                        <ShieldAlert className="h-10 w-10 text-red-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Environmental <span className="text-red-400">Alerts</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        AI-Powered Climate Risk Monitoring & Real-time Early Warning System
                    </p>
                </div>

                {/* Location Search Bar */}
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 flex gap-2 shadow-2xl">
                    <div className="pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-white/50" />
                    </div>
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-none bg-transparent text-lg text-white placeholder:text-white/30 focus-visible:ring-0 h-12"
                        placeholder="Search location..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button
                        className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Current Conditions */}
                {weather && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Thermometer className="h-6 w-6 text-blue-400" />
                            Current Conditions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <WeatherCard
                                title="Temperature"
                                value={`${weather.temperature}°C`}
                                subtitle={`Feels like ${weather.feels_like}°C`}
                                icon={Thermometer}
                                color="red"
                                delay={0.1}
                            />
                            <WeatherCard
                                title="Humidity"
                                value={`${weather.humidity}%`}
                                subtitle="Relative"
                                icon={Droplets}
                                color="blue"
                                delay={0.2}
                            />
                            <WeatherCard
                                title="Wind"
                                value={`${weather.wind_speed} km/h`}
                                subtitle="Speed"
                                icon={Wind}
                                color="purple"
                                delay={0.3}
                            />
                            <WeatherCard
                                title="Condition"
                                value={weather.weather_description}
                                subtitle="Sky"
                                icon={CloudRain}
                                color="orange"
                                delay={0.4}
                            />
                        </div>
                    </div>
                )}

                {/* Alerts Grid */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="h-6 w-6 text-red-400" />
                        Active Alerts
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {alerts.map((alert, index) => (
                            <AlertCard
                                key={alert.id || index}
                                title={alert.title}
                                riskLevel={alert.severity}
                                icon={getIconForAlertType(alert.type)}
                                color={getColorForSeverity(alert.severity)}
                                stats={alert.metrics?.map(m => ({
                                    label: m.label,
                                    value: m.value,
                                    icon: getIconByName(m.icon || '')
                                }))}
                                description={alert.description}
                                delay={0.1 * index}
                            />
                        ))}
                        {alerts.length === 0 && !loading && (
                            <div className="col-span-full text-center py-12 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                <p className="text-white/60 text-lg">No active alerts for this location.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}

// Helper functions for icons and colors
function getIconForAlertType(type: string) {
    switch (type) {
        case 'Heat': return Flame;
        case 'Flood': return Waves;
        case 'Drought': return Sprout;
        case 'Storm': return CloudRain;
        case 'AirQuality': return Wind;
        default: return ShieldAlert;
    }
}

function getColorForSeverity(severity: string) {
    switch (severity) {
        case 'High': return 'red';
        case 'Moderate': return 'orange';
        case 'Low': return 'blue';
        default: return 'gray';
    }
}

function getIconByName(name: string) {
    switch (name) {
        case 'Thermometer': return Thermometer;
        case 'Clock': return Clock;
        case 'Droplets': return Droplets;
        case 'Calendar': return Calendar;
        case 'ArrowUp': return ArrowUp;
        case 'Waves': return Waves;
        default: return ShieldAlert;
    }
}

const MOCK_ALERTS: Alert[] = [
    {
        id: "1",
        title: "Heatwave Alert",
        severity: "High",
        type: "Heat",
        description: "Consistent high temperatures detected. Extreme heat expected to persist for the next week. Take necessary precautions.",
        source: "IMD",
        timestamp: new Date().toISOString(),
        effective: new Date().toISOString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        metrics: [
            { label: "Current", value: "38°C", icon: "Thermometer" },
            { label: "Duration", value: "7 Days", icon: "Clock" }
        ]
    },
    {
        id: "2",
        title: "Flood Prediction",
        severity: "Moderate",
        type: "Flood",
        description: "River levels are rising due to upstream rainfall. Moderate flood risk in low-lying areas within the next 48 hours.",
        source: "CWC",
        timestamp: new Date().toISOString(),
        effective: new Date().toISOString(),
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        metrics: [
            { label: "River Level", value: "9.5m", icon: "Droplets" },
            { label: "Peak Time", value: "48h", icon: "Clock" }
        ]
    },
    {
        id: "3",
        title: "Drought Warning",
        severity: "Low",
        type: "Drought",
        description: "Soil moisture levels are critically low. No significant rainfall forecast for the next 15 days.",
        source: "AgriDept",
        timestamp: new Date().toISOString(),
        effective: new Date().toISOString(),
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        metrics: [
            { label: "Soil Moisture", value: "12%", icon: "Droplets" },
            { label: "Forecast", value: "Dry", icon: "Calendar" }
        ]
    }
];
