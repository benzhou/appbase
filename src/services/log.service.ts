import {LogLevel} from "log4ts/build/LogLevel";

export class AppConf {
    public static get LOG_LEVEL(): LogLevel { return LogLevel.ALL; }
}
import {Injectable} from '@angular/core';

import Logger from "log4ts/build/Logger"
import LoggerConfig from "log4ts/build/LoggerConfig"
import BasicLayout from "log4ts/build/layouts/BasicLayout";
import ConsoleAppender from "log4ts/build/appenders/ConsoleAppender";
import {IAppender} from "log4ts/build/IAppender";
import {ILayout} from "log4ts/build/ILayout";
//import {LogLevel} from "log4ts/build/LogLevel";
//import {AppConf} from "../../config/app.conf";

@Injectable()
export class LogService{

    public log: Logger;

    private appender: IAppender;
    private layout: ILayout;
    private config: LoggerConfig;

    constructor() {
        this.init();
    }

    init(){
        this.layout = new BasicLayout();
        this.appender = new ConsoleAppender();
        this.appender.setLayout(this.layout);
        this.config = new LoggerConfig(this.appender);
        this.config.setLevel(AppConf.LOG_LEVEL);
        this.log = new Logger();
        Logger.setConfig(this.config);
    }
}