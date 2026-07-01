import fs from 'fs';
import path from 'path';
import CatalogWrapper from '../components/catalog/CatalogWrapper';

export default async function Page() {
  // Cargar productos en el servidor para SEO y velocidad de carga inicial
  const filePath = path.join(process.cwd(), 'public', 'products.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);
  const products = data.products || data;

  return <CatalogWrapper initialProducts={products} />;
}
