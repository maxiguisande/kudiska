import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import MySQL from '../mysql/mysql';
import { Token } from '../classes/token';

export const putUser = (req: Request, res: Response) => {


    res.json({
        ok: true,
    })
}

export const loginUser = (req: Request, res: Response) => {
    //extraigo el mail y password
    const { email, password } = req.body;
    const escEmail = MySQL.instance.conn.escape(email);
    //armo la query para buscar el user
    const query = `SELECT * FROM usuarios WHERE email = ${escEmail}`;
    //ejecuto la query
    MySQL.executeQuery(query, (error: any, data: any[]) => {
        //si hay un erro lo informo
        if (error) {
            return res.json({
                ok: false,
                error
            })
        };
        //me quedo el el promer registro
        const [user] = data;
        //valido que el user exista
        if (!user) {
            return res.json({
                ok: false,
                error: {
                    message: 'Usuario y/o contraseña incorrectos'
                }
            })
        };
        //Valido que la contraseña sea la correcta
        if (!bcrypt.compareSync(password, user.password)) {
            return res.json({
                ok: false,
                error: {
                    message: 'Usuario y/o contraseña incorrectos'
                }
            })
        };
        //saco el password para que no llegue al user
        delete user.password;
        const token = Token.getJWToken(user);
        //si termina bien envio la data
        res.json({
            ok: true,
            user,
            token
        })
    })
}

export const postUser = (req: Request, res: Response) => {
    const body = req.body;
    //encripto pa contraseña
    const queryDom = `SELECT dominio FROM dominios WHERE dominio = '${body.dominio}'`;
    //Ejecuto la query
    MySQL.executeQuery(queryDom, (error: any, data: any) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }

        if (data.length > 0) {
            return res.json({
                ok: false,
                error: {
                    message: 'El dominio ingresado ya existe'
                }
            })
        }

        const user = {
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            password: bcrypt.hashSync(body.password, 13)
        };
        // evita inyeccion SQL
        const escValues = MySQL.instance.conn.escape(user);
        //Armo la query de post
        const query = `INSERT INTO usuarios SET ${escValues}`;

        MySQL.executeQuery(query, (error: any, data: any) => {

            //si hay un erro lo informo
            if (error?.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'El email ingresado ya existe en el sistema'
                    }
                })
            }

            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                })
            }

            const dominio = {
                dominio: body.dominio,
                id_tipo_selectores: body.tipo_selector
            }
            const escValuesDom = MySQL.instance.conn.escape(dominio);

            const query = `INSERT INTO dominios SET ${escValuesDom}`;
            MySQL.executeQuery(query, (error: any, data: any) => {
                if (error?.code === 'ER_DUP_ENTRY') {
                    return res.json({
                        ok: false,
                        error: {
                            message: 'El dominio ingresado ya existe en el sistema'
                        }
                    })
                } else if (error) {
                    return res.json({
                        ok: false,
                        error
                    })
                }
                //saco el password de las propiedades
                delete user.password;
                //genero el token
                const token = Token.getJWToken({ id: data.insertId, ...user });
                //si termina bien lo informo
                res.json({
                    ok: true,
                    token
                })
            })
        })
    })
}
