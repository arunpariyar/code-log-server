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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const result = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!result) {
            console.log('got here');
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const result = yield db_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword,
                },
            });
            res.status(200).json(result);
        }
        else {
            res.status(501).json({
                error: true,
                message: 'email address already exists',
            });
        }
    }
    catch (error) {
        res.end({ error: true, message: error });
    }
});
exports.createUser = createUser;
const userController = { createUser: exports.createUser };
exports.default = userController;
