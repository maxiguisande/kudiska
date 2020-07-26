"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    static getJWToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: payload,
        }, this.seed, {
            expiresIn: this.expires
        });
    }
    ;
    static compareToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (error, decoded) => {
                //Si hay un error lo infformo
                error ? reject(error) : resolve(decoded);
            });
        });
    }
}
exports.Token = Token;
Token.seed = 'seed-constructor-backend-node';
Token.expires = '30d';
