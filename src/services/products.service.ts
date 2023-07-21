import Product from "../entities/product..entity";

import { CreateProduct, ProductsQuery, UpdateProduct } from "../interfaces/products.interface";

export default class ProductsService {
  public getProducts = async (queryRequest: ProductsQuery) => {
    try {
      const queryData = { ...queryRequest };
      const query = { status: true };

      const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
          .populate('user', 'name')
          .populate('category', 'name')
          .skip(Number(queryData.from))
          .limit(Number(queryData.limit)),
      ]);

      return { total, products };
    } catch (error) {
      
    }
  };

  public getProduct = async (id: string) => {
    try {
      const productById = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

      if (!productById)
        throw new Error(`There is no existing product with id: ${id}`);
      
      return productById;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public createProduct = async (createProductRequest: CreateProduct) => {
    try {
      const { status, user_id, ...body } = createProductRequest;
      const existentProduct = await Product.findOne({ name: body.name});

      if (existentProduct)
        throw new Error(`This product ${existentProduct.name} already exist in the db`);
      
      const data = {
        ...body,
        user: user_id,
      };

      const product = new Product(data);
      await product.save();

      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public updateProduct = async (updateProductProductRequest: UpdateProduct) => {
    try {
      const { status, user_id, id, ...body } = updateProductProductRequest;
      const updateProduct = await Product.findByIdAndUpdate(id, body, { new: true });

      if (!updateProduct)
        throw new Error(`This category does not exist in the db`);

      await updateProduct.save();
      return updateProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public deleteProduct = async (id: string) => {
    try {
      const deleteProduct = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
      
      if (!deleteProduct)
        throw new Error('This product does not exist in the db');

      return deleteProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
