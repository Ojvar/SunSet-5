import {
    config as DataBaseConfig,
    DatabaseConfigType,
    DatabaseDriverType,
} from "@CONFIGS/core/database";
import { MongoDBDriver } from "@CORE/database-drivers/mongodb-driver";
import { GlobalData } from "@CORE/helpers/global-data-helper";
import { CoreModule } from "@CORE/modules/core-module-interface";

/**
 * Database module
 */
export default class DatabaseModule extends CoreModule {
    /**
     * Ctr
     * @param logger {Console} Logger object
     */
    constructor(logger: Console) {
        super(logger);
    }

    /**
     * Register method
     * @param payload any
     */
    public async register(payload?: any): Promise<any> {
        this.logger.log("Register Module: Database");

        return this;
    }

    /**
     * Boot method
     * @param payload {any} payload
     */
    public async boot(payload?: any): Promise<any> {
        /* Read config file */
        const config = DataBaseConfig();
        await this.setupDriver(payload, config);

        this.logger.log("Boot Module: Database");
        return this;
    }

    /**
     * Setup driver
     * @param config {DatabaseConfigType} database config
     */
    public async setupDriver(payload: any, config: DatabaseConfigType) {
        const driverType: DatabaseDriverType = config.driver;

        switch (driverType) {
            case "mongodb":
                const driver: MongoDBDriver = new MongoDBDriver(this.logger);
                await driver.register(payload);
                await driver.boot(payload);

                GlobalData.db = driver;
                break;

            case "none":
            default:
                this.logger.info("No Database driver has been selected");
                break;
        }
    }
}

/**
 * Database driver interface
 */
export interface IDatabaseDriver {
    /**
     * Get engine
     */
    getEngine(): any;

    /**
     * Connect to databaes
     */
    connect(payload?: any): Promise<any>;

    /**
     * Close databae connection
     */
    close(payload?: any): Promise<any>;
}

/**
 * Database entity model
 */
export interface IDatabaseEntityModel {
    /**
     * Get model
     */
    getModel(): any;

    /**
     * Get model name
     */
    getName(): string;

    /**
     * Get model dbName
     */
    getDbName(): string;

    /**
     * Setup method
     * @param payload {any} Payload data
     */
    setup(payload?: any): Promise<any>;
}
