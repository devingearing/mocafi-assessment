import userModel from '../models/userModel';
import {IUser} from '../schemas/userSchema';
import { UserCreateParams } from '../../../types/userTypes';

 class userService{
    async getAll(): Promise<IUser[]>{
        //want to add pagination
        return userModel.find().exec();
    }

    async getById(userId: string): Promise<IUser | null>{
        return userModel.findById(userId).exec();
    }

    async getByCC(cc: string): Promise<IUser | null>{
        //Use algo to check if valid CC
        return userModel.findOne({'account.cardNumber': cc}).exec();
    }

    async create(userData: UserCreateParams): Promise<IUser | null>{
        const newUser = new userModel(userData);
        console.log(newUser);
        return await newUser.save();
    }


}

const UserService = new userService();
 export default UserService;