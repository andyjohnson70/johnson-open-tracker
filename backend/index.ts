import express from 'express';
import cors from 'cors';
import { getSheetData, getSheet } from './sheet';

const app = express();
const PORT = process.env.PORT || 4000 ;

app.use(cors());
app.use(express.json());

const SHEET_ID = '1oaMo-VsTWhEkMJrR5OJjkFuGCEFhCCQH6GGfQDagQEc';

app.get('/api/sheet', async (req, res) => {
    try {
        const data = await getSheet(SHEET_ID);
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Failed to fetch sheet');
    }
});

app.get('/api/sheet/:year/:tab', async (req, res) => {
    try {
        const year = req.params.year;
        const tab = req.params.tab;
        const data = await getSheetData(SHEET_ID, year, tab);
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Failed to fetch sheet data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});