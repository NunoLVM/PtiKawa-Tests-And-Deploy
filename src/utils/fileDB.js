const fs =require('fs/promises');
const path=require('path');
const { fileURLToPath } =require('url');

const dataPath = (file) => path.join(__dirname, '../../data', file);

async function readData(file) {
  const filePath = dataPath(file);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function writeData(file, data) {
  const filePath = dataPath(file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  readData,
  writeData
};
