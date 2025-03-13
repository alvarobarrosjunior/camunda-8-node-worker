import { Worker } from './worker';
import {ErrorJobWithVariables, JOB_ACTION_ACKNOWLEDGEMENT} from '@camunda8/sdk/dist/zeebe/lib/interfaces-1.0';
import {ZeebeGrpcClient} from "@camunda8/sdk/dist/zeebe";

const MIN_PAYMENT_AMOUNT: number = 100;
const ERROR_CODE: string = 'minPago';

/**
 * Clase PaymentWorker que extiende la clase abstracta Worker.
 * Este worker es responsable de procesar tareas de pago en un flujo de trabajo.
 */
export class PaymentWorker extends Worker {

    /**
     * Constructor de la clase PaymentWorker.
     * @param client - Instancia del cliente gRPC de Zeebe.
     */
    constructor(client: ZeebeGrpcClient) {
        // Llama al constructor de la clase base Worker con el tipo de tarea 'procesarPago'.
        super(client, 'procesarPago');
    }

    /**
     * Método para procesar una tarea de pago.
     * @param job - La tarea de pago a procesar.
     * @returns Una promesa que resuelve a un JOB_ACTION_ACKNOWLEDGEMENT.
     */
    protected async handleTask(job: any): Promise<JOB_ACTION_ACKNOWLEDGEMENT> {
        try {
            console.log(`Processando o pagamento da instância: ${job.processInstanceKey}`);

            const { amount, userId } = job.variables;
            console.log(`Processando pagamento de $${amount} para o usuário ${userId}`);

            if (Number(amount) < MIN_PAYMENT_AMOUNT) {
                throw new Error(`Montante do pagamento muito baixo: $${amount}. O mínimo é $${MIN_PAYMENT_AMOUNT}.`);
            }

            await job.complete({ status: 'Pagamento aprovado' });
            return 'JOB_ACTION_ACKNOWLEDGEMENT';
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao processar o pagamento:', error.message);
                const errorJob: ErrorJobWithVariables = { variables: { errorMessage: error.message }, errorCode: ERROR_CODE };
                await job.error(errorJob);
            } else {
                console.error('Erro desconhecido:', error);
                const errorJob: ErrorJobWithVariables = { variables: { errorMessage: 'Erro desconhecido' }, errorCode: ERROR_CODE };
                await job.error(errorJob);
            }
            return 'JOB_ACTION_ACKNOWLEDGEMENT';
        }
    }
}