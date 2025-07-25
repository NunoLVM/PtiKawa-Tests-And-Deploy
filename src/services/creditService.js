import { readData, writeData } from '../utils/fileDB.js';

export async function recharge(userId, amount) {
  const users = await readData('users.json');
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  user.credit += amount;
  await writeData('users.json', users);

  return user.credit;
}
