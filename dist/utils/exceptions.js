'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exceptions = void 0;
const winston_1 = require("winston");
class Exceptions {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.prettyPrint()),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize({
                        message: true,
                        level: true,
                        colors: {
                            info: "yellow",
                            error: "red"
                        }
                    }), winston_1.format.simple())
                })
            ]
        });
    }
    badRequest(e) {
        return this.logger.error(`${e}`) && process.exit();
    }
    noFile() {
        return this.logger.info("Email sending file not found, I created one for you. Please set it up and try again.") && process.exit();
    }
}
exports.Exceptions = Exceptions;
