import Category from '../entities/category.entity';
import { CategoriesQuery, CreateCategory, UpdateCategory } from '../interfaces/categories.interface';

export default class CategoriesService {
  public getCategories = async (queryRequest: CategoriesQuery) => {
    try {
      const queryData = { ...queryRequest };
      const query = { status: true };

      const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
          .populate('user', 'name')
          .skip(Number(queryData.from))
          .limit(Number(queryData.limit)),
      ]);

      return { total, categories };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public getCategory = async (id: string) => {
    try {
      const categoryById = await Category.findById(id)
        .populate('user', 'name');
      
      if (!categoryById)
        throw new Error(`There is no existing user with id: ${id}`);
      
      return categoryById;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public createCategory = async (createCategoryRequest: CreateCategory) => {
    try {
      const name = createCategoryRequest.name;
      const existentCategory = await Category.findOne({ name });

      if (existentCategory)
        throw new Error(`There is already an existing user with email: ${name}`);

      const data = {
        name,
        userId: createCategoryRequest.user_id,
      }

      const category = new Category(data);

      return category;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public updateCategory = async (updateCategoryRequest: UpdateCategory) => {
    try {
      const categoryId = updateCategoryRequest.category_id;
      const { status, user_id, ...data} = updateCategoryRequest;

      const updateCategory = await Category.findByIdAndUpdate(categoryId, data, { new: true });

      if (!updateCategory) {
        throw new Error(`This category does not exist in the db`);
      }

      await updateCategory.save();
      return updateCategory;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public deleteCategory = async (id: string) => {
    try {
      const deleteCategory = await Category.findByIdAndUpdate(id, { status: false }, { new : true });

      if (!deleteCategory)
        throw new Error('This category does not exist in the db');

      return deleteCategory;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
