import GlobalMethods from "../global/global-methods";
import BaseModule from "./base-module";
import { DbEngineEnum } from "@Lib/enums/core/db-engine-enum";
import { ICoreModule } from "@Lib/interfaces/core/core-module-interface";
import IDatabaseDriver from "@Lib/interfaces/core/database-driver-interface";
import { DatabaseConfigType } from "@Lib/types/config/database-config-type";
import MongoDbDriver from "@Core/Helpers/db-drivers/mongo-db-driver";
import { DEFAULT_ECDH_CURVE } from "tls";

/**
 * DatabaseModule class
 */
export default class DatabaseModule extends BaseModule implements ICoreModule {
  private _engine?: IDatabaseDriver = undefined;

  /**
   * DatabaseModule factory
   */
  public static createModule(): DatabaseModule {
    return new DatabaseModule();
  }

  /**
   * Getter: _engine
   */
  public get engine(): IDatabaseDriver {
    if (undefined == this._engine) {
      throw new Error("Engine is undefined");
    }

    return this._engine as IDatabaseDriver;
  }

  /**
   * Get module name
   */
  public getModuleName(): string {
    return "Database";
  }

  /**
   * Boot method
   * @param payload object Payload object
   */
  public async boot(payload?: any): Promise<void> {
    await this.setupDriver();
  }

  /**
   * Setup driver
   */
  public async setupDriver(): Promise<void> {
    /* Read config data */
    const dbConfig: DatabaseConfigType = await GlobalMethods.config<
      DatabaseConfigType
    >("core/database");

    /* Select proper engine */
    switch (<DbEngineEnum>dbConfig.driver) {
      case DbEngineEnum.MONGODB:
        this._engine = await this.setupMongoDriver(dbConfig);
        break;
    }
  }

  /**
   * Setup a mongo driver
   * @param config DatabaseConfigType Database config
   */
  private async setupMongoDriver(
    config: DatabaseConfigType
  ): Promise<IDatabaseDriver> {
    const driver: MongoDbDriver = MongoDbDriver.createDriver();

    await driver.connect(config);

    return driver;
  }
}
