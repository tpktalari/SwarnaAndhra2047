
import { test, expect } from '../../src/fixtures/pagefixtures'
import * as allure from "allure-js-commons";

test.beforeEach(async ({ loginPage, homePage, swaKpisHomePage, page }) => {
    await loginPage.goToLoginPage();
    await loginPage.closeThanksPopup();
    await loginPage.clickLoginArrow();
    await loginPage.doLogin(process.env.USERNAME_ADMIN!, process.env.PASSWORD!, process.env.CAPTCHA!);
    await homePage.ClickSwaKpisBtn();
    await swaKpisHomePage.clickDashboardBtn();

})

test('Verify key performance dashboard constituency stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(840000)

    await allure.displayName("Performance Dashboard - Constituency Score Validation");
    await allure.description("Validates that Constituency main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickConstituencyStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Constituency Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [constituency, mainScore] of expected) {
        const averageScore = actual.get(constituency);
        expect.soft(averageScore, `Average score should be defined for Constituency: ${constituency}`).toBeDefined();
        expect.soft(mainScore, `Score for Constituency "${constituency}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify SDG performance dashboard constituency stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(840000)
    await allure.displayName("SDG Performance Dashboard - Constituency Score Validation");
    await allure.description("Validates that Constituency main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("SDG Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickSDGPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickConstituencyStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Constituency Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [constituency, mainScore] of expected) {
        const averageScore = actual.get(constituency);
        expect.soft(averageScore, `Average score should be defined for Constituency: ${constituency}`).toBeDefined();
        expect.soft(mainScore, `Score for Constituency "${constituency}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify Economic performance dashboard constituency stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(840000)
    await allure.displayName("Economic Performance Dashboard - Constituency Score Validation");
    await allure.description("Validates that Constituency main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Economic Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickEconomicPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickConstituencyStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Constituency Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [constituency, mainScore] of expected) {
        const averageScore = actual.get(constituency);
        expect.soft(averageScore, `Average score should be defined for Constituency: ${constituency}`).toBeDefined();
        expect.soft(mainScore, `Score for Constituency "${constituency}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify key performance dashboard mandal stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(3360000)
    await allure.displayName("Performance Dashboard - Mandal Score Validation");
    await allure.description("Validates that Mandal main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Performance Dashboard");
    await allure.tags("Regression");

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
})

test('Verify SDG performance dashboard mandal stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(3360000)
    await allure.displayName("SDG Performance Dashboard - Mandal Score Validation");
    await allure.description("Validates that Mandal main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("SDG Performance Dashboard");
    await allure.tags("Regression");

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

test('Verify Ecomic performance dashboard mandal stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(3360000)
    await allure.displayName("Economic Performance Dashboard - Mandal Score Validation");
    await allure.description("Validates that Mandal main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Economic Performance Dashboard");
    await allure.tags("Regression");

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

    await allure.displayName("Performance Dashboard - District Score Validation");
    await allure.description("Validates that District main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickPerformanceDashboardLink();
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

test('Verify SDG performance dashboard district stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await allure.displayName("SDG Performance Dashboard - District Score Validation");
    await allure.description("Validates that District main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("SDG Performance Dashboard");
    await allure.tags("Regression");

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
    await allure.displayName("Economic Performance Dashboard - District Score Validation");
    await allure.description("Validates that District main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Economic Performance Dashboard");
    await allure.tags("Regression");

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


test('Verify key performance dashboard department stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(420000)
    await allure.displayName("Performance Dashboard - Department Score Validation");
    await allure.description("Validates that Department main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickDeptStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Department Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [department, mainScore] of expected) {
        const averageScore = actual.get(department);
        expect.soft(averageScore, `Average score should be defined for Department: ${department}`).toBeDefined();
        expect.soft(mainScore, `Score for Department "${department}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify SDG performance dashboard department stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await allure.displayName("SDG Performance Dashboard - Department Score Validation");
    await allure.description("Validates that Department main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("SDG Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickSDGPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickDeptStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Department Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [department, mainScore] of expected) {
        const averageScore = actual.get(department);
        expect.soft(averageScore, `Average score should be defined for Department: ${department}`).toBeDefined();
        expect.soft(mainScore, `Score for Department "${department}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test('Verify Economic performance dashboard department stats scores with main scores', async ({ swaKpisHomePage, performanceDashboardPage }) => {
    test.setTimeout(300000)
    await allure.displayName("Economic Performance Dashboard - Department Score Validation");
    await allure.description("Validates that Department main scores match indicator averages");
    await allure.owner("Pavan Kumar Talari");
    await allure.severity("critical");
    await allure.feature("Economic Performance Dashboard");
    await allure.tags("Regression");

    await swaKpisHomePage.clickEconomicPerformanceDashboardLink();
    await performanceDashboardPage.staticwait(4000);

    await performanceDashboardPage.clickDeptStatsLink();
    let expected = await performanceDashboardPage.getScoreValuesMap('Department Name');
    let actual = await performanceDashboardPage.ClickNoofIndicatorsLinksAndStoreAvgscores();

    for (const [department, mainScore] of expected) {
        const averageScore = actual.get(department);
        expect.soft(averageScore, `Average score should be defined for Department: ${department}`).toBeDefined();
        expect.soft(mainScore, `Score for Department "${department}": Expected ${mainScore}, Got ${averageScore}`).toBe(averageScore);
    }
})

test.afterEach('LOGOUT', async ({ homePage }) => {
    await homePage.doLogout();
})
