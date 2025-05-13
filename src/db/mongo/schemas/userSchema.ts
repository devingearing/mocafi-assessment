import mongoose, { Schema, Document } from 'mongoose';
import accountSchema, {IAccount} from './partial/accountSchema.partial';
import userDetailSchema, {IUserDetail} from './partial/userDetailSchema.partial';

export interface IUser extends Document {
    user: IUserDetail,
    account?: IAccount
}

const userSchema = new Schema<IUser>({
    user: {
        type: userDetailSchema,
        required: true
    },
    account: {
        type: accountSchema,
        required: false
    },
});

export default userSchema;