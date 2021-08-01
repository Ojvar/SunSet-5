import { Document, Model, model, Schema } from "mongoose";

/**
 * UserDocument interface
 */
export interface IUserModelType extends Document {
    activated_at: Date;
    created_at: Date;
    email: string;
    nick_name: string;
    pwd?: string;
    updated_at: Date;
    profile: {
        google?: any;
    };
}

/**
 * User Schema
 */
export const UserSchema = new Schema<IUserDocument, IUserModel>(
    {
        email: {
            required: true,
            trim: true,
            type: String,
            unique: true,
        },

        nick_name: {
            required: true,
            trim: true,
            type: String,
        },

        pwd: String,

        activated_at: {
            required: false,
            type: Date,
        },

        profile: {
            _id: false,
            required: false,

            google: {
                _id: false,
                required: false,
                type: Object,
            },
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

/* Pre middleware */
UserSchema.pre("save", function(next: Function) {
    this.email = this.email ? this.email.toLowerCase() : this.email;
    next();
});

/* Register by google profile */
UserSchema.statics.registerByGoogleProfile = async function(
    this: IUserModel,
    profile: any
): Promise<IUserDocument> {
    return this.create({
        email: profile.emails[0].value,
        nick_name: profile.displayName,
        profile: {
            google: profile,
        },
    });
};

/* Register by user data profile */
UserSchema.statics.registerByUserData = async function(
    this: IUserModel,
    profile: any
): Promise<IUserDocument> {
    return this.create({
        email: profile.email,
        nick_name: profile.nickName,
        pwd: profile.pwd,
    });
};

/**
 * UserModel interface
 */
export interface IUserModel extends Model<IUserDocument> {
    registerByGoogleProfile(profile: any): Promise<IUserDocument>;
    registerByUserData(profile: any): Promise<IUserDocument>;
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
