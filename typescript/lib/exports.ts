import { Backup } from "../systems/backup";
import { Logger } from "../utils/logger";
import config from "./config";

export {
    config
};
export const logger = new Logger(config.debugging);
export const backup = new Backup(config.serverDirectory, config.backupDirectory, config.worldName, config.backupTime, config.backupOnStart);
export const sizes = {
    kilobyte: 1024,
    megabyte: 1048576,
    gigabyte: 1073741824
}