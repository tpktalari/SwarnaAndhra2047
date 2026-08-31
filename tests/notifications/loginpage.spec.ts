import type { TestInfo } from '@playwright/test';
import { test, expect } from '../../src/fixtures/pagefixtures';
import { CsvHelper } from '../../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
})

test('login page title test @smoke', async ({ loginPage }) => {
    let pageTitle = await loginPage.getPageTitle();
    console.log('Login page title is : ', pageTitle);
    expect(pageTitle).toBe('Swarnandhra');

})

test.only('user is able to login to the app test and logout', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.USERNAME_ADMIN!, process.env.PASSWORD!, process.env.CAPTCHA!);
    expect(await homePage.isChangePwdLinkExists()).toBeTruthy();
    expect(await homePage.isLogoutBtnExists()).toBeTruthy();
    await homePage.doLogout();
})



let testData = CsvHelper.readCsv('src/testdata/loginData.csv')

for (let row of testData) {
    test(`Invalid Login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password, "12345");
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
}