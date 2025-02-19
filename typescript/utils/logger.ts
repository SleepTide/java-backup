import "colors";

const colors = {
    debug: "[".grey + "DEBUG".magenta + "]     ".grey,
    log: "[".grey + "LOG".cyan + "]       ".grey,
    warning: "[".grey + "WARNING".yellow + "]   ".grey,
    error: "[".grey + "ERROR".red + "]     ".grey,
    success: "[".grey + "SUCCESS".green + "]   ".grey
}

export class Logger {
    private readonly debugging: boolean;

    constructor(debugging?: boolean) {
        this.debugging = debugging;
    }

    public debug(message: string): void {
        if (!this.debugging) return;

        return console.log(colors.debug, message);
    }

    public log(message: string): void {
        return console.log(colors.log, message);
    }

    public warning(message: string): void {
        return console.log(colors.warning, message);
    }

    public error(message: string): void {
        return console.log(colors.error, message);
    }

    public success(message: string): void {
        return console.log(colors.success, message);
    }
}