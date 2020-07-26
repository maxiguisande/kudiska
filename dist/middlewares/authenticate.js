"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const token_1 = require("../classes/token");
exports.validateToken = (req, res, next) => {
    const token = req.get('token') || '';
    token_1.Token.compareToken(token)
        .then((userDecoded) => {
        req.user = userDecoded.user;
        next();
    })
        .catch(error => {
        res.json({
            ok: false,
            error: {
                message: 'Token no valido'
            }
        });
    });
};
