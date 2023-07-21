import bcryptjs from 'bcryptjs';

import { UserLogin, googleSignIn } from '../interfaces/auth.interface';
import User from '../entities/user.entity';
import { generateJwt } from '../helpers/generate-jwt';
import { googleVerify } from '../helpers/google-verify';

export default class AuthService {
  public login = async (loginRequest: UserLogin): Promise<boolean> => {
    try {
      const user = await User.findOne({ email: loginRequest.email });

      if (!user)
        throw new Error('User/password are not correct - email');

      if (!user.status)
        throw new Error('User/password are not correct - status: false');

      const validatePassword = bcryptjs.compareSync(loginRequest.password, user.password);

      if (!validatePassword)
        throw new Error('User/password are not correct - password');

      const token = await generateJwt(user.id);
      
      return true;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };

  public googleSignIn = async (googleSingInRequest: googleSignIn): Promise<string> => {
    try {
      const googleUser = await googleVerify(googleSingInRequest.id_token);
      let user = await User.findOne({email : googleUser.email});

      if (!user) {
        const data = {
          name: googleUser.name,
          email: googleUser.email,
          password: '',
          img: googleUser.picture,
          google: true,
        };

        user = new User(data);
        await user.save();
      }

      if (!user.status)
        throw new Error('User/password are not correct - status: false');

      const token = await generateJwt(user.id);

      return token;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
}
