const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/\s+/g, '-')           // Reemplazar espacios con guiones
    .replace(/[^\w\-]+/g, '')       // Quitar caracteres no válidos
    .replace(/\-\-+/g, '-')         // Quitar guiones duplicados
    .replace(/^-+/, '')              // Quitar guiones al inicio
    .replace(/-+$/, '');             // Quitar guiones al final
}

async function main() {
  console.log("\n=== Creador Automático de Productos (Still Weld) ===\n");

  try {
    const name = await askQuestion("Nombre del producto: ");
    if (!name.trim()) {
      console.log("⚠ El nombre es obligatorio. Operación cancelada.");
      return;
    }

    const brand = await askQuestion("Marca (ej. ESAB, Indura, Victor): ");
    
    console.log("\nCategorías válidas: Soldadura, Corte, EPP, Consumibles, Herramientas");
    const category = await askQuestion("Categoría: ");
    
    const priceInput = await askQuestion("Precio Inc. IGV (ej. 650 o 75.5): ");
    const price = parseFloat(priceInput) || 0;
    
    console.log("\nIconos de repuesto si no hay foto: Flame, Sparkles, ShieldCheck, Wrench");
    const icon = await askQuestion("Icono (por defecto Flame): ");
    
    const imagePathRaw = await askQuestion("\nRuta de la imagen en tu PC (arrastra y suelta el archivo aquí, o deja en vacío): ");
    const imagePath = imagePathRaw.trim().replace(/^['"]|['"]$/g, ''); // Limpiar comillas de la ruta

    let imageName = "";
    if (imagePath) {
      if (fs.existsSync(imagePath)) {
        const ext = path.extname(imagePath).toLowerCase();
        // Nombre de archivo seguro e identificable
        imageName = `${slugify(brand || 'product')}-${slugify(name)}${ext}`;
        const destPath = path.join(__dirname, 'public', 'images', 'products', imageName);
        
        // Crear directorio destino si no existe
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        
        // Copiar el archivo
        fs.copyFileSync(imagePath, destPath);
        console.log(`✓ Imagen copiada con éxito a: public/images/products/${imageName}`);
      } else {
        console.log("⚠ La ruta de la imagen no existe. Se creará el producto sin imagen.");
      }
    }

    // Leer products.json actual
    const jsonPath = path.join(__dirname, 'public', 'products.json');
    let data = { products: [] };
    if (fs.existsSync(jsonPath)) {
      data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }

    // Calcular el siguiente ID
    const nextId = data.products.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;

    // Crear el producto
    const newProduct = {
      id: nextId,
      name,
      category: category || "Soldadura",
      brand: brand || "Generico",
      price,
      icon: icon || "Flame"
    };

    if (imageName) {
      newProduct.image = imageName;
    }

    data.products.push(newProduct);

    // Escribir products.json actualizado
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✓ Producto "${name}" añadido al archivo products.json.`);

    console.log("\n=== Desplegando Cambios a Producción (GitHub & Vercel) ===");
    console.log("Sincronizando con el servidor de GitHub...");
    
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "feat: add product ${name} automatically"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    
    console.log("\n✓ ¡Cambios subidos correctamente! Vercel actualizará tu web en 15 segundos.");

  } catch (error) {
    console.error("\n⚠ Ocurrió un error durante la creación:", error.message);
  } finally {
    rl.close();
  }
}

main();
