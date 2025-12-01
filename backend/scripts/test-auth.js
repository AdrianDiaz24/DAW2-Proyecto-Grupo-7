/**
 * Script de prueba para el sistema de autenticación
 * Ejecutar con: node scripts/test-auth.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Cargar modelo de usuario
const User = require('../src/models/usuarios_mongoose');

async function testAuth() {
    console.log('🚀 Iniciando pruebas del sistema de autenticación...\n');

    try {
        // Conectar a MongoDB
        const uri = process.env.MONGODB_URI || process.env.URL_DB;
        if (!uri) {
            throw new Error('❌ No se encontró MONGODB_URI en .env');
        }

        console.log('📡 Conectando a MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ Conectado a MongoDB\n');

        // Limpiar usuario de prueba si existe
        console.log('🧹 Limpiando datos de prueba anteriores...');
        await User.deleteOne({ email: 'test@example.com' });
        console.log('✅ Datos limpios\n');

        // Test 1: Crear usuario
        console.log('📝 Test 1: Crear usuario con contraseña hasheada');
        const testPassword = 'password123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testPassword, salt);

        const newUser = await User.create({
            email: 'test@example.com',
            password: hashedPassword,
            nombre: 'Usuario Test',
            alias: 'tester'
        });

        console.log('✅ Usuario creado:', {
            id: newUser._id,
            email: newUser.email,
            nombre: newUser.nombre
        });
        console.log('✅ Contraseña hasheada correctamente\n');

        // Test 2: Verificar contraseña
        console.log('🔐 Test 2: Verificar contraseña');
        const isMatch = await bcrypt.compare(testPassword, newUser.password);
        if (isMatch) {
            console.log('✅ Contraseña verificada correctamente\n');
        } else {
            throw new Error('❌ La contraseña no coincide');
        }

        // Test 3: Generar JWT
        console.log('🎫 Test 3: Generar token JWT');
        if (!process.env.JWT_SECRET) {
            throw new Error('❌ No se encontró JWT_SECRET en .env');
        }

        const payload = {
            user: {
                id: newUser._id.toString(),
                email: newUser.email,
                name: newUser.nombre
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('✅ Token generado:', token.substring(0, 50) + '...\n');

        // Test 4: Verificar JWT
        console.log('🔍 Test 4: Verificar token JWT');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verificado correctamente');
        console.log('📦 Payload decodificado:', {
            userId: decoded.user.id,
            email: decoded.user.email,
            name: decoded.user.name
        });
        console.log('\n');

        // Test 5: Buscar usuario por ID
        console.log('🔎 Test 5: Buscar usuario por ID');
        const foundUser = await User.findById(decoded.user.id).select('-password');
        if (foundUser) {
            console.log('✅ Usuario encontrado:', {
                id: foundUser._id,
                email: foundUser.email,
                nombre: foundUser.nombre,
                alias: foundUser.alias
            });
        } else {
            throw new Error('❌ No se encontró el usuario');
        }

        console.log('\n✨ ¡Todas las pruebas pasaron exitosamente! ✨\n');

        // Resumen
        console.log('📊 RESUMEN:');
        console.log('  ✅ Conexión a MongoDB: OK');
        console.log('  ✅ Creación de usuario: OK');
        console.log('  ✅ Hashing de contraseña: OK');
        console.log('  ✅ Verificación de contraseña: OK');
        console.log('  ✅ Generación de JWT: OK');
        console.log('  ✅ Verificación de JWT: OK');
        console.log('  ✅ Búsqueda de usuario: OK');
        console.log('\n🎉 El sistema de autenticación está funcionando perfectamente!\n');

        // Limpiar
        console.log('🧹 Limpiando datos de prueba...');
        await User.deleteOne({ email: 'test@example.com' });
        console.log('✅ Datos limpiados\n');

    } catch (error) {
        console.error('\n❌ Error en las pruebas:', error.message);
        console.error('\n📝 Stack trace:', error.stack);
        process.exit(1);
    } finally {
        // Cerrar conexión
        await mongoose.connection.close();
        console.log('👋 Conexión cerrada. Adiós!');
        process.exit(0);
    }
}

// Ejecutar pruebas
testAuth();

