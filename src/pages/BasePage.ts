import { expect, Locator, Page } from "@playwright/test";


export class BasePage {
    protected readonly page: Page;
    private readonly notificationBlock: Locator;
    private readonly arrowNextBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.notificationBlock = page.locator('.d5-item');
        this.arrowNextBtn = page.locator('button[title = "Next"]');
    }





    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    async waitForPageLoad(): Promise<void> {
        return await this.page.waitForLoadState('load');
    }

    async staticwait(waitTime: number) {
        await this.page.waitForTimeout(waitTime);
    }

    async takeScreenshot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        })
    }

    async verifyNotification(expected: { mandalorDistName: string; year: string; category: string }) {

        let found = false;

        for (let i = 0; i < 20; i++) { // assume max 20 notifications
            await this.notificationBlock.waitFor({ state: "visible", timeout: 5000 });
            // Hover to pause auto sliding
            await this.notificationBlock.hover();

            // Get current notification text
            const text = await this.notificationBlock.innerText();
            console.log(text);

            // Check if it matches expected details
            if (
                text.toLowerCase().includes(expected.mandalorDistName.toLowerCase()) &&
                text.includes(expected.year) &&
                text.includes(expected.category)
            ) {
                found = true;
                break;
            }

            // If not matched, click next arrow to move to next notification
            await this.arrowNextBtn.click(); // adjust selector to your DOM
            await this.page.waitForTimeout(500); // small wait for transition
        }

        expect(found).toBeTruthy();
    }

}