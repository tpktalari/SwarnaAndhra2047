import { test, expect } from '../../src/fixtures/pagefixtures'

test.beforeEach(async ({ loginPage, homePage, swaKpisHomePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
    await loginPage.doLogin(process.env.USERNAME_SKLM_DISTRICT!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickServicesBtn();
    await swaKpisHomePage.clickAchievementsEntryLink();
})

test('Verify District Officer enters achieved values and save data', async ({ achievementEntryMandDistLevel }) => {
    await achievementEntryMandDistLevel.selectPeriodicity('quarterly');
    await achievementEntryMandDistLevel.selectYear('2026-27');
    await achievementEntryMandDistLevel.selectCategory('Q1 (Apr - Jun)');  //Q1 (Apr - Jun)
    await achievementEntryMandDistLevel.fillAchievedValues('100');

    await achievementEntryMandDistLevel.saveData();
    expect(await achievementEntryMandDistLevel.getSaveSuccessMessage()).toBe('Data Saved Successfully');
    await achievementEntryMandDistLevel.clickModalOkBtn();
    expect(await achievementEntryMandDistLevel.getPendingStatusDataDis()).toBe('Current Status: Pending at District Office');
})


test('Verify Mandal Officer enters achieved values and forward data', async ({ achievementEntryMandDistLevel }) => {

    await achievementEntryMandDistLevel.forwardMandalorDistrictAchievementData('monthly', '2026-27', 'Q1 (Apr - Jun)', `${Date.now()}: Test 09072026_ Automate`)
    expect(await achievementEntryMandDistLevel.verifyForwardSuccessMessage()).toBeTruthy();
    await achievementEntryMandDistLevel.clickModalOkBtn();

})

test.afterEach('LOGOUT', async ({ homePage }) => {
    await homePage.doLogout();
})