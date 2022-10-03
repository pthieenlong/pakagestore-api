import mongoose, { Schema } from "mongoose";
interface IUser {
    role: string,
    username: string,
    password: string,
    currency: number,
    fullname: string,
    avatar: string,
    token: string,
}
const userSchema: Schema = new Schema<IUser>({
    role: {
        type: String,
        default: "User",
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    currency: {
        type: Number,
        default: 0,
    },
    fullname: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    token: {
        type: String, 
        default: "",
    }
});
export default mongoose.model("User", userSchema);