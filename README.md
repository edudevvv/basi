# basi

A simple package to search for company data and send emails automatically.

[![Version npm](https://img.shields.io/npm/v/basi-search.svg?style=flat-square)](https://www.npmjs.com/package/basi-search)
[![npm Downloads](https://img.shields.io/npm/dm/basi-search.svg?style=flat-square)](https://npmcharts.com/compare/basi-search?minimal=true)

[![NPM](https://nodei.co/npm/basi-search.png?downloads=true&downloadRank=true)](https://nodei.co/npm/basi-search/)

## Table of Contents
- [Installing](#installation)
- [Usage](#usage)
- [Send Mails](#send-mails)

## Installation
```bash
npm install basi-search@latest
```
```bash
pnpm install basi-search@latest
```
```bash
yarn add basi-search@latest
```

## Usage

``` js
const { Basi } = require("basi-search");

const basi = new Basi(); 

async function main() {
    try { 
        const enterprises = await basi.getEnterprises({
          query: { term: ["cafeteria"], registrationSituation: "Active" },
          page: 1
        });

        console.log(enterprises); // { list: [], totalEnterpises: 100, totalPages: 10, currentPage: 1 }

        const enterpiseInfo = await basi.getEnterpriseDetails({ 
          nameFantasy: enterprises.list[0].nome_fantasia,
          cnpj: enterpises.list[0].cnpj
        });

        console.log(enterpiseInfo); // { "lastUpdated": "07/02/2025 21:00", mail: "", number: [] } 
    } catch (e) {
        console.log(e);
    }
}

main();
```
---
## Send Mails
``` js
const { BasiMail } = require("basi-search");

const basi = new BasiMail({
  user: "email@gmail.com",
  pass: "Password Google APIS or Other providers."
}); 

async function main() {
    try { 
      const mail = await basi.sendMail({
        from: "'Basi App'",
        to: "email@example.com",
        subject: "Basi App - Promotions"
      }); 

      console.log(mail) // { success: true }
    } catch (e) {
        console.log(e);
    }
}

main();
```

## 
- Found any errors? Open a pull on the [repository](https://github.com/edudevvv/basi/pulls).

#### Developer: [Edu] (@pyvd) 
#### Support: [Github]

[Edu]: https://github.com/edudevvv
[Github]: https://github.com/edudevvv/basi/pulls
