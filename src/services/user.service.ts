import User from "../entities/user.entity";
import { CreateUser, UpdateUser, UserQuery } from "../interfaces/user.interface";

export default class UserService {
  public getUsers = async (queryRequest: UserQuery) => {
    try {
      const queryData = { ...queryRequest };
      const query = { status: true };

      const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
          .skip(Number(queryData.from))
          .limit(Number(queryData.limit)),
      ]);

      return { total, users };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public getUser = async (id: string) => {
    try {
      const userById = await User.findById(id)
        .populate('user', 'name');

      if (!userById)
        throw new Error(`There is no existing user with ${id}`);

      return userById;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public createUser = async (createUserRequest: CreateUser) => {
    try {
      const email = createUserRequest.email;
      const existentUser = await User.findOne({ email: email });

      if (existentUser)
        throw new Error(`There is already an existing user with email: ${email}`);

      const data = createUserRequest;
      const user = new User(data);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public updateUser = async (updateUserRequest: UpdateUser) => {
    try {
      const userId = updateUserRequest.id;
      const { status, ...data } = updateUserRequest;

      const updateUser = await User.findByIdAndUpdate(userId, data, { new: true });

      if (!updateUser)
        throw new Error(`This user does not exist in the db`);

      await updateUser.save();
      return updateUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public deleteUser = async (id: string) => {
    try {
      const deleteUser = await User.findByIdAndUpdate(id, { status: false }, { new: true });
      
      if (!deleteUser)
        throw new Error('This user does not exist in the db');

      return deleteUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}