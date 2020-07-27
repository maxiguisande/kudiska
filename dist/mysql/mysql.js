"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        //Creo la conexion con la base de datos
        /*
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'avadakedavra',
            password: 'y*?be*d26P,@FGG',
            database: 'node_db',
        });
        */
        this.connected = false;
        this.conn = mysql_1.default.createPool({
            host: 'bbdd.kudiska.com',
            user: 'ddb152277',
            password: 'kudiska@123',
            database: 'ddb152277',
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        this.instance.conn.query(query, (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            ;
            callback(null, results);
        });
    }
}
exports.default = MySQL;
