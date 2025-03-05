'use strict';

import { Transporter, createTransport } from "nodemailer";
import { IDataMail, ISendMail } from "../interfaces/mail";
import { Exceptions } from "../utils/exceptions";
import { join } from "path";
import { existsSync, readFileSync, writeFile, writeFileSync } from "fs";

export class BasiMail {
  private service: Transporter;
  private exceptions: Exceptions;
  
  constructor (data: IDataMail) {
    this.service = createTransport({
      service: data.user.split("@")[1],
      auth: { user: data.user, pass: data.pass },
      secure: true
    });

    this.exceptions = new Exceptions();
  }

  private async verifyFile() {
    const pathFile = join(__dirname, "..", "..", "index.html");

    if (!existsSync(pathFile)) {
      writeFileSync(pathFile, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style></style>
  </head>
  <body></body>
</html>`, "utf-8");

      return this.exceptions.noFile();
    } else return pathFile;
  }

  async sendMail({ from, to, subject }: ISendMail) {
    try { 
      const file = await this.verifyFile();

      const info = await this.service.sendMail({
        from,
        to,
        subject,
        html: readFileSync(file, "utf-8")
      });

      return { success: true };
    } catch (e: unknown) {
      return this.exceptions.badRequest(e);
    }
  }
}