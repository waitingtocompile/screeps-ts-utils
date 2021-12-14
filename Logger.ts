export class FormattedLogger
{
    static ERROR_EMAIL_TIME = 50;
    static COLOR_WARN = "orange";
    static COLOR_ERROR = "red";
    DebugLevel:number = -1;
    /*
     * The DebugLevel determines which debug messages actually get printed. A higher number indicates a more "granular" level of logging.
     * For instance, if the DebugLevel is 2, then any debug message with a level of more than 2 won't be printed.
     * This way you can fine tune the level of logging information you output to keep the 
     */
    
    WriteWithColor(message:string, color:string)
    {
        console.log(`<span color=\"${color}\">${message}</span>`);
    }
    
    Debug(message:string, level:number, color?:string)
    {
        if(level > this.DebugLevel) return;
        const out = `[DEBUG|${Game.time}]${message}`;
        if(color) this.WriteWithColor(out, color);
        else console.log(out);

    }

    Info(message:string, color?:string)
    {
        const out = `[INFO|${Game.time}]${message}`;
        if(color) this.WriteWithColor(out, color);
        else console.log(out);
    }

    Warn(message:string, color:string = FormattedLogger.COLOR_WARN)
    {
        this.WriteWithColor(`[WARN|${Game.time}]${message}`, color);
    }

    Error(message:string, noMessage:boolean = false, color:string = FormattedLogger.COLOR_ERROR)
    {
        this.WriteWithColor(`[ERROR|${Game.time}]${message}`, color);
        if(FormattedLogger.ERROR_EMAIL_TIME >= 0 && !noMessage)
        {
            Game.notify(`Error logged at ${Game.time}: ${message}`);
        }
    }
}

//this is a single instance of the formatted logger to be used as a singleton, if desired
export const Logger = new FormattedLogger();
