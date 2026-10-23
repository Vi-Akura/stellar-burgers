import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function prepareDataFromHar() {
  const harPath = path.join(__dirname, 'hars/ingredients.har');
  const harContent = JSON.parse(fs.readFileSync(harPath, 'utf-8'));
  
  const ingredientsEntry = harContent.log.entries.find(
    (entry: any) => entry.request.url.includes('/ingredients')
  );
  const ingredientsData = JSON.parse(ingredientsEntry.response.content.text);

  const bun = ingredientsData.data.find((item: any) => item.type === 'bun');
  const main = ingredientsData.data.find((item: any) => item.type === 'main');
  const sauce = ingredientsData.data.find((item: any) => item.type === 'sauce');

  const orderHarPath = path.join(__dirname, 'hars/order-created.har');
  const orderHarContent = JSON.parse(fs.readFileSync(orderHarPath, 'utf-8'));
  const orderEntry = orderHarContent.log.entries.find(
    (entry: any) => entry.request.url.includes('/orders')
  );
  const orderData = JSON.parse(orderEntry.response.content.text);

  return {
    bunTitle: bun.name,
    fillingTitle: main.name,
    sauceTitle: sauce.name,
    orderNumber: orderData.order.number.toString(),
  };
}