import { NextFunction, Request, Response } from "express";

export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Not possible to validate role before token'
        });
    }

    const { role, name } = req.body;

    if (role !== 'ADMIN') {
        return res.status(401).json({
            msg: `${name} is not admin`
        });
    }

    next();
};

export const hasRole = (roles: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'The role wants to be validated before the token'
            });
        }

        if (req.body.role) {
            return res.status(401).json({
                msg: `The service requires a valid role`
            });
        }

        next();
    }

};