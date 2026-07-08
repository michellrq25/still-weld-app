const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'public', 'admin', 'config.yml');

if (fs.existsSync(configPath)) {
  let content = fs.readFileSync(configPath, 'utf8');
  
  // Reemplazar local_backend: true con local_backend: false para el build de producción en Vercel
  content = content.replace(/local_backend:\s*true/g, 'local_backend: false');
  
  fs.writeFileSync(configPath, content, 'utf8');
  console.log('✓ Decap CMS preparado para producción (local_backend desactivado).');
} else {
  console.log('⚠ No se encontró config.yml para preparar.');
}
