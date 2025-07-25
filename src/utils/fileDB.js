import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = (file) => path.join(__dirname, '../../data', file);

export async function readData(file) {
  const filePath = dataPath(file);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function writeData(file, data) {
  const filePath = dataPath(file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
