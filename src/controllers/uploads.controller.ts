import { NextFunction, Request, Response } from "express";

import UploadsService from "../services/uploads.service";

export default class UploadsController {
  uploadsService: UploadsService;
  constructor() {
    this.uploadsService = new UploadsService();
  }

  public loadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
      }

      const loadFile = await this.uploadsService.loadFile(req);
      return loadFile;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
      }

      const updateFile = await this.uploadsService.updateFile(req);
      return updateFile;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  //Same as above but using a third party library to upload and store images// ------ This is the one we are using --------
  public updateFileCloudinary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
      }

      const updateFileClodinary = await this.uploadsService.updateFileCloudinary(req);
      return updateFileClodinary;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public showImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
      }

      const showImage = await this.uploadsService.showImage(req, res);
      return showImage;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
