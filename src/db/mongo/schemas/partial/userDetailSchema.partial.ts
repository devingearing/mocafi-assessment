import mongoose, { Schema, Document } from 'mongoose';
export interface UserDetailType{
    firstName: string,
    lastName: string,
    phone: string,
    countryCode?: string,
}

export interface IUserDetail extends UserDetailType,Document {}

const userDetailSchema = new Schema<IUserDetail>({
    firstName: {
        type: String,
        required: true, trim: true,
    },
    lastName: {
        type: String,
        required: true, trim: true,
    },
    phone: {
        type: String,
        required: true, trim: true, //We also want to make sure this is a valid phone number maybe use validator
    },
    countryCode: {
        type: String,
        required: false, trim: true,
    },
}, {_id: false});

export default userDetailSchema;