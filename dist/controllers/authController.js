"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: 'email and password are required',
            });
        }
        const existingUser = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            const isValid = yield bcrypt_1.default.compare(password, existingUser.password);
            if (isValid === true && process.env.JWT_SECRET) {
                const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                return res.status(200).json({
                    error: false,
                    token,
                });
            }
        }
        res.status(401).json({
            error: true,
            message: 'Incorrect email or password',
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error,
        });
    }
});
exports.login = login;
const authController = { login: exports.login };
exports.default = authController;
