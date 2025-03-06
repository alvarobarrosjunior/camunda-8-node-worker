// Importamos la librería oficial de Camunda 8 SDK para interactuar con Zeebe
import { Camunda8 } from '@camunda8/sdk'

// Importamos dotenv para cargar las variables de entorno desde un archivo .env
import dotenv from 'dotenv';

import {ErrorJobWithVariables} from "@camunda8/sdk/dist/zeebe/lib/interfaces-1.0";
import {ZeebeGrpcClient} from "@camunda8/sdk/dist/zeebe";

dotenv.config(); // Cargamos las variables de entorno

// Creamos una instancia del cliente de Camunda 8 con la configuración de autenticación
const C8 = new Camunda8({
    ZEEBE_GRPC_ADDRESS: process.env.CAMUNDA_ZEEBE_ADDRESS, // Dirección del servidor Zeebe
    ZEEBE_CLIENT_ID: process.env.CAMUNDA_CLIENT_ID, // ID del cliente para autenticación OAuth
    ZEEBE_CLIENT_SECRET: process.env.CAMUNDA_CLIENT_SECRET, // Secreto del cliente OAuth
    CAMUNDA_AUTH_STRATEGY: 'OAUTH', // Estrategia de autenticación: OAuth
    CAMUNDA_OAUTH_URL: process.env.CAMUNDA_OAUTH_URL, // URL del servidor de autenticación OAuth
    CAMUNDA_SECURE_CONNECTION: true, // Conexión segura habilitada
});

// Obtenemos el cliente gRPC de Zeebe para interactuar con el motor de workflow
const client: ZeebeGrpcClient = C8.getZeebeGrpcApiClient();

console.log('Service Task Worker comenzó...'); // Mensaje indicando que el worker ha iniciado

// Creamos un worker (trabajador) para procesar tareas del tipo "procesarPago"
client.createWorker({
    taskType: 'procesarPago', // Task Definition Job Type en BPMN que este worker manejará
    taskHandler: async (job) => { // Función que maneja la ejecución de la tarea
        try {
            console.log(`Procesando el pago de la instancia: ${job.processInstanceKey}`);

            // Extraemos las variables enviadas al worker desde el proceso BPMN
            const { amount, userId } = job.variables;
            console.log(`Procesando pago de $${amount} para el usuario ${userId}`);

            // Validamos que el monto del pago sea mayor o igual a 100
            if (Number(amount) < 100) {
                throw new Error(`Monto del pago demasiado bajo: $${amount}. El mínimo es $100.`);
            }

            // Si todo está correcto, completamos la tarea con éxito
            return job.complete({ status: 'Pago aprobado' });
        } catch (error) {
            // Manejo de errores: verificamos si el error es una instancia de Error
            if (error instanceof Error) {
                console.error('Error al procesar el pago:', error.message);
                const errorJob: ErrorJobWithVariables = {variables: {errorMessage: error.message}, errorCode: "minPago"};
                return job.error(errorJob); // Retornamos el error con el mensaje específico
            } else {
                console.error('Error desconocido:', error);
                const errorJob: ErrorJobWithVariables = {variables: {errorMessage: 'Error desconocido'}, errorCode: "minPago"};
                return job.error(errorJob); // Retornamos un mensaje genérico en caso de error desconocido
            }
        }
    },
});

