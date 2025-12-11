#!/usr/bin/env node

/**
 * @file test-api.js
 * @description Script de prueba para verificar que los endpoints de la API funcionan correctamente
 * @requires axios
 * @requires dotenv
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const axios = require('axios');

const API_URL = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testAPI() {
    log('\n🚀 Iniciando pruebas de API...', 'cyan');
    log(`📍 URL base: ${API_URL}\n`, 'cyan');

    let token = null;
    let userId = null;
    let registroId = null;
    let diarioId = null;

    try {
        // ========== PRUEBA 1: Registro ==========
        log('1️⃣  Pruebando POST /api/auth/register', 'blue');
        try {
            const registerRes = await axios.post(`${API_URL}/api/auth/register`, {
                name: `Test User ${Date.now()}`,
                email: `test${Date.now()}@ejemplo.com`,
                password: 'TestPassword123',
            });

            if (registerRes.status === 201) {
                log('✅ Registro exitoso', 'green');
                token = registerRes.data.token;
                userId = registerRes.data.user.id;
                log(`   Token obtenido: ${token.substring(0, 30)}...`, 'green');
            }
        } catch (err) {
            log(`❌ Error en registro: ${err.response?.data?.message || err.message}`, 'red');
            return;
        }

        // ========== PRUEBA 2: Login ==========
        log('\n2️⃣  Pruebando POST /api/auth/login', 'blue');
        try {
            const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
                email: `test${Date.now() - 1000}@ejemplo.com`,
                password: 'TestPassword123',
            });

            if (loginRes.status === 200) {
                log('✅ Login exitoso (usuario existente)', 'green');
            }
        } catch (err) {
            log(`⚠️  Login fallido (esperado para usuario nuevo): ${err.response?.data?.message}`, 'yellow');
        }

        // ========== PRUEBA 3: Get Profile ==========
        log('\n3️⃣  Pruebando GET /api/auth/profile', 'blue');
        try {
            const profileRes = await axios.get(`${API_URL}/api/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (profileRes.status === 200) {
                log('✅ Perfil obtenido exitosamente', 'green');
                log(`   Usuario: ${profileRes.data.user.nombre}`, 'green');
            }
        } catch (err) {
            log(`❌ Error obteniendo perfil: ${err.response?.data?.message || err.message}`, 'red');
        }

        // ========== PRUEBA 4: Crear Registro Diario ==========
        log('\n4️⃣  Pruebando POST /api/registros', 'blue');
        try {
            const registroRes = await axios.post(
                `${API_URL}/api/registros`,
                {
                    estadoAnimo: {
                        emociones: [{ nombre: 'Feliz', intensidad: 8 }],
                        comentario: 'Prueba de registro',
                    },
                    sueno: {
                        horaInicioSueno: '23:00',
                        horaDespertar: '07:30',
                        dificultadDormir: false,
                        despertaresNocturnos: false,
                        cansancioDespertar: false,
                        suenoNoReparador: false,
                        suenosVividos: true,
                        notasSueno: 'Prueba',
                    },
                    actividadFisica: [],
                    alimentacion: {
                        regularidadComidas: '3 comidas',
                        calidadDieta: {
                            frutasVerduras: true,
                            ultraprocesados: false,
                            azucar: false,
                            cafeina: true,
                            alcohol: false,
                        },
                        apetito: 'normal',
                    },
                    interaccionesSociales: {
                        cantidad: 'sociable',
                        calidad: 'apoyo',
                        notasSociales: 'Prueba',
                    },
                    cognicion: [],
                    actividadesPlacenteras: [],
                    medicacion: [],
                    energia: { nivel: 'ok', intensidad: 6 },
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (registroRes.status === 201) {
                log('✅ Registro diario creado exitosamente', 'green');
                registroId = registroRes.data.data._id;
                log(`   ID del registro: ${registroId}`, 'green');
            }
        } catch (err) {
            log(
                `❌ Error creando registro: ${err.response?.data?.message || err.message}`,
                'red'
            );
        }

        // ========== PRUEBA 5: Obtener Registros ==========
        log('\n5️⃣  Pruebando GET /api/registros', 'blue');
        try {
            const registrosRes = await axios.get(`${API_URL}/api/registros`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (registrosRes.status === 200) {
                log('✅ Registros obtenidos exitosamente', 'green');
                log(`   Total: ${registrosRes.data.data.length} registros`, 'green');
            }
        } catch (err) {
            log(`❌ Error obteniendo registros: ${err.response?.data?.message || err.message}`, 'red');
        }

        // ========== PRUEBA 6: Obtener Registro por ID ==========
        if (registroId) {
            log('\n6️⃣  Pruebando GET /api/registros/:id', 'blue');
            try {
                const registroByIdRes = await axios.get(`${API_URL}/api/registros/${registroId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (registroByIdRes.status === 200) {
                    log('✅ Registro por ID obtenido exitosamente', 'green');
                }
            } catch (err) {
                log(
                    `❌ Error obteniendo registro por ID: ${err.response?.data?.message || err.message}`,
                    'red'
                );
            }
        }

        // ========== PRUEBA 7: Crear Entrada de Diario ==========
        log('\n7️⃣  Pruebando POST /api/diario', 'blue');
        try {
            const diarioRes = await axios.post(
                `${API_URL}/api/diario`,
                {
                    titulo: `Entrada de prueba ${Date.now()}`,
                    contenido: 'Esta es una entrada de prueba para verificar que el endpoint funciona.',
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (diarioRes.status === 201) {
                log('✅ Entrada de diario creada exitosamente', 'green');
                diarioId = diarioRes.data.data._id;
                log(`   ID de la entrada: ${diarioId}`, 'green');
            }
        } catch (err) {
            log(`❌ Error creando entrada: ${err.response?.data?.message || err.message}`, 'red');
        }

        // ========== PRUEBA 8: Obtener Entradas de Diario ==========
        log('\n8️⃣  Pruebando GET /api/diario', 'blue');
        try {
            const diariosRes = await axios.get(`${API_URL}/api/diario`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (diariosRes.status === 200) {
                log('✅ Entradas de diario obtenidas exitosamente', 'green');
                log(`   Total: ${diariosRes.data.data.length} entradas`, 'green');
            }
        } catch (err) {
            log(`❌ Error obteniendo diarios: ${err.response?.data?.message || err.message}`, 'red');
        }

        // ========== PRUEBA 9: Obtener Entrada por ID ==========
        if (diarioId) {
            log('\n9️⃣  Pruebando GET /api/diario/:id', 'blue');
            try {
                const diarioByIdRes = await axios.get(`${API_URL}/api/diario/${diarioId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (diarioByIdRes.status === 200) {
                    log('✅ Entrada de diario por ID obtenida exitosamente', 'green');
                }
            } catch (err) {
                log(
                    `❌ Error obteniendo entrada por ID: ${err.response?.data?.message || err.message}`,
                    'red'
                );
            }
        }

        // ========== PRUEBA 10: Actualizar Entrada ==========
        if (diarioId) {
            log('\n🔟 Pruebando PUT /api/diario/:id', 'blue');
            try {
                const updateRes = await axios.put(
                    `${API_URL}/api/diario/${diarioId}`,
                    {
                        titulo: 'Entrada actualizada',
                        contenido: 'Este contenido ha sido actualizado.',
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (updateRes.status === 200) {
                    log('✅ Entrada de diario actualizada exitosamente', 'green');
                }
            } catch (err) {
                log(
                    `❌ Error actualizando entrada: ${err.response?.data?.message || err.message}`,
                    'red'
                );
            }
        }

        // ========== PRUEBA 11: Crear Contacto de Emergencia ==========
        log('\n1️⃣1️⃣  Pruebando POST /api/contactos-emergencia', 'blue');
        try {
            const contactoRes = await axios.post(
                `${API_URL}/api/contactos-emergencia`,
                {
                    nombre: 'Contacto de Prueba',
                    relacion: 'Amigo',
                    telefono: '+34612345678',
                    email: 'contacto@ejemplo.com',
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (contactoRes.status === 201) {
                log('✅ Contacto de emergencia creado exitosamente', 'green');
            }
        } catch (err) {
            log(
                `❌ Error creando contacto: ${err.response?.data?.message || err.message}`,
                'red'
            );
        }

        // ========== PRUEBA 12: Obtener Contactos ==========
        log('\n1️⃣2️⃣  Pruebando GET /api/contactos-emergencia', 'blue');
        try {
            const contactosRes = await axios.get(`${API_URL}/api/contactos-emergencia`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (contactosRes.status === 200) {
                log('✅ Contactos de emergencia obtenidos exitosamente', 'green');
                log(`   Total: ${contactosRes.data.data.length} contactos`, 'green');
            }
        } catch (err) {
            log(
                `❌ Error obteniendo contactos: ${err.response?.data?.message || err.message}`,
                'red'
            );
        }

        // ========== PRUEBA 13: Error sin token ==========
        log('\n1️⃣3️⃣  Pruebando autenticación (sin token)', 'blue');
        try {
            await axios.get(`${API_URL}/api/registros`);
            log('❌ Debería haber fallado sin token', 'red');
        } catch (err) {
            if (err.response?.status === 401) {
                log('✅ Correctamente rechazado sin token (401)', 'green');
            }
        }

        // ========== RESULTADO FINAL ==========
        log('\n' + '='.repeat(50), 'cyan');
        log('✅ Pruebas completadas', 'green');
        log('='.repeat(50) + '\n', 'cyan');
    } catch (err) {
        log(`\n❌ Error no esperado: ${err.message}`, 'red');
        process.exit(1);
    }
}

testAPI();

