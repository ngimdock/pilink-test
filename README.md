# Pilink test

## Les fonctionnalités

- Création dynamique de 2 universités au lancement du projet
- CRUD des étudiants dans une université.
- CRUD des forums dans une université
- Ajouter et retirer un étudiant dans un forum
- Création d'un post dans un forum par un étudiant(L'étudiant doit faire partir du forum pour créer un post dans celui-ci)
- Création des commentaires d'un post par un étudiant(L'étudiant doit faire partir du forum dans le quel se trouve le post)

## Comment lancer le projet

### 1- cloner le projet

```bash
git clone https://github.com/ngimdock/pilink-test.git
```

### 2- Installer pnpm et les dépendences

```bash
npm i -g pnpm
pnpm install
```

### 3- Copier et remplir les valeurs du fichier .env

```bash
cp .env.example .env
```

### 4- Lancer la base des données

```bash
docker compose up -d
```

### 5- Lancer les migrations

```bash
pnpm migrations
```

### 6- lancer le projet

```bash
pnpm start:dev
```

## Détails

### Consulter la documentation de l'API

NB: Ici j'ai utilisé le port 3333

```bash
http://localhost:3333/api
```

### Consulter la base des données

```bash
pnpm database
```
