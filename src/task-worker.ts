import { Camunda8 } from '@camunda8/sdk';
import { config } from './config';
import { PaymentWorker } from './workers/payment-worker';

// Crea una instancia del cliente Camunda8 utilizando la configuración exportada
const C8 = new Camunda8({
    ZEEBE_GRPC_ADDRESS: config.ZEEBE_GRPC_ADDRESS,
    ZEEBE_CLIENT_ID: config.ZEEBE_CLIENT_ID,
    ZEEBE_CLIENT_SECRET: config.ZEEBE_CLIENT_SECRET,
    CAMUNDA_AUTH_STRATEGY: config.CAMUNDA_AUTH_STRATEGY,
    CAMUNDA_OAUTH_URL: config.CAMUNDA_OAUTH_URL,
    CAMUNDA_SECURE_CONNECTION: config.CAMUNDA_SECURE_CONNECTION,
});

// Obtiene el cliente gRPC de Zeebe a partir de la instancia de Camunda8
const client = C8.getZeebeGrpcApiClient();

console.log('Service Task Worker comenzó...');

// Inicia el worker de pago
const paymentWorker = new PaymentWorker(client);
paymentWorker.start();