"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
require("colors");
const colors = {
    debug: "[".grey + "DEBUG".magenta + "]     ".grey,
    log: "[".grey + "LOG".cyan + "]       ".grey,
    warning: "[".grey + "WARNING".yellow + "]   ".grey,
    error: "[".grey + "ERROR".red + "]     ".grey,
    success: "[".grey + "SUCCESS".green + "]   ".grey
};
class Logger {
    debugging;
    constructor(debugging) {
        this.debugging = debugging;
    }
    debug(message) {
        if (!this.debugging)
            return;
        return console.log(colors.debug, message);
    }
    log(message) {
        return console.log(colors.log, message);
    }
    warning(message) {
        return console.log(colors.warning, message);
    }
    error(message) {
        return console.log(colors.error, message);
    }
    success(message) {
        return console.log(colors.success, message);
    }
}
exports.Logger = Logger;
