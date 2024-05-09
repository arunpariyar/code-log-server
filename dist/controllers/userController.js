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
exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                error: true,
                message: 'Name, email and password are required',
            });
        }
        const existingUser = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: true, message: 'Email already exists' });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield db_1.default.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
        });
        if (process.env.JWT_SECRET) {
            const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.status(200).json({
                error: false,
                token,
                data: {
                    user: newUser,
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: true, message: error });
    }
});
exports.createUser = createUser;
const userController = { createUser: exports.createUser };
exports.default = userController;
