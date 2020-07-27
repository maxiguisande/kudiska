"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const domain_controller_1 = require("../controller/domain.controller");
const router = express_1.Router();
router.get('/dominios/:dominio', domain_controller_1.getDomains);
exports.default = router;
