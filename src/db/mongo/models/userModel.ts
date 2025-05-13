import mongoose from 'mongoose';
import userSchema, {IUser} from '../schemas/userSchema';
export default mongoose.model<IUser>('User', userSchema)