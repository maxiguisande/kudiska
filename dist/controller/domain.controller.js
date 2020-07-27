"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomains = void 0;
const mysql_1 = __importDefault(require("../mysql/mysql"));
exports.getDomains = (req, res) => {
    const { dominio } = req.params;
    const escDominio = mysql_1.default.instance.conn.escape(dominio);
    //Armo la query 
    const query = `SELECT * FROM dominios WHERE dominio = ${escDominio}`;
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
            ok: true,
            data
        });
    });
};
