import mongoose, { Schema, Document } from 'mongoose';

export interface AccountBaseType {
    cardNumber: string,
    expiration: string, //format looks like --> "MMYYYY"
    pin: string, //for now stored as plaintext
    balance: number
}


export interface IAccount extends AccountBaseType, Document {}


const accountSchema = new Schema<IAccount>({
    cardNumber: {
        type: String,
        required: true,
        index: true
    },
    expiration: {
        type: String,
        required: true,
        trim: true
    },
    pin: {
        type: String,
        required: true,
        trim: true, //We also want to make sure this is a valid phone number maybe use validator
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
}, {_id: false});

export default accountSchema;