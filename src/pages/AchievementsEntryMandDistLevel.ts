import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TestDataHelper } from "../utils/testDataHelper";


export class AchievementsEntryMandDistLevel extends BasePage {
    private readonly monthlyBtn: Locator;
    private readonly quarterlyBtn: Locator;
    private readonly yearDropdown: Locator;
    private readonly categoryDropdown: Locator;
    private readonly selectedCategory: Locator;
    private readonly forwardBtn: Locator;
    private readonly saveBtn: Locator;
    private readonly notSubmitStatus: Locator;
    private readonly pendingStatusMan: Locator;
    private readonly pendingStatusDis: Locator;
    private readonly saveSuccessMsg: Locator;
    private readonly forwardSuccessMsg: Locator;
    private readonly modalOkBtn: Locator;
    private readonly mandalorDistName: Locator;

    private readonly tableHeader: Locator;
    private readonly remarksTextbox: Locator;
    private readonly confirmBtn: Locator;
    private readonly cnfYesBtn: Locator;
    private readonly cnfNoBtn: Locator;
    
    constructor(page: Page) {
        super(page);
        this.monthlyBtn = page.getByRole('button', { name: 'MONTHLY' });
        this.quarterlyBtn = page.getByRole('button', { name: 'QUARTERLY' });
        this.yearDropdown = page.locator('select[name="year"]');
        this.categoryDropdown = page.locator('select[name="category"]');
        this.selectedCategory = page.locator('select[name="category"] option:checked')
        this.forwardBtn = page.getByRole('button', { name: 'Forward' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.notSubmitStatus = page.getByRole('heading', { name: 'Current Status: Mandal Officer not yet submitted', level: 3 });
        this.pendingStatusMan = page.getByRole('heading', { name: 'Current Status: Pending at Mandal Office', level: 3 });
        this.pendingStatusDis = page.getByRole('heading', { name: 'Current Status: Pending at District Office', level: 3 });
        this.saveSuccessMsg = page.getByText('Data Saved Successfully', { exact: true });
        this.forwardSuccessMsg = page.getByText('Data Forwarded Successfully');
        this.modalOkBtn = page.getByRole('button', { name: 'OK' });
        this.mandalorDistName = page.locator('#welcome-dropdown .d-block');

        this.tableHeader = page.locator('table thead th');
        this.remarksTextbox = page.locator('textarea[name="remarks"]')
        this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
        this.cnfYesBtn = page.getByRole('button', { name: 'Yes' })
        this.cnfNoBtn = page.getByRole('button', { name: 'Yes' })

    }

    async clickMonthlyBtn() {
        await this.monthlyBtn.click()
    }

    async clickQuarterlyBtn() {
        await this.quarterlyBtn.click()
    }

    async selectYear(yearValue: string) {
        await this.yearDropdown.selectOption({ value: yearValue });
    }

    async selectCategory(categoryValue: string) {
        await this.categoryDropdown.selectOption(categoryValue)
    }

    async getAchievedValueColumnIndex(): Promise<number> {
        await this.tableHeader.first().waitFor({ state: "visible", timeout: 10000 });
        const headers = await this.page.$$eval('table thead th', ths =>
            ths.map(th => (th as HTMLElement).innerText.trim())
        )

        const index = headers.indexOf('ACHIEVED VALUE');
        if (index === -1) {
            throw new Error('Achieved Value column not found')
        }
        return index + 1;
    }

    async getAchievedValueInputs() {
        const achievedIndex = await this.getAchievedValueColumnIndex();
        return await this.page.$$(`table tbody tr td:nth-child(${achievedIndex}) input`)
    }

    async fillAchievedValues(value: string) {
        const inputs = await this.getAchievedValueInputs();
        for (const input of inputs) {
            await input.fill(value);
        }
    }

    async saveData() {
        await this.saveBtn.click();
    }

    async forwardData() {
        await this.forwardBtn.click();
    }

    async getNotSubmitStatusData(): Promise<string> {
        await this.notSubmitStatus.waitFor({ state: 'visible' });
        return this.notSubmitStatus.innerText();
    }

    async getPendingStatusDataMan(): Promise<string> {
        await this.pendingStatusMan.waitFor({ state: 'visible' });
        return this.pendingStatusMan.innerText();
    }

    async getPendingStatusDataDis(): Promise<string> {
        await this.pendingStatusDis.waitFor({ state: 'visible' });
        return this.pendingStatusDis.innerText();
    }

    async getSaveSuccessMessage(): Promise<string> {
        await this.saveSuccessMsg.waitFor({ state: 'visible', timeout: 5000 })
        return await this.saveSuccessMsg.innerText();
    }

    async verifyForwardSuccessMessage(): Promise<boolean> {
        await this.forwardSuccessMsg.waitFor({ state: 'visible', timeout: 5000 })
        return await this.forwardSuccessMsg.isVisible();
    }

    async clickModalOkBtn() {
        await this.modalOkBtn.click();
    }


    async captureMandalorDistName(): Promise<string> {
        const fullDetails = await this.mandalorDistName.first().innerText();
        const mandalorDistName = fullDetails.trim().split(/\s+/).pop();
        return mandalorDistName!;
    }

    async captureYear(): Promise<string> {
        return await this.yearDropdown.inputValue();
    }

    async captureCategory(): Promise<string> {
        return (await this.selectedCategory.textContent())!.trim();
    }

    async enterRemarks(remarks: string) {
        await this.remarksTextbox.waitFor({ state: "visible" });
        await this.remarksTextbox.fill(remarks);
    }

    async confirmForward() {
        await this.confirmBtn.click();
        await this.cnfYesBtn.waitFor({ state: "visible" })
        await this.cnfYesBtn.click();
    }

    async forwardMandalorDistrictAchievementData(periodicity:string,yearValue: string, categoryValue: string, remarksText: string) {
        await this.selectPeriodicity(periodicity);
        await this.yearDropdown.waitFor({state: "visible"})
        await this.yearDropdown.selectOption({ value: yearValue })
        await this.categoryDropdown.selectOption(categoryValue)//Q1 (Apr - Jun)

        const mandalorDistName = await this.captureMandalorDistName();
        const year = await this.captureYear();
        const category = await this.captureCategory();
        TestDataHelper.saveForwardedDetails({ mandalorDistName, year, category });

        await this.fillAchievedValues('100');
        await this.forwardData();
        await this.enterRemarks(remarksText);
        await this.confirmForward();
    }

    async selectPeriodicity(periodicity:string){
        if(periodicity.toLowerCase()=='monthly'){
            this.monthlyBtn.click();
        }
        else{
            this.quarterlyBtn.click();
        }
    }
}