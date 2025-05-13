import {UserDetailType} from '../db/mongo/schemas/partial/userDetailSchema.partial';
import {AccountBaseType} from '../db/mongo/schemas/partial/accountSchema.partial';

export interface UserCreateParams{
    user: UserDetailType,
    account?: AccountBaseType
}

export interface BalanceReturn{
    success: boolean;
    balance?: number;
    message?: string;
}

export interface UserReturn extends UserCreateParams{
    _id: string;
}

// export interface AccountParams{
//     cardNumber
// }