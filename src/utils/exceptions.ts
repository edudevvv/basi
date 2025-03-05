'use strict';

import { createLogger, format, Logger, transports } from "winston";

export class Exceptions {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            format: format.combine(
                format.simple(),
                format.prettyPrint(),
            ),
            transports: [
                new transports.Console({ 
                    format: format.combine(
                        format.colorize({
                            message: true,
                            level: true,
                            colors: {
                                info: "yellow",
                                error: "red"
                            }
                        }),
                        format.simple()
                    ) 
                })
            ]
        })
    }
    
    badRequest(e: unknown) {
        return this.logger.error(`${e}`) && process.exit();
    }
    
    noFile() {
        return this.logger.info("Email sending file not found, I created one for you. Please set it up and try again.") && process.exit();
    }
}