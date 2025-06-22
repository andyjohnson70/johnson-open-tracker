import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const RANGES = new Map([
    ["Tee Sheet", "A:D"],
    ["Scores", "A:W"],
    ["LEADERBOARD", "A:K"],
]);
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES
});

export async function getSheet(sheetId: string) {
    const client = await auth.getClient() as JWT;
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
    });

    return response.data;
}

export async function getSheetData(sheetId: string, year: string, tab: string) {
    const client = await auth.getClient() as JWT;
    const sheets = google.sheets({ version: 'v4', auth: client });

    const range = `${year} ${tab}!${RANGES.get(tab)}`;
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range
    });

    return response.data.values;
}