const API_BASE_URL = "http://localhost:4002/api";

export async function fetchCurrentWeather(lat: number, lon: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/weather/coordinates/${lat}/${lon}`);
        if (!response.ok) {
            console.warn("API unavailable, returning null");
            return null;
        }
        const result = await response.json();
        if (!result.success) return null;

        // Transform the response to match the expected format
        const weatherData = result.weather.current;
        return {
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            wind_speed: weatherData.wind_speed,
            precipitation: weatherData.precipitation,
            weather_condition: weatherData.weather_category,
        };
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        return null;
    }
}

export async function fetchCities() {
    try {
        const response = await fetch(`${API_BASE_URL}/weather/cities?limit=15`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch cities:", error);
        return null;
    }
}

export async function searchLocation(query: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/weather/search/${encodeURIComponent(query)}`);
        if (!response.ok) return null;
        const result = await response.json();

        if (!result.success || !result.results || result.results.length === 0) {
            return null;
        }

        // Return the first result with coordinates
        const firstResult = result.results[0];
        return {
            lat: firstResult.latitude,
            lon: firstResult.longitude,
            name: firstResult.name,
            country: firstResult.country,
            admin1: firstResult.admin1,
        };
    } catch (error) {
        console.error("Failed to search location:", error);
        return null;
    }
}


export async function getAIAnalysis(city: string, crop: string, farmSize: number) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/farming/ai-analysis/${encodeURIComponent(city)}?crop=${crop}&farmSize=${farmSize}`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            }
        );
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to get AI analysis:", error);
        return null;
    }
}

export async function fetchAlerts(city: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/alerts/${encodeURIComponent(city)}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch alerts:", error);
        return null; // Return null to handle gracefully
    }
}

export async function fetchFarmingDashboard(city: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/farming/dashboard/${encodeURIComponent(city)}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch farming dashboard:", error);
        return null;
    }
}

export async function fetchProfitPrediction(data: any) {
    try {
        const response = await fetch(`${API_BASE_URL}/profit/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch profit prediction:", error);
        return null;
    }
}

export async function fetchMarketPrices() {
    try {
        const response = await fetch(`${API_BASE_URL}/profit/market-prices`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch market prices:", error);
        return null;
    }
}
