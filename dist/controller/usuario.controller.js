"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.loginUser = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mysql_1 = __importDefault(require("../mysql/mysql"));
exports.getUser = (req, res) => {
    res.json({
        ok: true
    });
};
exports.loginUser = (req, res) => {
    res.json({
        ok: true
    });
};
exports.postUser = (req, res) => {
    //encripto pa contraseña
    const user = Object.assign(Object.assign({}, req.body), { password: bcrypt_1.default.hashSync(req.body.password, 13) });
    // evita inyeccion SQL
    const escValues = mysql_1.default.instance.conn.escape(user);
    console.log(escValues);
    //Armo la query de post
    const query = `INSERT INTO usuarios SET ${escValues}`;
    //Ejecuto la query
    mysql_1.default.executeQuery(query, (error, data) => {
        //si hay un erro lo informo
        if (error) {
            return res.json({
                ok: false,
                error
            });
        }
        //si termina bien lo informo
        res.json({
            ok: true
        });
    });
};
