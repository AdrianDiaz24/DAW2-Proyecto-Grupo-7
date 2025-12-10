/**
 * @file Página de debugging para verificar el estado de autenticación
 * @description Esta página permite verificar qué está guardado en localStorage y el estado del store
 */

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';

const Debug = () => {
    const [debugInfo, setDebugInfo] = useState({});
    const { user, token, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const authStorage = localStorage.getItem('auth-storage');
        const parsed = authStorage ? JSON.parse(authStorage) : null;

        setDebugInfo({
            authStorageRaw: authStorage,
            authStorageParsed: parsed,
            userFromStore: user,
            tokenFromStore: token,
            tokenLength: token ? token.length : 0,
            isAuthenticated: isAuthenticated(),
        });
    }, [user, token]);

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>🐛 Debug Page</h1>

            <h2>LocalStorage (auth-storage):</h2>
            <pre style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                overflow: 'auto',
                maxHeight: '300px'
            }}>
                {debugInfo.authStorageRaw || 'No auth-storage found'}
            </pre>

            <h2>Parsed Auth Storage:</h2>
            <pre style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                overflow: 'auto',
                maxHeight: '300px'
            }}>
                {JSON.stringify(debugInfo.authStorageParsed, null, 2)}
            </pre>

            <h2>Store State:</h2>
            <div style={{ backgroundColor: '#e8f5e9', padding: '10px' }}>
                <p><strong>User:</strong> {JSON.stringify(debugInfo.userFromStore)}</p>
                <p><strong>Token Length:</strong> {debugInfo.tokenLength}</p>
                <p><strong>Token (first 50 chars):</strong> {debugInfo.tokenFromStore?.substring(0, 50)}...</p>
                <p><strong>Is Authenticated:</strong> {debugInfo.isAuthenticated ? '✅ YES' : '❌ NO'}</p>
            </div>

            <h2>Test API Call:</h2>
            <button
                onClick={async () => {
                    try {
                        const { apiFetch } = await import('../config/api');
                        const response = await apiFetch('http://localhost:4000/api/registros');
                        const data = await response.json();
                        console.log('Response:', data);
                        alert(`Status: ${response.status}\nResponse: ${JSON.stringify(data)}`);
                    } catch (error) {
                        console.error('Error:', error);
                        alert(`Error: ${error.message}`);
                    }
                }}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}
            >
                Test GET /api/registros
            </button>

            <h2>Clear Auth:</h2>
            <button
                onClick={() => {
                    localStorage.removeItem('auth-storage');
                    window.location.reload();
                }}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}
            >
                Clear LocalStorage & Reload
            </button>
        </div>
    );
};

export default Debug;

