export interface WeatherData {
    city_name: string;
    temperature: number;
    humidity: number;
    rainfall: number;
    weather_description: string;
    weather_condition?: string;
    wind_speed?: number;
    pressure?: number;
    uv_index?: number;
    feels_like?: number;
    soil_temperature?: number;
    soil_moisture?: number;
    data_source?: string;
    recorded_at?: string;
}

export interface CityInfo {
    name: string;
    state: string;
    region: string;
    population: number;
    lat: number;
    lon: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
