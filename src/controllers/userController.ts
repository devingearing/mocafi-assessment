import mongoose from 'mongoose';
import { Body, Controller, Route, Tags, Get, Post, SuccessResponse, Query } from 'tsoa';
import UserModel from '../db/mongo/models/userModel'
import {IUser} from '../db/mongo/schemas/userSchema';
import { Router } from 'express';
import UserService from '../db/mongo/services/userDBService';
import { BalanceReturn, UserCreateParams, UserReturn } from '../types/userTypes';

    @Route("users")
    @Tags("User Endpoints")
    export class UserController extends Controller{
        @Get('')
        @SuccessResponse("200", "Retrieved All Users")
        public async getAllUsers(): Promise<UserReturn[]>{
            const users = await UserService.getAll();
            return users.map(userDoc => this.toUserReturn(userDoc));
        }

        @Post('create')
        @SuccessResponse("201", "Created User")
        public async createUser(
          @Body() data: UserCreateParams
        ): Promise<UserReturn | null>{
            const newUser: IUser|null = await UserService.create(data);
            if(!newUser){
                return null;
            }
            else {
                return this.toUserReturn(newUser);
            }
        }

        @Get('balance')
        @SuccessResponse("200", "Retrieved User Balance")
        public async getUserBalance(@Query() cardNumber: string): Promise<BalanceReturn>{
            try{
                if(cardNumber){
                    let cleanedNumber = cardNumber.replace(/\s/g, "");
                    if(cleanedNumber.length === 16){
                        const user = await UserService.getByCC(cleanedNumber);
                        if(!user){
                            return {success: false, message: "Invalid Card Number"};
                        }
                        return{success: true, balance: user.account?.balance};
                    }
                    else{
                        return {success: false, message: "Invalid Card Number"};
                    }
                }
                else{
                    return {success: false, message: "No Card Number Provided"};
                }
            }
            catch(error){
                this.setStatus(500);
                return {success: false, message: "error"};
            }
        }






        //this is a helper, ideally should not be in this file
         toUserReturn(userData: IUser): UserReturn{
            const userRes: UserReturn = {
                _id: userData.id,
                user: { // Map subdocument. Ensure UserDetailBase fields are correctly assigned.
                    firstName: userData.user.firstName,
                    lastName: userData.user.lastName,
                    phone: userData.user.phone,
                }
            };
            if (userData.user.countryCode) {
                userRes.user.countryCode = userData.user.countryCode;
            }
            if (userData.account) {
                userRes.account = {
                    cardNumber: userData.account.cardNumber,
                    expiration: userData.account.expiration,
                    pin: "****",
                    balance: userData.account.balance,
                };
            }
            return userRes;
        }
    }