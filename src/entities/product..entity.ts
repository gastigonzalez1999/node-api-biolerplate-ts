import { Schema, model, SchemaTypes  } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  status: boolean;
  user: Schema.Types.ObjectId;
  description: string;
  available: boolean;
  img: string;
}

const ProductSchema = new Schema({
    name: { 
      type: String, 
      required: [true, 'The name is required'] 
    },
    price: { 
      type: Number, 
      default: 0 
    },
    status: { 
      type: Boolean, 
      default: true, 
      required: [true, 'Status is required'] 
    },
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    category: { 
      type: SchemaTypes.ObjectId, 
      ref: 'Category', 
      required: true 
    },
    description: { 
      type: String 
    },
    available: { 
      type: Boolean, 
      default: true 
    },
    img: { 
      type: String 
    },
});

ProductSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    
    return data;
}

const Product = model<IProduct>('Product', ProductSchema)
export default Product;