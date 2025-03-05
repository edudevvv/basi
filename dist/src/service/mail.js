'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasiMail = void 0;
const nodemailer_1 = require("nodemailer");
const exceptions_1 = require("../utils/exceptions");
const path_1 = require("path");
const fs_1 = require("fs");
class BasiMail {
    constructor(data) {
        this.service = (0, nodemailer_1.createTransport)({
            service: data.user.split("@")[1],
            auth: { user: data.user, pass: data.pass },
            secure: true
        });
        this.exceptions = new exceptions_1.Exceptions();
    }
    verifyFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const pathFile = (0, path_1.join)(__dirname, "..", "..", "index.html");
            if (!(0, fs_1.existsSync)(pathFile)) {
                (0, fs_1.writeFileSync)(pathFile, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style></style>
  </head>
  <body></body>
</html>`, "utf-8");
                return this.exceptions.noFile();
            }
            else
                return pathFile;
        });
    }
    sendMail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ from, to, subject }) {
            try {
                const file = yield this.verifyFile();
                const info = yield this.service.sendMail({
                    from,
                    to,
                    subject,
                    html: (0, fs_1.readFileSync)(file, "utf-8")
                });
                return { success: true };
            }
            catch (e) {
                return this.exceptions.badRequest(e);
            }
        });
    }
}
exports.BasiMail = BasiMail;
