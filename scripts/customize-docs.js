#!/usr/bin/env node

/**
 * Script para personalizar la documentación JSDoc generada
 * Añade estilos personalizados y la fuente Mouse Memoirs
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'code-docs');

// CSS y link a la fuente
const customStyles = `
<link href="https://fonts.googleapis.com/css2?family=Mouse+Memoirs&display=swap" rel="stylesheet">
<link rel="stylesheet" href="custom.css">
`;

// Función para procesar un archivo HTML
function processHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Si ya tiene el custom.css, no hacer nada
    if (content.includes('custom.css')) {
      return;
    }

    // Añadir los estilos antes del cierre de </head>
    content = content.replace('</head>', `${customStyles}</head>`);

    // Añadir el logo de MindCare si es la página principal
    if (path.basename(filePath) === 'index.html') {
      content = content.replace(
        /<h1[^>]*>.*?<\/h1>/i,
        '<h1 style="font-family: \'Mouse Memoirs\', cursive; color: #4A2CA5; font-size: 2.5rem;">🧠 MindCare API Documentation</h1>'
      );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Procesado: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`✗ Error procesando ${filePath}:`, error.message);
  }
}

// Función recursiva para procesar todos los HTML
function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      processHtmlFile(filePath);
    }
  });
}

// Ejecutar
console.log('📝 Personalizando documentación JSDoc...\n');
processDirectory(docsDir);
console.log('\n✨ ¡Documentación personalizada correctamente!');

