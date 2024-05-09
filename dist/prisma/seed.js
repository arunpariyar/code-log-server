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
const feedback_mocks_1 = require("./dev-data.js/feedback-mocks");
const db_1 = __importDefault(require("../db"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //   await prisma.feedback.deleteMany({});
        for (let feedback of feedback_mocks_1.feedbacks) {
            yield db_1.default.feedback.create({ data: feedback });
        }
    });
}
main()
    .catch((err) => {
    console.log(`The was problem when seeding the database 🔥`);
    console.log(err);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield db_1.default.$disconnect(); }));
