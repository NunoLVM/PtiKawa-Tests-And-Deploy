# ☕ PtitKawa — Partie 3 : Tests Unitaires

## 📝 Consignes

Vous allez écrire des tests automatisés avancés en utilisant des **mocks** et des **espions** pour tester des parties de votre application café contenant des dépendances externes.

---

## 🔧 Étapes attendues

### 1. Identifier les dépendances

Choisissez une ou plusieurs fonctions à tester, par exemple :

- `creditService.recharge()`
- `orderController.createOrder()`

 Repérez quelles fonctions internes doivent être mockées (ex : `readData`, `writeData`, `console.log`, etc.)

---

### 2.  Écrire les tests avec mocks

Dans le bon dossier (`tests/unit` ou `tests/integration`), créez des fichiers de test où :

- Vous mockez les dépendances avec `jest.mock()` ou `jest.fn()`
- Vous testez le comportement de votre fonction indépendamment de ces dépendances

---

### 3. Suivre les appels avec `jest.spyOn()`

Pour certaines dépendances que vous ne souhaitez pas remplacer, utilisez `jest.spyOn()` pour vérifier qu'elles ont été appelées.

📌 Exemple : vérifier qu’un appel à `console.log()` ou `writeData()` a bien eu lieu avec les bons arguments.

---

## 💡 Exemple attendu

```js
// tests/unit/services/creditService.test.js
import * as fileDB from '../../../src/utils/fileDB';
import { recharge } from '../../../src/services/creditService';

jest.mock('../../../src/utils/fileDB');

describe('recharge', () => {
  it('should add credit to a user when user exists', async () => {
    const mockUsers = [{ id: 1, credit: 5 }];
    fileDB.readData.mockResolvedValue(mockUsers);
    fileDB.writeData.mockResolvedValue();

    const result = await recharge(1, 10);

    expect(result).toBe(15);
    expect(fileDB.readData).toHaveBeenCalledWith('users.json');
    expect(fileDB.writeData).toHaveBeenCalledWith('users.json', [{ id: 1, credit: 15 }]);
  });
});
```
Pour cette fonction vous pouvez également réaliser les tests suivants pour commencer : 

2. 'should return null if user is not found'
3. should handle zero credit addition'
4. 'should work with decimal credit'

## 📦 Livrables attendus

- Des tests unitaires et/ou d’intégration utilisant des mocks et/ou des espions

- Au moins un test par fonction comportant une dépendance externe

- Code organisé par type de test (unit, integration, etc.)