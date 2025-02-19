import { logger, sizes } from "../lib/exports";
import { exec } from "child_process";
import * as fs from "fs";

export class Backup {
    private readonly serverDirectory: string;
    private readonly backupDirectory: string;
    private readonly worldName: string;
    private readonly backupTime: number;
    private readonly backupOnStart: boolean;

    private loopThread: NodeJS.Timeout;

    constructor(serverDirectory: string, backupDirectory: string, worldName: string, backupTime: number, backupOnStart: boolean) {
        this.serverDirectory = serverDirectory;
        this.backupDirectory = backupDirectory;
        this.worldName = worldName;
        this.backupTime = backupTime;
        this.backupOnStart = backupOnStart;

        this.start();
    }

    private start(): void {
        if (this.loopThread) throw TypeError("Backup thread already exists.");
        if (this.backupOnStart) this.backup();

        this.loopThread = setInterval(() => this.backup(), this.backupTime * 1000 * 60);
    }

    private backup(): void {
        const date = new Date(Date.now());
        const time = {
            minutes: date.getUTCMinutes(),
            hours: date.getUTCHours(),
            days: date.getUTCDate(),
            month: date.getMonth() + 1,
            year: date.getUTCFullYear()
        }
        const fileName = `${this.worldName}.${time.year}-${time.month}-${time.days}.${time.hours}-${time.minutes}.zip`

        exec(`cd ${this.serverDirectory} && zip ${fileName} ./${this.worldName} -r -1 && mv ${fileName} ${this.backupDirectory}`, (error, output, erroroutput) => {
            const total = this.total();

            logger.success(`Created a new backup! (${time.year}/${time.month}/${time.days} ${time.hours}:${time.minutes} UTC) | ${this.total()} backups. | Total Size: ${this.size()}`)
        });
    }

    private total(): number {
        const files = fs.readdirSync(this.backupDirectory);

        return files.length;
    }

    private size() {
        const files = fs.readdirSync(this.backupDirectory);
        let total = 0;

        files.forEach(file => {
            const stats = fs.statSync(`${this.backupDirectory}/${file}`)

            total += stats.size
        })

        switch (true) {
            case sizes.gigabyte < total:
                return (total / sizes.gigabyte).toFixed(2) + "GB";

            case sizes.megabyte < total:
                return (total / sizes.megabyte).toFixed(2) + "MB";

            case sizes.kilobyte < total:
                return (total / sizes.kilobyte).toFixed(2) + "KB";
        }
    }
}