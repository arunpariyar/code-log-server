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
exports.deleteOneFeedback = exports.getAllFeedbacks = exports.createNewFeedback = void 0;
const db_1 = __importDefault(require("../db"));
const createNewFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, detail } = req.body;
        if (!(title && category && detail)) {
            return res.status(400).send('please provide all details properly');
        }
        const newFeedback = yield db_1.default.feedback.create({ data: req.body });
        res.send(newFeedback);
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
});
exports.createNewFeedback = createNewFeedback;
const getAllFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFeedbacks = yield db_1.default.feedback.findMany();
        res.send(allFeedbacks);
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
});
exports.getAllFeedbacks = getAllFeedbacks;
const deleteOneFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedFeedback = yield db_1.default.feedback.delete({
            where: {
                id,
            },
        });
        if (deletedFeedback) {
            res.send({ message: `feedback with id: ${id} deleted` });
        }
    }
    catch (error) {
        res.status(500);
        res.send({ message: "Item doesn't exist" });
    }
});
exports.deleteOneFeedback = deleteOneFeedback;
