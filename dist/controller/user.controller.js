"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.loginUser = exports.putUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mysql_1 = __importDefault(require("../mysql/mysql"));
const token_1 = require("../classes/token");
exports.putUser = (req, res) => {
    res.json({
        ok: true,
    });
};
exports.loginUser = (req, res) => {
    //extraigo el mail y password
    const { email, password } = req.body;
    const escEmail = mysql_1.default.instance.conn.escape(email);
    //armo la query para buscar el user
    const query = `SELECT * FROM usuarios WHERE email = ${escEmail}`;
    //ejecuto la query
    mysql_1.default.executeQuery(query, (error, data) => {
        //si hay un erro lo informo
        if (error) {
            return res.json({
                ok: false,
                error
            });
        }
        ;
        //me quedo el el promer registro
        const [user] = data;
        //valido que el user exista
        if (!user) {
            return res.json({
                ok: false,
                error: {
                    message: 'Usuario y/o contraseña incorrectos'
                }
            });
        }
        ;
        //Valido que la contraseña sea la correcta
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.json({
                ok: false,
                error: {
                    message: 'Usuario y/o contraseña incorrectos'
                }
            });
        }
        ;
        //saco el password para que no llegue al user
        delete user.password;
        const token = token_1.Token.getJWToken(user);
        //si termina bien envio la data
        res.json({
            ok: true,
            user,
            token
        });
    });
};
exports.postUser = (req, res) => {
    const body = req.body;
    //encripto pa contraseña
    const queryDom = `SELECT dominio FROM dominios WHERE dominio = '${body.dominio}'`;
    //Ejecuto la query
    mysql_1.default.executeQuery(queryDom, (error, data) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (data.length > 0) {
            return res.json({
                ok: false,
                error: {
                    message: 'El dominio ingresado ya existe'
                }
            });
        }
        const user = {
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            password: bcrypt_1.default.hashSync(body.password, 13)
        };
        // evita inyeccion SQL
        const escValues = mysql_1.default.instance.conn.escape(user);
        //Armo la query de post
        const query = `INSERT INTO usuarios SET ${escValues}`;
        mysql_1.default.executeQuery(query, (error, data) => {
            //si hay un erro lo informo
            if ((error === null || error === void 0 ? void 0 : error.code) === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'El email ingresado ya existe en el sistema'
                    }
                });
            }
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            const dominio = {
                dominio: body.dominio,
                id_tipo_selectores: body.tipo_selector
            };
            const escValuesDom = mysql_1.default.instance.conn.escape(dominio);
            const query = `INSERT INTO dominios SET ${escValuesDom}`;
            mysql_1.default.executeQuery(query, (error, data) => {
                if ((error === null || error === void 0 ? void 0 : error.code) === 'ER_DUP_ENTRY') {
                    return res.json({
                        ok: false,
                        error: {
                            message: 'El dominio ingresado ya existe en el sistema'
                        }
                    });
                }
                else if (error) {
                    return res.json({
                        ok: false,
                        error
                    });
                }
                //saco el password de las propiedades
                delete user.password;
                //genero el token
                const token = token_1.Token.getJWToken(Object.assign({ id: data.insertId }, user));
                //si termina bien lo informo
                res.json({
                    ok: true,
                    token
                });
            });
        });
    });
};
