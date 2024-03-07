"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('tiny'));
}
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
exports.default = app;
