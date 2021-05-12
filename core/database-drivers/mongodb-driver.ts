import {
    config as DatabaseConfig,
    DatabaseConfigType,
} from "@CONFIGS/core/database";
import { CoreModule } from "@CORE/modules/core-module-interface";
import { IDatabaseDriver } from "@CORE/modules/database-module";
import Mongoose, { ConnectOptions } from "mongoose";

/**
 * MongoDB Driver module
 */
export class MongoDBDriver extends CoreModule implements IDatabaseDriver {
    private _db?: Mongoose.Mongoose;

    /**
     * Get db data
     */
    public get db(): Mongoose.Mongoose {
        return this._db as Mongoose.Mongoose;
    }

    /**
     * Ctr
     * @param logger Console
     */
    constructor(logger: Console) {
        super(logger);
    }

    /**
     * Register method
     * @param payload any
     */
    public async register(payload?: any): Promise<any> {
        this.logger.log("Register Module: MongoDB-Driver");

        return this;
    }

    /**
     * Boot method
     * @param payload any
     */
    public async boot(payload?: any): Promise<any> {
        /* Read config file */
        const config = DatabaseConfig();

        /* Try to connect */
        await this.connect(config);

        this.logger.log("DatabaseDriver: MongoDB-Driver");
        return this;
    }

    /**
     * Get engine
     */
    public getEngine(): MongoDBDriver {
        return this;
    }

    /**
     * Try to connect
     * @param config {DatabaseConfigType} database config
     */
    public async connect(config: DatabaseConfigType): Promise<void> {
        /* Prepare connection string */
        const connectionString: string = this.prepareConnectionString(config);
        const connectionOptions: ConnectOptions = this.prepareConnectionOptions(
            config
        );

        /* Try to connect */
        try {
            this._db = await Mongoose.connect(
                connectionString,
                connectionOptions
            );

            this.logger.log(`Database connection string
                ${connectionString}
                ${JSON.stringify(connectionOptions, null, 2)}
            `);
        } catch (err) {
            this.logger.error("Connection to database failed");
            this.logger.error(err);

            throw err;
        }
    }

    /**
     * Try to connect
     * @param config {DatabaseConfigType} database config
     */
    public async close(): Promise<void> {
        await this.db.disconnect();
    }

    /**
     * Prepare connection string
     * @param config {DatabaseConfigType} database config
     */
    public prepareConnectionString(config: DatabaseConfigType): string {
        let connectionString: string = "mongodb://";

        if (config.mongoose?.connection) {
            let dbPath: string = `${config.mongoose.connection.dbHost}:${config.mongoose.connection.dbPort}`;

            connectionString += dbPath;
            if (config.mongoose.connection.dbName) {
                connectionString += `/${config.mongoose.connection.dbName}`;
            }
        }

        return connectionString;
    }

    /**
     * Prepare connection options
     * @param config {DatabaseConfigType} database config
     */
    public prepareConnectionOptions(
        config: DatabaseConfigType
    ): Mongoose.ConnectOptions {
        let options: Mongoose.ConnectOptions = config.mongoose?.options || {};

        if (config.mongoose?.connection?.dbUser) {
            options.auth = {
                user: config.mongoose?.connection.dbUser,
                password: config.mongoose?.connection.dbPassword || "",
            };
        }

        return options;
    }
}
