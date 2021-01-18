import { blue } from "chalk";
import GlobalData from "@Core/Global/global-data";
import GlobalMethods from "@Core/Global/global-methods";
import DatabaseDriverInterface from "@Lib/interfaces/core/database-driver-interface";
import IDBModel from "@Lib/interfaces/core/db-model-interface";
import { DatabaseConfigType } from "@Lib/types/config/database-config-type";
import * as Mongoose from "mongoose";

/**
 * MongoDB driver
 */
export default class MongoDbDriver implements DatabaseDriverInterface {
    private _engine: Mongoose.Mongoose = new Mongoose.Mongoose();

    /**
     * Create driver factory
     */
    public static createDriver(): MongoDbDriver {
        return new MongoDbDriver();
    }

    /**
     * Getter: _engine
     */
    public get engine(): Mongoose.Mongoose {
        return this._engine;
    }

    /**
     * Get the engine
     */
    public getEngine(): Mongoose.Mongoose {
        return this.engine;
    }

    /**
     * Connect to mongodb
     * @param config any Config
     */
    public async connect(config: DatabaseConfigType): Promise<void> {
        const connStr: string = this.getConnectionUrl(config);

        this._engine = await Mongoose.connect(
            connStr,
            config.dbConfig as Mongoose.ConnectOptions
        );

        GlobalData.logger.info(`
        MongoDB driver connected successfully
        URI: ${connStr}
        Config: \n${blue(JSON.stringify(config, null, 2))}
        `);

        /* Load modesl */
        await this.loadModels();
    }

    /**
     * DisConnect from mongodb
     */
    public async disconnect(): Promise<void> {
        await this.engine.disconnect();
    }

    /**
     * Get a model
     * @param name string Model name
     */
    public model(name: string): Mongoose.Model<Mongoose.Document> {
        return this.engine.model(name);
    }

    /**
     * Load models
     */
    private async loadModels(): Promise<void> {
        const modelsPath = GlobalMethods.rPath(
            __dirname,
            "../../../backend/models/**/*"
        );
        const files = await GlobalMethods.loadFiles(modelsPath, {});

        /* Load models */
        for (let i: number = 0; i < files.length; ++i) {
            const Model: any = await GlobalMethods.loadModule(files[i]);
            const model = new Model() as IDBModel;

            /* setup model */
            model.setup(this.engine);
        }
    }

    /**
     * Get connection url
     * @param config DatabaseConfigType Confing object
     */
    private getConnectionUrl(config: DatabaseConfigType): string {
        let connectionString: string = "";

        /* Format: mongodb://host:port/db */
        if (config.host) {
            connectionString = `mongodb://${config.host}`;

            if (config.port) {
                connectionString += `:${config.port}`;
            }

            if (config.name) {
                connectionString += `/${config.name}`;
            }
        }

        return connectionString;
    }
}
