import fs from 'fs';
import path from "path";
import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from "express-fileupload";
import cloudinary from 'cloudinary';

import User from "../entities/user.entity";
import Product from "../entities/product..entity";
//cloudinary.v2.config(process.env.CLOUDINARY_URL);


interface ValidExtensions {
  [key: string]: string;
}

export default class UploadsService {
  private upload: multer.Multer;

  constructor() {
    this.upload = multer();
  }

  public loadFile = async (req: Request) => {
    try {
      if (!req.files) {
        throw new Error("No files were uploaded.");
      }

      const name = await this.uploadFile(req.files as any, {} as ValidExtensions, 'imgs');
      return name;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public updateFile = async (req: Request) => {
    try {
      let model;
      const { id, collection } = req.params;
      switch(collection) {
        case 'users':
          model = await User.findById(id);

          if (!model) {
            throw new Error('Such user does not exist');
          }
          break;
        case 'products':
          model = await Product.findById(id);

          if (!model) {
            throw new Error('Such product does not exist');
          }
          break;
        default:
          throw new Error('This was not validated');
      }

      if (model.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      const name = await this.uploadFile(req.files as any, {} as ValidExtensions, collection) as string;
      model.img = name;

      await model.save();

      return model;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public updateFileCloudinary = async (req: Request) => {
    try {
      let model;
      const { id, collection } = req.params;
      switch(collection) {
        case 'users':
          model = await User.findById(id);

          if (!model) {
            throw new Error('Such user does not exist');
          }
          break;
        case 'products':
          model = await Product.findById(id);

          if (!model) {
            throw new Error('Such product does not exist');
          }
          break;
        default:
          throw new Error('This was not validated');
      }

      if (model.img) {
        const arrName = model.img.split('/');
        const name = arrName[arrName.length -1];
        const [ public_id ] = name.split('.');

        cloudinary.v2.uploader.destroy(public_id);
      }

      const { tempFilePath } = req.files as any;
      const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);
      
      model.img = secure_url;
      await model.save();
      
      return model;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public showImage = async (req: Request, res: Response) => {
    try {
      let model;
      const { id, collection } = req.params;
      switch(collection) {
        case 'users':
          model = await User.findById(id);

          if (!model) {
            throw new Error('Such user does not exist');
          }
          break;
        case 'products':
          model = await Product.findById(id);

          if (!model) {
            throw new Error('Such product does not exist');
          }
          break;
        default:
          throw new Error('This was not validated');
      }

      if (model.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }
      }

        const noImagePath = path.join(__dirname, '../assets/no-image.png');
        return res.sendFile(noImagePath);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  private uploadFile = (files: { [fieldname: string ]: UploadedFile }, validExtensions: ValidExtensions, folder: string) => {
    return new Promise((resolve, reject) => {
      for (const fieldname in files) {
        const file = files[fieldname];
        const { name } = file;
        const fixedName = name.split('.');
        const extension = fixedName[fixedName.length - 1];

        if (!validExtensions[extension]) {
          return reject(`The extension ${extension} is not valid`);
        }
        
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname + '../uploads/', folder, tempName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
          if (err) {
              reject(err);
          }

          resolve(uploadPath);
        });
      }  
    });
  }; 
}
