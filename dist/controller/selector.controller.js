"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationTypes = exports.getSelectorTypes = void 0;
const mysql_1 = __importDefault(require("../mysql/mysql"));
exports.getSelectorTypes = (req, res) => {
    //Armo la query de post
    const query = `SELECT * FROM tipo_selectores`;
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
exports.getApplicationTypes = (req, res) => {
    //Armo la query de post
    const query = `SELECT * FROM tipo_aplicaciones`;
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
