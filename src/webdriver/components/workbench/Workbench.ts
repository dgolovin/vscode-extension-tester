import { AbstractElement } from "../AbstractElement";
import { By, WebElement } from "selenium-webdriver";
import { TitleBar } from "../menu/TitleBar";
import { SideBarView } from "../sidebar/SideBarView";
import { ActivityBar } from "../activityBar/ActivityBar";
import { StatusBar } from "../statusBar/StatusBar";
import { EditorView } from "../editor/EditorView";
import { BottomBarPanel } from "../bottomBar/BottomBarPanel";
import { Notification, StandaloneNotification } from "./Notification";
import { NotificationsCenter } from "./NotificationsCenter";

/**
 * Handler for general workbench related actions
 */
export class Workbench extends AbstractElement {
    constructor() {
        super(By.className('monaco-workbench'));
    }

    /**
     * Get a title bar handle
     */
    getTitleBar(): TitleBar {
        return new TitleBar();
    }

    /**
     * Get a side bar handle
     */
    getSideBar(): SideBarView {
        return new SideBarView();
    }

    /**
     * Get an activity bar handle
     */
    getActivityBar(): ActivityBar {
        return new ActivityBar();
    }

    /**
     * Get a status bar handle
     */
    getStatusBar(): StatusBar {
        return new StatusBar();
    }

    /**
     * Get a bottom bar handle
     */
    getBottomBar(): BottomBarPanel {
        return new BottomBarPanel();
    }

    /**
     * Get a handle for the editor view
     */
    getEditorView(): EditorView {
        return new EditorView();
    }

    /**
     * Get all standalone notifications (notifications outside the notifications center)
     * @returns promise - array of Notification objects
     */
    async getNotifications(): Promise<Notification[]> {
        const notifications: Notification[] = [];
        let container: WebElement;
        try {
            container = await this.findElement(By.className('notification-toast-container'));
        } catch (err) {
            return [];
        }
        const elements = await container.findElements(By.className('monaco-list-row'));
        
        for (const element of elements) {
            notifications.push(new StandaloneNotification(await element.getAttribute('id')));
        }
        return notifications;
    }

    /**
     * Opens the notifications center
     * @returns NotificationsCenter promise
     */
    openNotificationsCenter(): Promise<NotificationsCenter> {
        return new StatusBar().openNotificationsCenter();
    }
}