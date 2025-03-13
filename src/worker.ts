import { Camunda8 } from '@camunda8/sdk';
import { config } from './config';
import { ErrorJobWithVariables } from '@camunda8/sdk/dist/zeebe/lib/interfaces-1.0';
import { ZeebeGrpcClient } from '@camunda8/sdk/dist/zeebe';

// Crea una instancia del cliente Camunda8 utilizando la configuración exportada
const C8 = new Camunda8({
    ZEEBE_GRPC_ADDRESS: config.ZEEBE_GRPC_ADDRESS, // Dirección del servidor gRPC de Zeebe
    ZEEBE_CLIENT_ID: config.ZEEBE_CLIENT_ID, // ID del cliente para autenticación OAuth
    ZEEBE_CLIENT_SECRET: config.ZEEBE_CLIENT_SECRET, // Secreto del cliente para autenticación OAuth
    CAMUNDA_AUTH_STRATEGY: config.CAMUNDA_AUTH_STRATEGY, // Estrategia de autenticación utilizada (OAuth)
    CAMUNDA_OAUTH_URL: config.CAMUNDA_OAUTH_URL, // URL del servidor OAuth de Camunda
    CAMUNDA_SECURE_CONNECTION: config.CAMUNDA_SECURE_CONNECTION, // Indica si la conexión es segura (HTTPS)
});

// Obtiene el cliente gRPC de Zeebe a partir de la instancia de Camunda8
const client: ZeebeGrpcClient = C8.getZeebeGrpcApiClient();

console.log('Service Task Worker comenzó...'); // Mensaje de inicio del worker

// Define el tipo de tarea que el worker va a procesar
const TASK_TYPE: string = 'procesarPago';
// Define el monto mínimo de pago permitido
const MIN_PAYMENT_AMOUNT: number = 100;
// Define el código de error para pagos menores al mínimo permitido
const ERROR_CODE: string = 'minPago';

// Crea un worker que procesa tareas del tipo definido
client.createWorker({
    taskType: TASK_TYPE, // Tipo de tarea que el worker va a procesar
    taskHandler: async (job) => { // Función que maneja la tarea
        try {
            console.log(`Processando o pagamento da instância: ${job.processInstanceKey}`); // Log del inicio del procesamiento

            // Extrae las variables del trabajo
            const { amount, userId } = job.variables;
            console.log(`Processando pagamento de $${amount} para o usuário ${userId}`); // Log del monto y usuario

            // Verifica si el monto del pago es menor al mínimo permitido
            if (Number(amount) < MIN_PAYMENT_AMOUNT) {
                throw new Error(`Montante do pagamento muito baixo: $${amount}. O mínimo é $${MIN_PAYMENT_AMOUNT}.`); // Lanza un error si el monto es muy bajo
            }

            // Completa el trabajo con un estado de aprobación
            return job.complete({ status: 'Pagamento aprovado' });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao processar o pagamento:', error.message); // Log del error
                // Crea un objeto de error con detalles del error y el código de error
                const errorJob: ErrorJobWithVariables = { variables: { errorMessage: error.message }, errorCode: ERROR_CODE };
                return job.error(errorJob); // Retorna el error del trabajo
            } else {
                console.error('Erro desconhecido:', error); // Log de un error desconocido
                // Crea un objeto de error con un mensaje de error desconocido y el código de error
                const errorJob: ErrorJobWithVariables = { variables: { errorMessage: 'Erro desconhecido' }, errorCode: ERROR_CODE };
                return job.error(errorJob); // Retorna el error del trabajo
            }
        }
    },
});