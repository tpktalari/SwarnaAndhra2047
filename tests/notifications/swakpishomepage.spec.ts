import { test, expect } from '../../src/fixtures/pagefixtures'

test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
    await loginPage.doLogin('cponlr', 'ASR@@!%', '12345');
})

test('Swa Kpis home page title test', async ({ swaKpisHomePage }) => {
    let pageTitle = await swaKpisHomePage.getPageTitle();
    console.log('Home page title is : ', pageTitle);
    expect(pageTitle).toBe('Swarnandhra');

})


