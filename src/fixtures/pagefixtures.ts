import { test as baseTest } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';
import { SwaKpisHomePage } from '../pages/SwaKpisHomePage';
import { AchievementsEntryMandDistLevel } from '../pages/AchievementsEntryMandDistLevel';
import { AchievementsApproval } from '../pages/AchievementsApproval';
import { PerformanceDashboardPage } from '../pages/PerformanceDashboardPage';


type pageFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    swaKpisHomePage: SwaKpisHomePage;
    achievementEntryMandDistLevel: AchievementsEntryMandDistLevel;
    achievementApproval: AchievementsApproval;
    performanceDashboardPage: PerformanceDashboardPage;

};

export let test = baseTest.extend<pageFixtures>({

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    swaKpisHomePage: async ({ page }, use) => {
        let swaKpisHomePage = new SwaKpisHomePage(page);
        await use(swaKpisHomePage);
    },

    achievementEntryMandDistLevel: async ({ page }, use) => {
        let achievementEntryMandDistLevel = new AchievementsEntryMandDistLevel(page);
        await use(achievementEntryMandDistLevel);
    },

    achievementApproval: async ({ page }, use) => {
        let achievementApproval = new AchievementsApproval(page);
        await use(achievementApproval);
    },

    performanceDashboardPage: async ({ page }, use) => {
        let performanceDashboardPage = new PerformanceDashboardPage(page);
        await use(performanceDashboardPage);
    }

});

export { expect } from "@playwright/test";