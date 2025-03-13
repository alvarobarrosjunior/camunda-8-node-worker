import dotenv from 'dotenv';
dotenv.config();

// Exporta la configuración del cliente Zeebe utilizando variables de entorno
export const config = {
    ZEEBE_GRPC_ADDRESS: process.env.CAMUNDA_ZEEBE_ADDRESS as string, // Dirección del servidor gRPC de Zeebe
    ZEEBE_CLIENT_ID: process.env.CAMUNDA_CLIENT_ID as string, // ID del cliente para autenticación OAuth
    ZEEBE_CLIENT_SECRET: process.env.CAMUNDA_CLIENT_SECRET as string, // Secreto del cliente para autenticación OAuth
    CAMUNDA_OAUTH_URL: process.env.CAMUNDA_OAUTH_URL as string, // URL del servidor OAuth de Camunda
    CAMUNDA_SECURE_CONNECTION: true, // Indica si la conexión es segura (HTTPS)
    CAMUNDA_AUTH_STRATEGY: 'OAUTH', // Estrategia de autenticación utilizada (OAuth)
};