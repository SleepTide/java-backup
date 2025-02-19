"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizes = exports.backup = exports.logger = exports.config = void 0;
const backup_1 = require("../systems/backup");
const logger_1 = require("../utils/logger");
const config_1 = require("./config");
exports.config = config_1.default;
exports.logger = new logger_1.Logger(config_1.default.debugging);
exports.backup = new backup_1.Backup(config_1.default.serverDirectory, config_1.default.backupDirectory, config_1.default.worldName, config_1.default.backupTime, config_1.default.backupOnStart);
exports.sizes = {
    kilobyte: 1024,
    megabyte: 1048576,
    gigabyte: 1073741824
};
