export interface ServiceItem {
    id: number;
    name: string;
    price: number;
}

export interface ServiceDetails extends ServiceItem {
    content: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7070/api';

export async function fetchServicesList(): Promise<ServiceItem[]> {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}

export async function fetchServiceById(id: number): Promise<ServiceDetails> {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}
