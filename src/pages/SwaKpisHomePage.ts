import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";


export class SwaKpisHomePage extends BasePage {
    private readonly servicesBtn: Locator;
    private readonly dashboardBtn: Locator;
    private readonly performanceDashboardLink: Locator;
    private readonly sdgPerformanceDashboardLink: Locator;
    private readonly economicPerDashboardLink: Locator;
    private readonly achievmentEntryLink: Locator;
    private readonly mandalActivityBtn: Locator;
    private readonly districtActivityBtn: Locator;
    private readonly achievementsLink: Locator;
    private readonly changePwd: Locator;
    private readonly logoutBtn: Locator;
    private readonly modalFooterYesBtn: Locator;
    private readonly modalFooterNoBtn: Locator;
    private readonly modalOkBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.servicesBtn = page.getByRole('button', { name: 'Services' });
        this.dashboardBtn = page.getByRole('button', { name: 'Dashboard' })
        this.performanceDashboardLink = page.getByRole('link', { name: 'KPIs Performance Dashboard', exact: true });
        this.sdgPerformanceDashboardLink = page.getByRole('link', { name: 'KPIs Performance Dashboard (SDG)', exact: true });
        this.economicPerDashboardLink = page.getByRole('link', { name: 'KPIs Performance Dashboard (Economic)', exact: true });
        this.achievmentEntryLink = page.getByRole('link', { name: 'Achievements Entry' });
        this.achievementsLink = page.getByRole('link', { name: 'Achievements', exact: true });
        this.changePwd = page.getByRole('link', { name: 'Change Password' });
        this.logoutBtn = page.locator('button').filter({ hasText: 'Logout' });
        this.modalFooterYesBtn = page.getByRole('button', { name: 'Yes' });
        this.modalFooterNoBtn = page.getByRole('button', { name: 'No' });
        this.modalOkBtn = page.getByRole('button', { name: 'OK' });
        this.mandalActivityBtn = page.getByRole('button', { name: 'Mandal Activity' });
        this.districtActivityBtn = page.getByRole('button', { name: 'District Activity' });

    }

    async clickServicesBtn(): Promise<void> {
        await this.servicesBtn.click();
    }

    async clickDashboardBtn(): Promise<void> {
        await this.dashboardBtn.click();
    }

    async clickPerformanceDashboardLink(): Promise<void> {
        await this.performanceDashboardLink.click();
    }

    async clickSDGPerformanceDashboardLink(): Promise<void> {
        await this.sdgPerformanceDashboardLink.click();
    }

    async clickEconomicPerformanceDashboardLink(): Promise<void> {
        await this.economicPerDashboardLink.click();
    }

    async clickAchievementsEntryLink(): Promise<void> {
        await this.achievmentEntryLink.click();
    }

    async navigateToAchivesApproveMand(): Promise<void> {
        await this.mandalActivityBtn.hover();
        await this.achievementsLink.waitFor({ state: 'visible' });
        await this.achievementsLink.click();
    }

    async navigateToAchivesApproveDist(): Promise<void> {
        await this.districtActivityBtn.hover();
        await this.achievementsLink.waitFor({ state: 'visible' });
        await this.achievementsLink.click();
    }


    async isServicesBtnExists(): Promise<boolean> {
        await this.servicesBtn.waitFor({ state: 'visible', timeout: 2000 });
        return await this.servicesBtn.isVisible();
    }

    async isChangePwdLinkExists(): Promise<boolean> {
        await this.changePwd.waitFor({ state: 'visible', timeout: 5000 });
        return await this.changePwd.isVisible();
    }




    async doLogout(): Promise<void> {
        await this.logoutBtn.click();
        await this.modalFooterYesBtn.click();
        await this.modalOkBtn.click();
    }




}