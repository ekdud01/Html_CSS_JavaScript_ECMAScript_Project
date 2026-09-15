export const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? "http://localhost:8080";

export const BOOKS_URL = `${API_BASE_URL}/api/books`;

export const JSON_HEADERS = {
    "Content-Type": "application/json",
};