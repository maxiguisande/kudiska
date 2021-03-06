import mysql from 'mysql';

export default class MySQL {

    private static _instance: MySQL;

    conn: mysql.Pool;

    connected: boolean = false;

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

        this.conn = mysql.createPool({
            host: 'bbdd.kudiska.com',
            user: 'ddb152277',
            password: 'kudiska@123',
            database: 'ddb152277',
        });

    }

    public static get instance() {

        return this._instance || (this._instance = new this());

    }

    static executeQuery(query: string, callback: Function) {
        this.instance.conn.query(query, (error, results: Object[], fields) => {
            if (error) {
                return callback(error);
            };
            callback(null, results);
        });
    }

}