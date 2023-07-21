import Category from "../entities/category.entity";
import Product from "../entities/product..entity";
import Role from "../entities/role.entity";
import User from "../entities/user.entity";

export const categoryExists = async (id: string) => {
  const categoryExist = await Category.findById({ id: id });

  if (!categoryExist) {
      throw new Error(`The category Id ${id} does not exist`);
  }
};

export const emailExist = async (email: string) => {
  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
      throw new Error(`The email ${email} is already registered`);
  }
}

export const userIdExist = async (id: string) => {
  const idExist = await User.findById({ id: id });

  if (!idExist) {
      throw new Error(`The user Id ${id} does not exist`);
  }
}

export const isValidRole = async (role = '') => {
  const roleExist = await Role.findOne({role: role});

  if (!roleExist) {
      throw new Error(`The role ${role} is not registered in DB`);
  }
}

export const productExists = async (id: string) => {
  const idExist = await Product.findById({ id: id });

  if (!idExist) {
      throw new Error(`The product Id ${id} does not exist`);
  }
};

export const allowedCollections = (collection: string, collections: string[] = []) => {
  const included = collections.includes(collection);

  if (!included) {
      throw new Error(`The collecion ${collection} is not allowd`);
  }
  return true;
};
