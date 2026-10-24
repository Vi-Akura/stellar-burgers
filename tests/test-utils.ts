import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HAR_DIR = path.resolve(__dirname, 'hars');

export function getHarData(filename: string): {
  url: string;
  status: number;
  contentType: string;
  body: string;
}[] {
  const harPath = path.join(HAR_DIR, filename);
  const harContent = JSON.parse(fs.readFileSync(harPath, 'utf-8'));
  
  return harContent.log.entries.map((entry: any) => ({
    url: entry.request.url,
    status: entry.response.status,
    contentType: entry.response.headers?.find((h: any) => h.name === 'content-type')?.value || 'application/json',
    body: entry.response.content.text,
  }));
}