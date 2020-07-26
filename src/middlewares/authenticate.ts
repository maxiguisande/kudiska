import { NextFunction, Request, Response } from "express";
import { Token } from '../classes/token';

export const validateToken = (req: any, res: Response, next: NextFunction) => {

    const token = req.get('token') || '';

    Token.compareToken(token)
        .then((userDecoded: any) => {
            req.user = userDecoded.user
            next();
        })
        .catch(error => {
            res.json({
                ok: false,
                error: {
                    message: 'Token no valido'
                }
            })
        })

}