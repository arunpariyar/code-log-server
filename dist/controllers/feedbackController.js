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
exports.updateFeedback = exports.getFeedbackById = exports.deleteOneFeedback = exports.getAllFeedbacks = exports.createNewFeedback = void 0;
const db_1 = __importDefault(require("../db"));
//ROUTE FOR ALL FEEDBACKS
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
//ROUTE FOR CREATING ONE NEW FEEDBACK
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
//ROUTE TO GET FEEDBACK BY ID
const getFeedbackById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield db_1.default.feedback.findUnique({
            where: {
                id,
            },
        });
        if (!result) {
            res.send({ message: `feedback with id: ${id} doesnot exist` });
        }
        return res.send(result);
    }
    catch (error) {
        res.status(204);
        console.log({ error });
    }
});
exports.getFeedbackById = getFeedbackById;
//ROUTE TO UPDATE A FEEDBACK
const updateFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, category, detail, upvotes, status } = req.body;
        const feedbackExists = yield db_1.default.feedback.findUnique({
            where: {
                id,
            },
        });
        if (!feedbackExists) {
            return res.send({ message: `feedback with id: ${id} not found` });
        }
        const updateFeedback = yield db_1.default.feedback.update({
            where: {
                id,
            },
            data: {
                title,
                category,
                detail,
                upvotes,
                status,
            },
        });
        res.send(updateFeedback);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateFeedback = updateFeedback;
//ROUTE TO DELETE FEEDBACK BY ID
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
