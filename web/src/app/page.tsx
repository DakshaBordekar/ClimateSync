"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Wind, Droplets, Thermometer, Sun, CloudRain, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchLocation, fetchCurrentWeather } from "@/lib/api";
import { WeatherData } from "@/types/weather";

export default function Home() {
  const [city, setCity] = useState("Delhi"); // Default city
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Hydration fix for time
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadWeather(city);
  }, []);

  const loadWeather = async (searchCity: string) => {
    setLoading(true);
    const locationData = await searchLocation(searchCity);
    if (locationData) {
      const weatherData = await fetchCurrentWeather(locationData.lat, locationData.lon);
      setWeather(weatherData);
      setCity(locationData.name);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadWeather(city);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white relative overflow-hidden font-sans selection:bg-green-500/30">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Weather Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
          >
            Climate<span className="text-green-500">Sync</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-green-400 transition-colors" />
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-14 pl-12 pr-4 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-green-500/50 transition-all text-lg"
                placeholder="Search city..."
              />
            </form>
          </motion.div>
        </div>

        {/* Dashboard Grid (Bento Box) */}
        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-6xl mx-auto h-auto md:h-[600px]">

            {/* Main Weather Card - Large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-3xl p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex justify-between items-start z-10">
                <div>
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <MapPin className="h-4 w-4" /> {city}
                  </div>
                  <h2 className="text-8xl md:text-9xl font-bold tracking-tighter text-white">
                    {Math.round(weather.temperature)}°
                  </h2>
                  <p className="text-xl text-white/80 mt-2 font-medium capitalize">
                    {weather.weather_condition}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-light text-white/80">{currentTime}</div>
                  <div className="text-sm text-green-400 mt-1 font-medium">Updated just now</div>
                </div>
              </div>

              <div className="mt-8 z-10">
                <div className="h-48 w-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl border border-white/5 flex items-end p-6 relative overflow-hidden">
                  {/* Abstract chart visualization */}
                  <div className="absolute inset-0 flex items-end justify-between px-6 pb-6 opacity-50">
                    {[40, 60, 45, 70, 50, 80, 60].map((h, i) => (
                      <div key={i} className="w-8 bg-white/20 rounded-t-lg hover:bg-green-400/50 transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <span className="relative z-10 font-medium text-white/60">Temperature Trend</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <BentoCard
              title="Humidity"
              value={`${weather.humidity}%`}
              icon={Droplets}
              color="bg-blue-500/20"
              delay={0.4}
            />
            <BentoCard
              title="Wind Speed"
              value={`${weather.wind_speed} km/h`}
              icon={Wind}
              color="bg-slate-500/20"
              delay={0.5}
            />
            <BentoCard
              title="Precipitation"
              value={`${weather.precipitation} mm`}
              icon={CloudRain}
              color="bg-indigo-500/20"
              delay={0.6}
            />
            <BentoCard
              title="UV Index"
              value="Moderate"
              icon={Sun}
              color="bg-orange-500/20"
              delay={0.7}
            />

          </div>
        )}

      </div>
    </main>
  );
}

function BentoCard({ title, value, icon: Icon, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 group"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-white/50 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="h-4 w-4 text-white/40" />
      </div>
    </motion.div>
  );
}
