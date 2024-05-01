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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
describe('Feedback', () => {
    let newFeedback = {};
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).delete('/api/feedback/newFeedback.id');
    }));
    it('should return status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/feedback').send({
            title: 'from test',
            category: 'Planned',
            detail: 'This is created from supertest',
        });
        newFeedback = res.body;
        expect(res.statusCode).toEqual(200);
    }));
    it('should return status code 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/feedback').send({});
        expect(res.statusCode).toEqual(400);
    }));
});
