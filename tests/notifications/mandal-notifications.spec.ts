import { test, expect } from '../../src/fixtures/pagefixtures'
import { TestDataHelper } from '../../src/utils/testDataHelper';

test.beforeEach(async ({ loginPage, homePage, swaKpisHomePage }) => {
    await loginPage.navigateToLoginPage()
    await loginPage.doLogin(process.env.USERNAME_SKLM_Mandal!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickServicesBtn();
    await swaKpisHomePage.clickAchievementsEntryLink();
})

test('Verify Mandal Officer get the Notification after an update by the District officer', async ({ loginPage, homePage, swaKpisHomePage, achievementEntryMandDistLevel, achievementApproval }) => {
    await achievementEntryMandDistLevel.forwardMandalorDistrictAchievementData('monthly', '2023-24', 'MAR', `${Date.now()} : Test 16072026_ Automate`)
    await achievementEntryMandDistLevel.clickModalOkBtn();
    await homePage.doLogout();
    await loginPage.navigateToLoginPage();
    await loginPage.doLogin(process.env.USERNAME_SKLM_DISTRICT!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickServicesBtn();
    await swaKpisHomePage.navigateToAchivesApproveMand();

    let mandal = TestDataHelper.readForwardedDetails().mandalorDistName;
    mandal = mandal.charAt(0).toUpperCase() + mandal.slice(1).toLowerCase();
    console.log(mandal);
    console.log(TestDataHelper.readForwardedDetails().year);
    console.log(TestDataHelper.readForwardedDetails().category);
    await achievementApproval.selectYear();
    await achievementApproval.selectCategory();
    await achievementApproval.checkCheckboxForUpdateorApprove(mandal);
    await achievementApproval.clickUpdateBtn();
    expect(await achievementApproval.verifyUpdateSuccessMessage()).toBeTruthy();
    await achievementApproval.clickModalOkBtn();
    await homePage.doLogout();

    await loginPage.navigateToLoginPage();
    await loginPage.doLogin(process.env.USERNAME_SKLM_Mandal!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    const expected = TestDataHelper.readForwardedDetails();
    await achievementApproval.verifyNotification(expected);
})

test('Verify Mandal Officer get the notification after an approval by the District Officer', async ({ loginPage, homePage, swaKpisHomePage, achievementEntryMandDistLevel, achievementApproval }) => {
    await achievementEntryMandDistLevel.forwardMandalorDistrictAchievementData('monthly', '2023-24', 'JUN', `${Date.now()} : Test 09072026_ Automate`)
    await achievementEntryMandDistLevel.clickModalOkBtn();
    await homePage.doLogout();
    await loginPage.navigateToLoginPage();
    await loginPage.doLogin(process.env.USERNAME_SKLM_DISTRICT!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickServicesBtn();
    await swaKpisHomePage.navigateToAchivesApproveMand();

    let mandal = TestDataHelper.readForwardedDetails().mandalorDistName;
    mandal = mandal.charAt(0).toUpperCase() + mandal.slice(1).toLowerCase();
    console.log(mandal);
    await achievementApproval.selectYear();
    await achievementApproval.selectCategory();
    await achievementApproval.checkCheckboxForUpdateorApprove(mandal);
    await achievementApproval.clickApproveBtn();
    expect(await achievementApproval.verifyApproveSuccessMessage()).toBeTruthy();
    await achievementApproval.clickModalOkBtn();
    await homePage.doLogout();

    await loginPage.navigateToLoginPage();
    await loginPage.doLogin(process.env.USERNAME_SKLM_Mandal!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    const expected = TestDataHelper.readForwardedDetails();
    await achievementApproval.verifyNotification(expected);
})

test.afterEach('LOGOUT', async ({ homePage }) => {
    await homePage.doLogout();
})

