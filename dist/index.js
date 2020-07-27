"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const user_1 = __importDefault(require("./router/user"));
const types_1 = __importDefault(require("./router/types"));
const domain_1 = __importDefault(require("./router/domain"));
const cors_1 = __importDefault(require("cors"));
const port = Number(process.env.PORT) || 3000;
//Server init
const server = server_1.default.init(port);
//cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//routes
server.app.use(user_1.default);
server.app.use(types_1.default);
server.app.use(domain_1.default);
//inicializar Server
server.start(() => {
    console.log(`Server on port ${port}`);
});
