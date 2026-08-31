import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../testdata/forwardedDetails.json');

export class TestDataHelper {
    static saveForwardedDetails(details: { mandalorDistName: string; year: string; category: string }) {
        fs.writeFileSync(filePath, JSON.stringify(details, null, 2));
    }

    static readForwardedDetails(): { mandalorDistName: string; year: string; category: string } {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    }
}


