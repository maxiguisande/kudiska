"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middlewares/authenticate");
const selector_controller_1 = require("../controller/selector.controller");
const router = express_1.Router();
router.get('/tipo_selectores', [authenticate_1.validateToken], selector_controller_1.getSelectorTypes);
router.get('/tipo_aplicaciones', [authenticate_1.validateToken], selector_controller_1.getApplicationTypes);
exports.default = router;
