export class BasePage {
    constructor(page) {
        this.page = page;
    }
    async waitForLoadState() {
        await this.page.waitForLoadState('load');
    }
}
