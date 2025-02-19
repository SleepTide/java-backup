"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = void 0;
const exports_1 = require("../lib/exports");
const child_process_1 = require("child_process");
const fs = require("fs");
class Backup {
    serverDirectory;
    backupDirectory;
    worldName;
    backupTime;
    backupOnStart;
    loopThread;
    constructor(serverDirectory, backupDirectory, worldName, backupTime, backupOnStart) {
        this.serverDirectory = serverDirectory;
        this.backupDirectory = backupDirectory;
        this.worldName = worldName;
        this.backupTime = backupTime;
        this.backupOnStart = backupOnStart;
        this.start();
    }
    start() {
        if (this.loopThread)
            throw TypeError("Backup thread already exists.");
        if (this.backupOnStart)
            this.backup();
        this.loopThread = setInterval(() => this.backup(), this.backupTime * 1000 * 60);
    }
    backup() {
        const date = new Date(Date.now());
        const time = {
            minutes: date.getUTCMinutes(),
            hours: date.getUTCHours(),
            days: date.getUTCDate(),
            month: date.getMonth() + 1,
            year: date.getUTCFullYear()
        };
        const fileName = `${this.worldName}.${time.year}-${time.month}-${time.days}.${time.hours}-${time.minutes}.zip`;
        (0, child_process_1.exec)(`cd ${this.serverDirectory} && zip ${fileName} ./${this.worldName} -r -1 && mv ${fileName} ${this.backupDirectory}`, (error, output, erroroutput) => {
            const total = this.total();
            exports_1.logger.success(`Created a new backup! (${time.year}/${time.month}/${time.days} ${time.hours}:${time.minutes} UTC) | ${this.total()} backups. | Total Size: ${this.size()}`);
        });
    }
    total() {
        const files = fs.readdirSync(this.backupDirectory);
        return files.length;
    }
    size() {
        const files = fs.readdirSync(this.backupDirectory);
        let total = 0;
        files.forEach(file => {
            const stats = fs.statSync(`${this.backupDirectory}/${file}`);
            total += stats.size;
        });
        switch (true) {
            case exports_1.sizes.gigabyte < total:
                return (total / exports_1.sizes.gigabyte).toFixed(2) + "GB";
            case exports_1.sizes.megabyte < total:
                return (total / exports_1.sizes.megabyte).toFixed(2) + "MB";
            case exports_1.sizes.kilobyte < total:
                return (total / exports_1.sizes.kilobyte).toFixed(2) + "KB";
        }
    }
}
exports.Backup = Backup;
