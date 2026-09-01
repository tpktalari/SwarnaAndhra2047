import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

type StatsNameColumn =
    | "Constituency Name"
    | "District Name"
    | "Mandal Name"
    | "Department Name";

export class PerformanceDashboardPage extends BasePage {
    private readonly DeptStatsLink: Locator;
    private readonly DistrictStatsLink: Locator;
    private readonly constituencyStatsLink: Locator;
    private readonly mandalStatsLink: Locator;
    private readonly tableHeader: Locator;
    private readonly modelContentHeader: Locator;
    private readonly closeBtn: Locator;
    private constAvgScores: Map<string, number>;
    private constMainTableScores: Map<string, number>;

    constructor(page: Page) {
        super(page);
        this.DeptStatsLink = page.locator('a.broadsector-tab2');
        this.DistrictStatsLink = page.locator('a.broadsector-tab3');
        this.constituencyStatsLink = page.locator('a.broadsector-tab4');
        this.mandalStatsLink = page.locator('a.broadsector-tab5');
        this.tableHeader = page.locator('table thead tr').nth(1);
        this.modelContentHeader = page.locator('.modal-content table thead th').nth(1);
        this.closeBtn = page.getByRole('button', { name: 'Close' });
        this.constAvgScores = new Map<string, number>();
        this.constMainTableScores = new Map<string, number>();
    }

    async clickConstituencyStatsLink(): Promise<void> {
        allure.step('clickConstituencyStatsLink', async () => {
            await this.constituencyStatsLink.waitFor({ state: 'visible' });
            await this.constituencyStatsLink.click({ force: true });
        })
    }

    async clickMandalStatsLink(): Promise<void> {
        allure.step('click Mandal Stats Link', async () => {
            await this.mandalStatsLink.waitFor({ state: 'visible' });
            await this.mandalStatsLink.click({ force: true });
        })
    }

    async clickDistrictStatsLink(): Promise<void> {
        allure.step('Click District Stats Link', async () => {
            await this.DistrictStatsLink.waitFor({ state: 'visible' });
            await this.DistrictStatsLink.click({ force: true });
        })
    }

    async clickDeptStatsLink(): Promise<void> {
        allure.step('click Department Stats Link ', async () => {
            await this.DeptStatsLink.waitFor({ state: 'visible' });
            await this.DeptStatsLink.click({ force: true });
        })
    }

    async getColumnIndex(columnName: string): Promise<number> {
        await this.tableHeader.waitFor({ state: "visible", timeout: 10000 });
        const headers = await this.page.$$eval('table thead th', ths =>
            ths.map(th => (th as HTMLElement).innerText.trim())
        )
        //const index = headers.indexOf('No of Indicators ↕');
        const index = headers.findIndex(h => h.includes(columnName))
        if (index === -1) {
            throw new Error(`${columnName} column not found`)
        }
        return index;
    }

    async getModelContentScoreColumnIndex() {
        await this.modelContentHeader.waitFor({ state: "visible", timeout: 10000 });
        const headers = await this.page.$$eval('.modal-content table thead th', ths =>
            ths.map(th => (th as HTMLElement).innerText.trim())
        )
        //const index = headers.indexOf('No of Indicators ↕');
        const index = headers.findIndex(h => h.includes("Score ↕"))
        if (index === -1) {
            throw new Error(`Score column not found`)
        }
        return index;
    }

    async getNoofIndicatorsLinks() {
        const achievedIndex = await this.getColumnIndex("No of Indicators");
        console.log("index is ", achievedIndex);
        return await this.page.$$(`table tbody tr td:nth-child(${achievedIndex}) a`)
    }


    async getScoreValuesMap(nameColumn: StatsNameColumn) {
        return allure.step(`Extract ${nameColumn} scores from dashboard table`, async () => {
            const achievedIndexScore = await this.getColumnIndex("Score ↕");
            const achievedIndexKey = await this.getColumnIndex(nameColumn);
            //console.log("index is ", achievedIndexScore);
            const scoreValues = await this.page.locator(`table tbody tr td:nth-child(${achievedIndexScore})`).allInnerTexts();
            const constValues = await this.page.locator(`table tbody tr td:nth-child(${achievedIndexKey})`).allInnerTexts();

            for (let i = 0; i < constValues.slice(0, 10).length; i++) {
                const constituency = constValues.slice(0, 10)[i].trim();
                const score = Number(scoreValues.slice(0, 10)[i].trim());
                this.constMainTableScores.set(constituency, score);
            }

            console.log("Main Table Scores:", this.constMainTableScores);
            return this.constMainTableScores;
        })
    }

    async ClickNoofIndicatorsLinksAndStoreAvgscores() {
        return allure.step('Click indicator links and store average scores', async () => {
            const links = await this.getNoofIndicatorsLinks();
            const constituencyKeys = [...this.constMainTableScores.keys()];
            for (let i = 0; i < links.slice(0, 10).length; i++) {
                const link = links.slice(0, 10)[i];
                await link.waitForElementState('stable')
                await link.click();
                // Wait for at least one row to be visible
                await this.page.locator('#my-tableIndicatorMandal tbody tr').first().waitFor({ state: "visible", timeout: 10000 });

                // Get all rows and extract score from each row's 12th column
                const rows = await this.page.locator('#my-tableIndicatorMandal tbody tr').all();

                const scores = [];
                let modelContentScoreIndex = await this.getModelContentScoreColumnIndex();
                for (const row of rows) {
                    const scoreCell = row.locator(`td:nth-child(${modelContentScoreIndex})`);
                    const scoreText = await scoreCell.innerText();
                    scores.push(scoreText.trim());
                }
                //console.log('All Scores:', scores);
                //console.log("No. Of Rows :", rows.length)

                const average = scores.reduce((sum, score) => sum + Number(score), 0) / scores.length;
                const roundedAvg = Math.round(average);
                // console.log("Average Score is : ", roundedAvg);

                const constituency = constituencyKeys[i];
                this.constAvgScores.set(constituency, roundedAvg);

                await this.closeBtn.first().click();
                await this.page.waitForTimeout(2000);

            }
            console.log("Average Scores: ", this.constAvgScores);
            return this.constAvgScores;
        })
    }



}