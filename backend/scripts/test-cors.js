// Script de prueba para verificar que el backend CORS está funcionando correctamente
// Ejecutar con: node scripts/test-cors.js

const API_URL = process.env.API_URL || 'http://localhost:3000';

console.log('🧪 Probando configuración de CORS del backend...\n');

async function testLogin() {
    console.log('📝 Test 1: Login con credenciales válidas');

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3001' // Simular petición desde frontend
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });

        console.log('Status:', response.status);
        console.log('Headers CORS:');
        console.log('  - Access-Control-Allow-Origin:', response.headers.get('access-control-allow-origin'));
        console.log('  - Access-Control-Allow-Credentials:', response.headers.get('access-control-allow-credentials'));

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Login exitoso');
            console.log('Token recibido:', data.token ? 'Sí' : 'No');
            console.log('Usuario:', data.user ? data.user.email : 'No disponible');
        } else {
            console.log('⚠️  Login falló (esperado si el usuario no existe)');
            console.log('Mensaje:', data.message);
        }
    } catch (error) {
        console.error('❌ Error en la petición:', error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');
}

async function testRegister() {
    console.log('📝 Test 2: Registro de nuevo usuario');

    try {
        const randomEmail = `test_${Date.now()}@example.com`;

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3001'
            },
            body: JSON.stringify({
                email: randomEmail,
                password: 'Test123!',
                name: 'Usuario Test'
            })
        });

        console.log('Status:', response.status);

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Registro exitoso');
            console.log('Usuario creado:', data.user.email);
        } else {
            console.log('❌ Registro falló');
            console.log('Mensaje:', data.message);
        }
    } catch (error) {
        console.error('❌ Error en la petición:', error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');
}

async function testCorsPreFlight() {
    console.log('📝 Test 3: CORS Preflight (OPTIONS)');

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:3001',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });

        console.log('Status:', response.status);
        console.log('Headers CORS:');
        console.log('  - Access-Control-Allow-Origin:', response.headers.get('access-control-allow-origin'));
        console.log('  - Access-Control-Allow-Methods:', response.headers.get('access-control-allow-methods'));
        console.log('  - Access-Control-Allow-Headers:', response.headers.get('access-control-allow-headers'));
        console.log('  - Access-Control-Allow-Credentials:', response.headers.get('access-control-allow-credentials'));

        if (response.ok || response.status === 204) {
            console.log('✅ CORS Preflight configurado correctamente');
        } else {
            console.log('⚠️  CORS Preflight puede tener problemas');
        }
    } catch (error) {
        console.error('❌ Error en la petición:', error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');
}

async function runTests() {
    console.log(`🔍 Probando API en: ${API_URL}\n`);
    console.log('⚠️  Asegúrate de que el backend esté corriendo antes de ejecutar este script.\n');
    console.log('='.repeat(60) + '\n');

    await testCorsPreFlight();
    await testLogin();
    await testRegister();

    console.log('✨ Pruebas completadas\n');
    console.log('📖 Notas:');
    console.log('  - Si ves "Access-Control-Allow-Origin: http://localhost:3001" = CORS funciona ✅');
    console.log('  - Si ves "null" o no existe el header = CORS no está configurado ❌');
    console.log('  - Asegúrate de que FRONTEND_URL en backend/.env coincida con el origen');
}

// Ejecutar tests
runTests().catch(console.error);

