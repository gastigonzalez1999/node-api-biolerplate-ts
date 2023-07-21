import Category from "../entities/category.entity";
import Product from "../entities/product..entity";
import User from "../entities/user.entity";

export default class SearchService {
  public searchUsers = async (term: string) => {
    try {
      const regex = new RegExp(term, 'i');

      const users = await User.find({ name: regex, status: true });

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public searchCategories = async (term: string) => {
    try {
      const regex = new RegExp(term, 'i');
      const categories = await Category.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }],
      });

      return categories;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public searchProducts = async (term: string) => {
    try {
      const regex = new RegExp(term, 'i');
      const products = await Product.find({ name: regex, status: true }).populate('category', 'name');
      
      return products;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public search = async (collection: string, term: string) => {
    try {
      switch (collection) {
        case 'users':
            this.searchUsers(term);
            break;
        case 'category':
            this.searchCategories(term);
            break;
        case 'products':
            this.searchProducts(term);
            break;
    
        default:
          throw new Error('Something went wrong with search');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}