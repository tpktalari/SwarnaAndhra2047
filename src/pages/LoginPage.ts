import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";


export class LoginPage extends BasePage {
    private readonly closeBtn: Locator;
    private readonly loginArrowBtn: Locator;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly captcha: Locator;
    private readonly captchaRefersh: Locator;
    private readonly loginBtn: Locator;
    private readonly loginErrorMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.closeBtn = page.getByRole('button', { name: 'Close' });
        this.loginArrowBtn = page.getByText('Login', { exact: true });
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.captcha = page.getByRole('textbox', { name: 'Enter captcha' });
        this.captchaRefersh = page.locator(`//*[local-name()='svg' and @width='42']`)
        this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
        this.loginErrorMsg = page.locator('#swal2-html-container');
    }

    async closeThanksPopup(): Promise<void> {
        await this.closeBtn.click();
    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto('SwarnandhraLogin');
    }

    async clickLoginArrow(): Promise<void> {
        await this.loginArrowBtn.click();
    }

    async doLogin(username: string, password: string, captcha: string) {
        allure.step(`Login to the application as a ${username}`, async () => {
            console.log(`user creds: ${username} : ${password}`);
            await this.username.fill(username);
            await this.password.fill(password);
            await this.captchaRefersh.click();
            await this.captcha.fill(captcha);
            await this.loginBtn.click();
        })
    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        await this.loginErrorMsg.waitFor({ state: 'visible', timeout: 5000 });
        return await this.loginErrorMsg.isVisible();
    }

    //******************************** */
    async navigateToLoginPage() {
        this.goToLoginPage();
        this.closeThanksPopup();
        this.clickLoginArrow();
    }





}