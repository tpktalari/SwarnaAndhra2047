import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.closeBtn = page.getByRole('button', { name: 'Close' });
        this.loginArrowBtn = page.getByText('Login', { exact: true });
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.captcha = page.getByRole('textbox', { name: 'Enter captcha' });
        this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
    }
    async closeThanksPopup() {
        await this.closeBtn.click();
    }
    async goToLoginPage() {
        await this.page.goto('SwarnandhraLogin');
    }
    async clickLoginArrow() {
        await this.loginArrowBtn.click();
    }
    async getLoginPageTitle() {
        return await this.page.title();
    }
    async doLogin(username, password, captcha) {
        console.log(`user creds: ${username} : ${password}`);
        await this.username.fill(username);
        await this.password.fill(password);
        await this.captcha.fill(captcha);
        await this.loginBtn.click();
    }
}
