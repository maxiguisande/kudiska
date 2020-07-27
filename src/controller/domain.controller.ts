import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';

export const getDomains = (req: Request, res: Response) => {
    const { dominio } = req.params;
    const escDominio = MySQL.instance.conn.escape(dominio);
    //Armo la query 
    const query = `SELECT * FROM dominios WHERE dominio = ${escDominio}`;
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
            exist: data.length > 0 ? true : false
        })
    })
}