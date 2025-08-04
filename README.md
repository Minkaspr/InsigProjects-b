# Backend Moderno con TypeScript, Express y Prisma

Este proyecto proporciona una base sólida para construir APIs modernas usando TypeScript, Express, Prisma y soporte para módulos CommonJS. Está diseñado para escalar fácilmente y mantener una estructura clara, ideal para entornos de desarrollo y producción.

Incluye:
- Configuración avanzada de TypeScript y CommonJS
- ORM con Prisma y base de datos PostgreSQL
- Scripts para desarrollo y despliegue
- Soporte para rutas, servicios y controladores separados

## 🚀 Cómo ejecutar este proyecto en tu equipo local

### 1. Instala las dependencias:
```bash
npm install
```
### 2. Crea el archivo .env y añade lo siguiente:
```text
AUTHOR = "Mk"
PORT = 3000
DATABASE_URL = "postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos?schema=public"
```
### 3. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate dev
```

### 4. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

---

## Seccion 1 - Inicializacion del proyecto - backend
| Esta guía te ayudará a crear la base para un backend moderno usando TypeScript, Express, Prisma y ECMAScript Modules.

### Requisitos previos

- Tener instalado: Node.js (v18 o superior) y npm
- Tener instalado: Git Bash o una terminal de tu preferencia

### 1. Crear la carpeta del proyecto y entrar
Opción A: Desde tu explorador de archivos
1. Crea una carpeta con el nombre de tu proyecto, por ejemplo: backend-ts
2. Abre la terminal y navega hacia esa carpeta:
    ```bash
    cd ruta/a/tu/carpeta/backend-ts
    ```

Opción B: Directamente desde la terminal
```bash
mkdir backend-ts
cd backend-ts
```

### 2. Inicializar un proyecto Node.js
Esto creará un archivo package.json con la configuración por defecto.

```bash
npm init -y
```

### 3. Configurar como módulo CommonJS 
Abre el archivo package.json que se acaba de generar y agrega "type": "commonjs" en caso no lo tenga.

```json
{
  "name": "backend-ts",
  "version": "1.0.0",
  "type": "commonjs",
  ...
}
```

## Seccion 2 - Instalar dependencias

### 1. Instalar las dependencias principales
```bash
npm install express@5.1.0 @prisma/client cors express-validator
```

### 2. Instalar las dependencias de desarrollo
```bash
npm install -D typescript ts-node-dev prisma @types/express@5 @types/node @types/cors
```

## Sección 3 - Configuración de typescript
### 1. Crear el archivo tsconfig.json
```bash
npx tsc --init
```
### 2. Reemplazar el contenido del archivo tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

## Seccion 4 - Configuracion de Express con typescript
### 1. Crea la estructura de carpetas
```bash
mkdir src
touch src/index.ts
```
### 2. Crear el archivo index.ts con el siguiente contenido
```ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("✅ Servidor Express funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
```

### 3. Agrega los siguientes scripts en el archivo package.json
```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```
### 4. Inicia el servidor
```bash
npm run dev
```
Deberías ver algo como:
| 🚀 Servidor escuchando en http://localhost:3000

Y si entras a http://localhost:3000/ en el navegador o via curl, verás:
| ✅ Servidor Express funcionando correctamente

## Seccion 5 - Configuracion de Prisma
### 1. Crear el archivo prisma/schema.prisma
```bash
mkdir prisma
touch prisma/schema.prisma
```
### 2. Crea un esquema inicial en schema.prisma
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // Puedes cambiar a "postgresql" o "mysql" en producción
  url      = "file:./dev.db" // postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos
}
// Importante: Si usas PostgreSQL, debes cambiar el provider a "postgresql" y usar la URL de tu base de datos o env("DATABASE_URL") y tener primero creado la base de datos.

model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  createdAt DateTime @default(now())
}
```
Este modelo crea una tabla User con campos básicos como nombre, correo y fecha de creación.

### 3. Inicializar la base de datos y generar el cliente
```bash
npx prisma migrate dev --name init
```
Este comando:
- Crea la base de datos (dev.db si usas SQLite)
- Aplica la migración
- Genera el cliente Prisma automáticamente
- El nombre (init) es personalizable. Puedes poner algo más descriptivo si gustas.

### 4. Opcional: Explorar la base de datos con Prisma Studio
```bash
npx prisma studio
```
Se abrirá una interfaz web donde puedes ver y editar datos fácilmente.

### 5. Conecta prisma a tu proyecto
Crea un archivo src/lib/prisma.ts para reutilizar la instancia del cliente:
```ts
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```
### 6. Importa y usa el cliente en tus archivos
```ts
// src/index.ts
import express from 'express';
import prisma from './lib/prisma'; 

const app = express();
app.use(express.json());

app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
```

## Sección 7 - Despliege a Producción
### 1. Crear un archivo .env
```bash
touch .env
```
### 2. Agregar las variables de entorno en el archivo .env
```env
PORT=3000
```
### 3. Compilar el proyecto a javascript
```bash
npm run build
```
### 4. Iniciar el servidor en producción
```bash
npm run start
```
