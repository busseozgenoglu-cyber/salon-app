#!/usr/bin/env node
// Bu proje Vite kullanıyor - webpack YOK
// Bu script yanlış projedeyseniz uyarır

const fs = require('fs');
const path = require('path');

const hasVite = fs.existsSync(path.join(__dirname, 'vite.config.js'));
const hasWebpack = fs.existsSync(path.join(__dirname, 'node_modules', 'react-scripts'));
const hasHtmlWebpack = fs.existsSync(path.join(__dirname, 'node_modules', 'html-webpack-plugin'));

console.log('\n=== Salon App Doğrulama ===\n');

if (hasVite) {
  console.log('✓ vite.config.js var - DOĞRU PROJE');
} else {
  console.log('✗ vite.config.js YOK - YANLIŞ PROJE!');
  console.log('  Bu klasör salon-app değil. Eski güzellik/frontend olabilir.');
  process.exit(1);
}

if (hasWebpack || hasHtmlWebpack) {
  console.log('✗ webpack/html-webpack-plugin bulundu - Bu ESKİ proje!');
  console.log('  Bu klasörü silin, yeni salon-app indirin.');
  process.exit(1);
}

if (!hasVite) process.exit(1);

console.log('✓ Webpack yok - Bu Vite projesi');
console.log('\nProje doğru. Çalıştırmak için: npm run web\n');
process.exit(0);
