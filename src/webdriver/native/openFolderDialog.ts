import { NativeDialog } from "./nativeDialog";
import * as pathj from 'path';
import * as fs from 'fs-extra';
const robot = require('node-key-sender');

/**
 * General open folder native dialog
 */
export interface OpenFolderDialog extends NativeDialog {
    /**
     * Enters the given folder path into the dialog selection
     * @param path path to the folder to select
     */
    selectFolder(path: string): void | Promise<void>;
}

/**
 * Linux implementation of the folder dialog
 */
export class LinuxFolderDialog implements OpenFolderDialog {
    async selectFolder(path: string): Promise<void> {
        const absolutePath = pathj.resolve(path);
        if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isDirectory()) {
            throw new Error('The selected path is not an existing directory');
        }
        await robot.sendKey('down');
        await robot.sendCombination(['control', 'l']);
        await robot.sendText(absolutePath);
    }

    async confirm(): Promise<void> {
        await robot.sendKey('enter');
        await new Promise((res) => { setTimeout(res, 4000); });
    }

    async cancel(): Promise<void> {
        await robot.sendKey('escape');
    }
}

/**
 * Windows implementation of the folder dialog
 */
export class WindowsFolderDialog implements OpenFolderDialog {
    async selectFolder(path: string): Promise<void> {
        const absolutePath = pathj.resolve(path);
        if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isDirectory()) {
            throw new Error('The selected path is not an existing directory');
        }
        await robot.sendCombination(['control', 'l']);
        await robot.sendText(absolutePath);
        await robot.sendKey('enter');
        await robot.sendKey('space');
        await robot.sendKey('enter');
    }

    async confirm(): Promise<void> {
        await robot.sendKey('enter');
        await new Promise((res) => { setTimeout(res, 4000); });
    }

    async cancel(): Promise<void> {
        await robot.sendKey('escape');
    }
}