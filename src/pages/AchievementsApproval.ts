import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TestDataHelper } from "../utils/testDataHelper";

let selectedValues = TestDataHelper.readForwardedDetails();

export class AchievementsApproval extends BasePage {
    private readonly monthlyBtn: Locator;
    private readonly quarterlyBtn: Locator;
    private readonly yearDropdown: Locator;
    private readonly categoryDropdown: Locator;
    private readonly searchTextbox: Locator;
    private readonly updateBtn: Locator;
    private readonly updateSuccessMsg: Locator;
    private readonly approveSucessMsg: Locator;
    private readonly modalOkBtn: Locator;
    private readonly approveBtn: Locator;
    private readonly remarksTextbox: Locator;
    private readonly confirmBtn: Locator;
    private readonly cnfYesBtn: Locator;



    constructor(page: Page) {
        super(page);
        this.monthlyBtn = page.getByRole('button', { name: 'MONTHLY' });
        this.quarterlyBtn = page.getByRole('button', { name: 'QUARTERLY' });
        this.yearDropdown = page.locator('select[name="year"]');
        this.categoryDropdown = page.locator('select[name="category"]');
        this.searchTextbox = page.getByRole('textbox', { name: 'Search ' });
        this.updateBtn = page.getByRole('button', { name: 'Update' });
        this.updateSuccessMsg = page.getByText('Data Saved Successfully', { exact: true });
        this.approveSucessMsg = page.getByText('Data Approved Successfully', { exact: true });
        this.modalOkBtn = page.getByRole('button', { name: 'OK' });
        this.approveBtn = page.getByRole('button', { name: 'Approve' });
        this.remarksTextbox = page.locator('textarea[name="remarks"]');
        this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
        this.cnfYesBtn = page.getByRole('button', { name: 'Yes' })
    }

    async clickMonthlyBtn() {
        await this.monthlyBtn.click()
    }

    async clickQuarterlyBtn() {
        await this.quarterlyBtn.click()
    }


    async selectYear() {
        await this.yearDropdown.selectOption({ value: selectedValues.year })
    }

    async selectCategory() {
        await this.categoryDropdown.waitFor({state: "visible", timeout:5000});
        await this.categoryDropdown.selectOption(selectedValues.category)
    }

    async verifyMandalorDistExistsAndCheckBoxVisible(mandalorDistName: string): Promise<boolean> {
        await this.page.locator(`div:has(span:has-text("${mandalorDistName}")) span[class="checkmark"]`).waitFor({ state: "visible" , timeout: 10000});
        const checkbox = this.page.locator(`div:has(span:has-text("${mandalorDistName}")) span[class="checkmark"]`).first();
        return await checkbox.isVisible();
    }

    async enterMandalorDistInSearchBox(mandalorDistName: string) {
        await this.searchTextbox.waitFor({ state: 'visible' });
        await this.searchTextbox.fill(mandalorDistName);
        await this.page.locator(`div:has(span:has-text("${mandalorDistName}")) span[class="checkmark"]`).waitFor({ state: 'visible' });
    }

    async checkCheckboxForUpdateorApprove(mandalorDistName: string): Promise<void> {
        await this.page.locator(`div:has(span:has-text("${mandalorDistName}")) span[class="checkmark"]`).waitFor({ state: "visible", timeout: 10000 });
        await this.page.locator(`div:has(span:has-text("${mandalorDistName}")) span[class="checkmark"]`).click();

    }

    async verifyUpdateSuccessMessage(): Promise<boolean> {
        await this.updateSuccessMsg.waitFor({ state: 'visible', timeout: 10000 })
        return await this.updateSuccessMsg.isVisible();
    }

    async verifyApproveSuccessMessage(): Promise<boolean> {
        await this.approveSucessMsg.waitFor({ state: 'visible', timeout: 10000 })
        return await this.approveSucessMsg.isVisible();
    }

    async clickUpdateBtn() {
        await this.updateBtn.click();
    }

    async clickApproveBtn(){
        await this.approveBtn.click();
    }

    async clickModalOkBtn() {
        this.modalOkBtn.waitFor({state: 'visible', timeout: 10000})
        await this.modalOkBtn.click();
    }

    async enterRemarks(remarks: string) {
        await this.remarksTextbox.waitFor({ state: "visible" });
        await this.remarksTextbox.fill(remarks);
    }

    async confirmApprove() {
        await this.confirmBtn.click();
        await this.cnfYesBtn.waitFor({ state: "visible" })
        await this.cnfYesBtn.click();
    }

    

    






}