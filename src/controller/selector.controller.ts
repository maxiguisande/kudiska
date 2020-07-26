import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';

export const getSelectorTypes = (req: Request, res: Response) => {
    //Armo la query de post
    const query = `SELECT * FROM tipo_selectores`;
    //Ejecuto la query
    MySQL.executeQuery(query, (error: any, data: any) => {
        //si hay un erro lo informo
        if (error) {
            return res.json({
                ok: false,
                error
            })
        }
        //si termina bien lo informo
        res.json({
            ok: true,
            data
        })
    })
}
export const getApplicationTypes = (req: Request, res: Response) => {
    //Armo la query de post
    const query = `SELECT * FROM tipo_aplicaciones`;
    //Ejecuto la query
    MySQL.executeQuery(query, (error: any, data: any) => {
        //si hay un erro lo informo
        if (error) {
            return res.json({
                ok: false,
                error
            })
        }
        //si termina bien lo informo
        res.json({
            ok: true,
            data
        })
    })
}


