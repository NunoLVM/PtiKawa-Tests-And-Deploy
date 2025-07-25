# ☕ PtitKawa — Analyse de l'application & Plan de tests

Bienvenue dans ce premier TP consacré aux tests dans un projet Node.js structuré en MVC !  
L’objectif est de **préparer intelligemment vos tests** avant de les coder.

---

## 🎯 Objectifs pédagogiques

- Comprendre **quelles parties de l’application** sont à tester et pourquoi.
- Savoir distinguer les **tests unitaires**, **tests d’intégration** et **tests end-to-end**.
- Créer un **plan de test clair** et organiser vos fichiers dans une **arborescence par type de test**.

---

## 📝 Étapes à suivre

### 1. 🔍 Explorer l'application

Parcourez les fichiers du projet :

```bash
src/
├── controllers/
├── middlewares/
├── routes/
├── services/
└── utils/
```


Posez-vous les bonnes questions :
- Quelles fonctions ont une logique métier ?
- Quelles fonctions appellent d'autres couches (ex: `controller → service`) ?
- Quelles sont les entrées sensibles (requêtes HTTP, données utilisateur, crédits...) ?

---

### 2. 🗂️ Créer une structure de tests

Mettez en place cette structure dans le dossier `tests/` :

```bash 
tests/
├── unit/
├── integration/
└── e2e/
```


> 💡 Cette structure est basée sur le **type de test**, pas sur l’architecture MVC.

---

### 3. 🧩 Rédiger les plans de test synthétique

Pour chaque **fonction critique** (ex: `calculateOrderPrice`, `rechargeCredit`, etc.), créez une fiche de plan de test, par exemple dans un fichier Markdown ou dans un Google Sheet :

| Fonction à tester         | Type de test   | Entrées                             | Résultat attendu                  | Cas limites à tester                 |
|--------------------------|----------------|--------------------------------------|-----------------------------------|--------------------------------------|
| `calculateOrderPrice()`  | Unitaire       | Café : 2€, Croissant : 3€           | Total = 5€                        | Aucun article, article gratuit...    |
| `rechargeCredit()`       | Intégration    | User ID + montant                   | Crédit mis à jour                 | Montant négatif, user inconnu...     |
| `/orders` (POST)         | E2E (Supertest)| Requête HTTP avec commande          | 201 Created + JSON                | Mauvais token, commande vide...      |

💡 Pour chaque ligne, vous saurez ensuite écrire un ou plusieurs tests !

---

### 4. 🧱 Préparer les fichiers de test (vides pour l’instant)

Créez les fichiers de test qui correspondront à votre plan :

```bash
tests/
├── unit/
│ └── services/
│ └── coffeeService.test.js
│ └── creditService.test.js
├── integration/
│ └── controllers/
│ └── coffeeController.test.js
└── e2e/
└── orders.e2e.test.js

```

On ne code **aucun test pour l’instant** : on prépare l’architecture.

---

## 5. ✅ Rédiger un plan de tests détaillé

Pour chaque fonction ou route de l’application, rédigez un **plan de tests** complet avant de coder.
ure couverture fonctionnelle et éviter les oublis.

### 📌 Ce que vous devez faire :
- Choisissez **au moins une fonction** métier (ex : `calculateOrderPrice`) et **une route** (ex : `POST /auth/login`).
- Rédigez un tableau clair listant les cas de test.

---

### 🧪 Exemple de plan de tests : Fonction `calculateOrderPrice()`

| ID      | Description du test                            | Entrées                                                | Étapes                         | Résultat attendu |
|---------|-------------------------------------------------|--------------------------------------------------------|----------------------------------|------------------|
| TC-001  | Calcule le total pour 2 produits                | `[{name: "Latte", price: 3}, {name: "Espresso", price: 2}]` | Appeler la fonction             | `5`              |
| TC-002  | Gère une liste vide                             | `[]`                                                   | Appeler la fonction             | `0`              |
| TC-003  | Ignore les produits à prix négatif              | `[{name: "Bug", price: -5}]`                           | Appeler la fonction             | `0`              |

---

### 🌐 Exemple de plan de tests : Route `POST /auth/login`

| ID      | Description du test                            | Corps de requête                                  | Étapes                         | Résultat attendu   |
|---------|-------------------------------------------------|---------------------------------------------------|----------------------------------|--------------------|
| TC-010  | Authentifie un utilisateur valide               | `{ email: "admin@mail.com", password: "admin" }`  | POST `/auth/login`             | 200 + token JWT    |
| TC-011  | Refuse un mot de passe incorrect                | `{ email: "admin@mail.com", password: "wrong" }`  | POST `/auth/login`             | 401 Unauthorized   |
| TC-012  | Refuse un email inconnu                         | `{ email: "ghost@mail.com", password: "123" }`    | POST `/auth/login`             | 401 Unauthorized   |

---

🎯 **Conseil :** soyez complets ! Testez les cas limites, les erreurs, et les comportements attendus.




## 🧠 Conseil bonus

> Posez-vous toujours cette question : **"Ce que je teste ici, est-ce que je teste uniquement une fonction ou bien une interaction ?"**

Cela vous aidera à choisir entre un test **unitaire**, **intégré**, ou **E2E**.

---

## ✅ À produire

- La structure de dossier `tests/` créée
- Le plan de tests complet (en Markdown ou autre)
- Les fichiers de test vides mais bien placés