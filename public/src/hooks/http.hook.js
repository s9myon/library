import { useState, useCallback } from 'react';

export function useHttp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                // преобразуем body в объект JSON
                body = JSON.stringify(body);
                // явно указываем что передаём JSON
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (data.result === "error") {
                throw new Error(data.error.text || 'Что-то пошло не так');
            }

            setLoading(false);
            return data
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading, request, error, setError, clearError }
}