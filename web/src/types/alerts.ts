export interface Alert {
    id: string;
    title: string;
    severity: 'High' | 'Moderate' | 'Low';
    description: string;
    source: string;
    timestamp: string;
    effective: string;
    expires: string;
    type: 'Heat' | 'Flood' | 'Drought' | 'Storm' | 'AirQuality' | 'Other';
    metrics?: {
        label: string;
        value: string;
        icon?: string;
    }[];
}

export interface AlertsResponse {
    success: boolean;
    data: {
        location: string;
        alerts: Alert[];
        weather_summary?: {
            temp: number;
            humidity: number;
            condition: string;
        };
    };
}
