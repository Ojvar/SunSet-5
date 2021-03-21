/**
 * ICore module
 */
export interface ICoreModule {
    register(payload?: any): Promise<any>;
    boot(payload?: any): Promise<any>;
}

/**
 * Core Module
 */
export abstract class CoreModule implements ICoreModule {
    protected logger: Console = console;

    /**
     * Ctr
     * @param logger Console
     */
    constructor(logger: Console) {
        this.logger = logger;
    }

    abstract register(payload?: any): Promise<any>;
    abstract boot(payload?: any): Promise<any>;
}
