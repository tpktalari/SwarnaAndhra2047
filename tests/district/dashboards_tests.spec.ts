
import { test, expect } from '../../src/fixtures/pagefixtures'

//test.describe.configure({ mode: 'serial' })
test.beforeEach(async ({ loginPage, homePage, swaKpisHomePage, page }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
    await loginPage.doLogin(process.env.USERNAME_CPO_VZM!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickDashboardBtn();

})

test.only('Verify key performance dashboard mandal stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(420000)
    await swaKpisHomePage.clickPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickMandalStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Mandal Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [mandal, mainScore] of expected) {
        const averageScore = actual.get(mandal);
        expect.soft(averageScore, `Average score should be defined for Mandal: ${mandal}`).toBeDefined();
        expect.soft(mainScore, `Score for Mandal "${mandal}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }

    // for (const [mandal, mainScore] of expected) {
    //     const averageScore = actual.get(mandal);

    //     expect.soft(
    //         averageScore, `Average score should be defined for Mandal: ${mandal}`).toBeDefined();

    //     if (averageScore === undefined) {
    //         continue;
    //     }

    //     if (mainScore === averageScore) {
    //         console.log(`✅ Score matched for Mandal "${mandal}": Expected ${mainScore}, Got ${averageScore}`);
    //     }
    //     else {
    //         expect.soft(mainScore, `Score mismatch for Mandal "${mandal}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    //     }
    // }

})

test('Verify SDG performance dashboard mandal stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await swaKpisHomePage.clickSDGPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickMandalStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Mandal Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [mandal, mainScore] of expected) {
        const averageScore = actual.get(mandal);
        expect.soft(averageScore, `Average score should be defined for Mandal: ${mandal}`).toBeDefined();
        expect.soft(mainScore, `Score for Mandal "${mandal}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify Economic performance dashboard mandal stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await swaKpisHomePage.clickEconomicPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickMandalStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Mandal Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [mandal, mainScore] of expected) {
        const averageScore = actual.get(mandal);
        expect.soft(averageScore, `Average score should be defined for Mandal: ${mandal}`).toBeDefined();
        expect.soft(mainScore, `Score for Mandal "${mandal}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify key performance dashboard district stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(420000)
    await swaKpisHomePage.clickPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickDistrictStatsLink()
    let expected = await performanceDashboardPage.getScoreValuesMap('District Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [constituency, mainScore] of expected) {
        const averageScore = actual.get(constituency);
        expect.soft(averageScore).toBeDefined();
        expect.soft(mainScore).toBe(averageScore);
    }
})

test('Verify SDG performance dashboard district stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await swaKpisHomePage.clickSDGPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickDistrictStatsLink()
    let expected = await performanceDashboardPage.getScoreValuesMap('District Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [district, mainScore] of expected) {
        const averageScore = actual.get(district);
        expect.soft(averageScore, `Average score should be defined for District: ${district}`).toBeDefined();
        expect.soft(mainScore, `Score for District "${district}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify Economic performance dashboard district stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await swaKpisHomePage.clickEconomicPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickDistrictStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('District Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [district, mainScore] of expected) {
        const averageScore = actual.get(district);
        expect.soft(averageScore, `Average score should be defined for District: ${district}`).toBeDefined();
        expect.soft(mainScore, `Score for District "${district}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test.afterEach('LOGOUT', async ({ homePage }) => {
    await homePage.doLogout();
})