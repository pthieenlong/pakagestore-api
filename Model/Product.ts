import mongoose, { Schema } from "mongoose";

interface IProduct {
  name: string,
  price: number,
  image: string,
  desc: string,
  cates: string[],
}
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String, 
  },
  desc: {
    type: String,
  },
  cates: {
    type: [
      {
        name: String,
      }
    ]
  }
});
export default mongoose.model("Product", productSchema);