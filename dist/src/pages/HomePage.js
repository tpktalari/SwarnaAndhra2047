import { BasePage } from "./BasePage";
export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.swaKpisBtn = page.locator(`p:has-text("Swarna Andhra KPI's")`);
        this.changePwd = page.getByRole('link', { name: 'Change Password' });
        this.logoutBtn = page.locator('button').filter({ hasText: 'Logout' });
        this.modalFooterYesBtn = page.getByRole('button', { name: 'Yes' });
        this.modalFooterNoBtn = page.getByRole('button', { name: 'No' });
        this.modalOkBtn = page.getByRole('button', { name: 'OK' });
    }
    async ClickSwaKpisBtn() {
        await this.swaKpisBtn.click();
    }
    async isLogoutBtnExists() {
        return await this.logoutBtn.isVisible();
    }
    async isChangePwdLinkExists() {
        return await this.changePwd.isVisible();
    }
    async getHomePageTitle() {
        return await this.page.title();
    }
    async doLogout() {
        await this.logoutBtn.click();
        await this.modalFooterYesBtn.click();
        await this.modalOkBtn.click();
    }
}
