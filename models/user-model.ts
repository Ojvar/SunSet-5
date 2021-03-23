import { Document, Model, Schema, model } from "mongoose";

/**
 * UserDocument interface
 */
export interface IUserModelType {
    activated_at: Date;
    created_at: Date;
    email: string;
    nick_name: string;
    pwd?: string;
    updated_at: Date;
}

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

        pwd: String,

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

/* Register by google profile */
UserSchema.statics.registerByGoogleProfile = async function(
    this: IUserModel,
    profile: any
): Promise<IUserDocument> {
    return this.create({
        nick_name: profile.display_name,
        profile: {
            google: profile,
        },
    });
};

/**
 * UserModel interface
 */
export interface IUserModel extends Model<IUserDocument> {
    registerByGoogleProfile(profile: any): Promise<IUserDocument>;
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
