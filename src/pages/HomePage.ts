import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";


export class HomePage extends BasePage {
    private readonly swaKpisBtn: Locator;
    private readonly changePwd: Locator;
    private readonly logoutBtn: Locator;
    private readonly modalFooterYesBtn: Locator;
    private readonly modalFooterNoBtn: Locator;
    private readonly modalOkBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.swaKpisBtn = page.locator(`p:has-text("Swarna Andhra KPI's")`);
        this.changePwd = page.getByRole('link', { name: 'Change Password' });
        this.logoutBtn = page.locator('button').filter({ hasText: 'Logout' });
        this.modalFooterYesBtn = /*page.getByRole('button', { name: 'Yes' });*/ page.locator('.conform');
        this.modalFooterNoBtn = page.getByRole('button', { name: 'No' });
        this.modalOkBtn = page.locator('.confirm');
    }

    async ClickSwaKpisBtn(): Promise<void> {
        await this.swaKpisBtn.waitFor({ state: "visible" });
        await this.swaKpisBtn.click();
    }

    async isLogoutBtnExists(): Promise<boolean> {
        await this.logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
        return await this.logoutBtn.isVisible();
    }

    async isChangePwdLinkExists(): Promise<boolean> {
        await this.changePwd.waitFor({ state: 'visible', timeout: 5000 });
        return await this.changePwd.isVisible();
    }


    async doLogout(): Promise<void> {
        await allure.step('Logout of the application', async () => {
            await this.logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.logoutBtn.click();

            await this.modalFooterYesBtn.waitFor({ state: 'visible', timeout: 5000 });
            // Use force click to bypass stability checks
            await this.modalFooterYesBtn.click({ force: true });

            // Check if OK button appears, with a longer timeout to allow page state to update
            const isOkBtnVisible = await this.modalOkBtn.isVisible({ timeout: 3000 }).catch(() => false);
            if (isOkBtnVisible) {
                await this.modalOkBtn.click({ force: true });
            }
        })
    }
}