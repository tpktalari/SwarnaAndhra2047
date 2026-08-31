import { test, expect } from '../../src/fixtures/pagefixtures'

test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
    await loginPage.doLogin('cponlr', 'ASR@@!%', '12345');
})

test('home page title test @smoke', async ({ homePage }) => {
    let pageTitle = await homePage.getPageTitle();
    console.log('Home page title is : ', pageTitle);
    expect(pageTitle).toBe('Swarnandhra');

})

test('Logout link & Change Password Link exists test @smoke', async ({ homePage }) => {
    expect.soft(await homePage.isChangePwdLinkExists()).toBeTruthy();
    expect.soft(await homePage.isLogoutBtnExists()).toBeTruthy();
})

test('user is able to navigate to the Swa Kpis service test @smoke', async ({ homePage }) => {
    await homePage.ClickSwaKpisBtn();
})