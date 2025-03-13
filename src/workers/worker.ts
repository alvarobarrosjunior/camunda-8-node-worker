import { ZeebeGrpcClient } from '@camunda8/sdk/dist/zeebe';
import {JOB_ACTION_ACKNOWLEDGEMENT, ZBWorkerTaskHandler} from "@camunda8/sdk/dist/zeebe/lib/interfaces-1.0";

/**
 * Clase abstracta Worker que sirve como base para la creación de workers específicos.
 * Un worker es responsable de procesar tareas automatizadas en un flujo de trabajo.
 */
export abstract class Worker {
    // Cliente gRPC de Zeebe utilizado para la comunicación con el servidor Zeebe.
    protected client: ZeebeGrpcClient;
    // Tipo de tarea que este worker procesará.
    protected taskType: string;

    /**
     * Constructor de la clase Worker.
     * @param client - Instancia del cliente gRPC de Zeebe.
     * @param taskType - Tipo de tarea que este worker procesará.
     */
    constructor(client: ZeebeGrpcClient, taskType: string) {
        this.client = client;
        this.taskType = taskType;
    }

    /**
     * Método para iniciar el worker.
     * Crea un worker en el cliente Zeebe que procesará tareas del tipo especificado.
     */
    public start() {
        this.client.createWorker({
            taskType: this.taskType,
            taskHandler: this.handleTask.bind(this) as ZBWorkerTaskHandler<any, any, any>,
        });
    }

    /**
     * Método abstracto que debe ser implementado por las subclases.
     * Este método será llamado para procesar una tarea.
     * @param job - La tarea a procesar.
     * @returns Una promesa que resuelve a un JobActionAcknowledgement.
     */
    protected abstract handleTask(job: any): Promise<JOB_ACTION_ACKNOWLEDGEMENT>;
}