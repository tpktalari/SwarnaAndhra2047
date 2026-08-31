import type { TestInfo } from '@playwright/test'
import { test, expect } from '../../src/fixtures/pagefixtures'
import { TestDataHelper } from '../../src/utils/testDataHelper';


test('Verify HOD Officer able forward the Mandal Officer Data', async ({ loginPage, homePage, swaKpisHomePage, achievementEntryMandDistLevel, achievementApproval }) => {
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




