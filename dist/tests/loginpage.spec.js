import { test, expect } from '../src/fixtures/pagefixtures';
test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
});
test('login page title test', async ({ loginPage }) => {
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title is : ', pageTitle);
    expect(pageTitle).toBe('Swarnandhra');
});
test('user is able to login to the app test and logout', async ({ loginPage, homePage }) => {
    await loginPage.doLogin('cponlr', 'ASR@@!%', '12345');
    await homePage.waitForLoadState();
    expect(await homePage.isChangePwdLinkExists()).toBeTruthy();
    expect(await homePage.isLogoutBtnExists()).toBeTruthy();
    await homePage.doLogout();
});
