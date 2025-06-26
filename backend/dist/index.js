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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sheet_1 = require("./sheet");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const SHEET_ID = '1oaMo-VsTWhEkMJrR5OJjkFuGCEFhCCQH6GGfQDagQEc';
app.get('/api/sheet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, sheet_1.getSheet)(SHEET_ID);
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch sheet');
    }
}));
app.get('/api/sheet/:year/:tab', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.params.year;
        const tab = req.params.tab;
        const data = yield (0, sheet_1.getSheetData)(SHEET_ID, year, tab);
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch sheet data');
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
