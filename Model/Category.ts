import mongoose, { Schema } from "mongoose";

interface ICategory {
    name: string,
}
const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("Category", categorySchema);