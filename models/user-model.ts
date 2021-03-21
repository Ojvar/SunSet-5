import { Document, Model, Schema, model } from "mongoose";

/**
 * User Schema
 */
export const UserSchema = new Schema<IUserDocument, IUserModel>(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        nick_name: {
            type: String,
            required: true,
            trim: true,
        },

        pwd: {
            type: String,
            required: true,
        },

        activated_at: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

/**
 * UserModel interface
 */
export interface IUserModel extends Model<IUserDocument> {
    registerByGoogleProfile(profile: any): Promise<IUserDocument>;
}

/**
 * UserDocument interface
 */
export interface IUserModelType {
    activated_at: Date;
    created_at: Date;
    email: string;
    nick_name: string;
    pwd: string;
    updated_at: Date;
}

/**
 * UserBase document
 */
interface IUserBaseDocument extends IUserModelType, Document {}

/**
 * User Document
 */
export interface IUserDocument extends IUserBaseDocument {}

/**
 * Export default
 */
export default model<IUserDocument, IUserModel>("User", UserSchema, "users");
