import {
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
  SchemaTimestampsConfig,
  Mongoose,
  Types,
  Document,
} from "mongoose";
import { yellow } from "chalk";
import IDBModel from "@Lib/interfaces/core/db-model-interface";
import GlobalData from "@Core/Global/global-data";

/**
 * User model interface
 */
export interface IUserModel extends Document {
  name: string;
  pwd: string;
  activated_at: Date;
  created_at: Date;
  created_by?: Types.ObjectId;
}

/**
 * UserModel class
 */
export default class UserModel implements IDBModel {
  /**
   * Get model name
   */
  public getName(): string {
    return "User";
  }

  /**
   * Get database model name
   */
  public getDbName(): string | undefined {
    return "users";
  }

  /**
   *
   * @param dbEngine any DbEngine
   */
  public async setup(dbEngine: Mongoose): Promise<Model<IUserModel>> {
    /* Create model */
    const model: Model<IUserModel> = dbEngine.model<IUserModel>(
      this.getName(),
      this.getSchema(),
      this.getDbName()
    );

    /* Log */
    GlobalData.logger.info(
      `Model ${yellow(this.getName())} loaded successfully`
    );

    return model;
  }

  /**
   * Get model schema
   */
  public getSchema(): Schema {
    const schemaDef: SchemaDefinition = {
      name: {
        type: String,
        required: true,
        trimed: true,
        unique: true,
        index: true,
      },

      pwd: {
        type: String,
        required: true,
      },

      activated_at: {
        type: Date,
      },
    };

    /* Define schmea */
    const schema: Schema = new Schema(schemaDef, {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      } as SchemaTimestampsConfig,
    } as SchemaOptions);

    /* Return schema */
    return schema;
  }
}
