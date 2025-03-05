# basi

A simple package to search for company data and send emails automatically.

[![Version npm](https://img.shields.io/npm/v/basisearch.svg?style=flat-square)](https://www.npmjs.com/package/basisearch)
[![npm Downloads](https://img.shields.io/npm/dm/basisearch.svg?style=flat-square)](https://npmcharts.com/compare/basisearch?minimal=true)

[![NPM](https://nodei.co/npm/basisearch.png?downloads=true&downloadRank=true)](https://nodei.co/npm/basisearch/)

## Table of Contents
- [Installing](#installation)
- [Usage](#usage)
- [Documentation](#documentation-docs)

## Installation
```bash
npm install basisearch@latest
```
```bash
pnpm install basisearch@latest
```
```bash
yarn add basisearch@latest
```

## Usage

``` js
const { Basi } = require("basisearch");

const basi = new Basi(); 

async function main() {
    try { 
        const enterprises = await basi.getEnterprises({
          query: { term: ["cafeteria"], registrationSituation: "Active" },
          page: 1
        });

        console.log(enterprises); // { list: [], totalEnterpises: 100, totalPages: 10, currentPage: 1 }

        const enterpiseInfo = await basi.getEnterpriseDetails({ 
          nameFantasy: enterprises[0].nome_fantasia,
          cnpj: enterpises[0].cnpj
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
const { BasiMail } = require("basisearch");

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