# Camunda 8 Node Worker
Este proyecto implementa un worker para Camunda 8, utilizando Node.js para procesar tareas automatizadas en un flujo de trabajo.

## Requisitos 📌 
Antes de comenzar, asegúrate de tener los siguientes requisitos instalados:

* Node.js
* npm o yarn

## Configuración 🚀 
### 1️⃣ Clona el repositorio

```
git clone https://github.com/alvarobarrosjunior/camunda-8-node-worker.git
cd camunda-8-node-worker
```

### 2️⃣ Instala las dependencias
Si estás usando npm:

```
npm install
```
Si estás usando yarn:

```
yarn install
```

## Configuración de variables de entorno 🔑
Para conectar el worker a Camunda 8, crea un archivo .env en la raíz del proyecto con la siguiente información:

```
--Modo de operación

CAMUNDA_CLIENT_MODE=saas

--Credenciales de autenticación (sustituye por los valores reales)

CAMUNDA_CLIENT_ID=TU_CLIENT_ID
CAMUNDA_CLIENT_SECRET=TU_CLIENT_SECRET

--Configuración del clúster

CAMUNDA_CLUSTER_ID=TU_CLUSTER_ID
CAMUNDA_REGION=TU_REGION
CAMUNDA_ZEEBE_ADDRESS=TU_CLUSTER_ID.TUREGION.zeebe.camunda.io:443

--URL de autenticación de Zeebe

CAMUNDA_OAUTH_URL=https://login.cloud.camunda.io/oauth/token
CAMUNDA_ZEEBE_TOKEN_AUDIENCE=zeebe.camunda.io
```

## Cómo ejecutar el proyecto ▶️ 
Después de configurar el .env, ejecuta el worker con el siguiente comando:

```
npm start
```

O con yarn:
```
yarn start
```

## Tecnologías utilizadas  🛠 
* Node.js
* TypeScript
* Camunda 8
* Zeebe Client
* dotenv (para la gestión de variables de entorno)

## Body de inicio del proceso y condiciones ✅
Para iniciar el proceso, es necesario enviar un body con el siguiente formato:

```
{
    "amount": 0, 
    "userId": 0
}
```
### Condiciones de validación:

* Si el valor es menor que 100, el proceso generará un error.
* Si el valor es mayor o igual a 100, el proceso seguirá el camino feliz.
