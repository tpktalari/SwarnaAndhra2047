import { test, expect } from '../../src/fixtures/pagefixtures'
import { TestDataHelper } from '../../src/utils/testDataHelper';

test.beforeEach(async ({ loginPage, homePage, swaKpisHomePage }) => {
    await loginPage.navigateToLoginPage()
    await loginPage.doLogin(process.env.USERNAME_SKLM_DISTRICT!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickServicesBtn();
    await swaKpisHomePage.clickAchievementsEntryLink();
})


test('Verify HOD Officer get the notification and able view the forwarded data of District officer', async ({ loginPage, homePage, swaKpisHomePage, achievementEntryMandDistLevel, achievementApproval }) => {
    await achievementEntryMandDistLevel.forwardMandalorDistrictAchievementData('quarterly', '2026-27', 'Q2 (Jul - Sep)', `${Date.now()} : Test 09072026_ Automate`)
    await achievementEntryMandDistLevel.clickModalOkBtn();
    await homePage.doLogout();
    await loginPage.navigateToLoginPage();
    await loginPage.doLogin(process.env.USERNAME_HOD!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickServicesBtn();
    await swaKpisHomePage.navigateToAchivesApproveDist();

    const expected = TestDataHelper.readForwardedDetails();
    await achievementApproval.verifyNotification(expected);

    let district = TestDataHelper.readForwardedDetails().mandalorDistName.toUpperCase();
    console.log(district);
    await achievementApproval.selectYear();
    await achievementApproval.selectCategory();
    expect(await achievementApproval.verifyMandalorDistExistsAndCheckBoxVisible(district)).toBeTruthy();
})

test('Verify District Officer able update the Mandal Officer Data', async ({ loginPage, homePage, swaKpisHomePage, achievementEntryMandDistLevel, achievementApproval }) => {
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
    await achievementApproval.clickUpdateBtn();
    expect(await achievementApproval.verifyUpdateSuccessMessage()).toBeTruthy();
    await achievementApproval.clickModalOkBtn();
})

test('Verify District Officer able forward the Mandal Officer Data', async ({ loginPage, homePage, swaKpisHomePage, achievementEntryMandDistLevel, achievementApproval }) => {
    await achievementEntryMandDistLevel.forwardMandalorDistrictAchievementData('monthly', '2023-24', 'JUL', `${Date.now()} : Test 09072026_ Automate`)
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
    await achievementApproval.enterRemarks(`${Date.now()}:Approve from District User`)
    await achievementApproval.confirmApprove();
    expect(await achievementApproval.verifyApproveSuccessMessage()).toBeTruthy();
    await achievementApproval.clickModalOkBtn();
})

test.afterEach('LOGOUT', async ({ homePage }) => {
    await homePage.doLogout();
})



