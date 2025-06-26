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
exports.getSheet = getSheet;
exports.getSheetData = getSheetData;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const RANGES = new Map([
    ["Tee Sheet", "A:D"],
    ["Scores", "A:W"],
    ["LEADERBOARD", "E:H"],
]);
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const auth = new googleapis_1.google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES
});
function getSheet(sheetId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield auth.getClient();
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth: client });
        const response = yield sheets.spreadsheets.get({
            spreadsheetId: sheetId,
        });
        return response.data;
    });
}
function getSheetData(sheetId, year, tab) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield auth.getClient();
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth: client });
        const range = `${year} ${tab}!${RANGES.get(tab)}`;
        const response = yield sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range
        });
        return response.data.values;
    });
}
