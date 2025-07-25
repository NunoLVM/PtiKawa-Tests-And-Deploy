# ☕ PtitKawa — Tests Unitaires

Vous allez maintenant installer votre environnement de test et commencer à écrire vos **premiers tests unitaires** sur les fonctions de l'application.

---

## 🛠️ Étape 1 : Initialisation du projet

Si ce n’est pas déjà fait, initialisez votre projet :

```bash
npm install
```

Vérifiez bien que jest est installé et configuré :

    "type": "module" dans package.json

Script de test dans package.json :

```json 
"scripts": {
  "test": "jest"
}
```


## 📌 Étape 2 : Choix de fonctions à tester

Dans le répertoire src/services/, identifiez les fonctions pures, c’est-à-dire sans accès à l’extérieur (pas de BDD, pas de fichier, pas de requête HTTP).

    On va commencer ensemble par `calculateOrderPrice(orderItems)`


Pour chaque fonction :

Créez un fichier .test.js correspondant dans tests/unit/

Écrivez au moins 3 cas de test :

- Cas nominal
- Cas limite (liste vide, valeur négative…)
- Cas d'erreur (type inattendu, valeur absente…)


## 🚀 Etape 3 : Lancer vos tests

```
npm run test
```

Vous devriez voir passer vos tests avec ✅ si tout est bien configuré !

## Livrables attendus

- Fonction(s) testée(s) avec 3 cas minimum

- Fichier(s) de test correctement nommé(s) et placé(s) dans tests/unit/

- Tests qui passent avec npm test