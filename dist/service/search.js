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
exports.Basi = void 0;
const axios_1 = require("axios");
const exceptions_1 = require("../utils/exceptions");
const date_1 = require("../utils/date");
class Basi {
    constructor() {
        this.session = axios_1.default.create({
            baseURL: "https://searchs.vmzt.wtf/",
            headers: { "Content-Type": "application/json" }
        });
        this.exceptions = new exceptions_1.Exceptions();
    }
    /**
     * @name GetEnterprise
     * @description "Get enterprises by terms/keywords."
    */
    getEnterpise(_a) {
        return __awaiter(this, arguments, void 0, function* ({ query, extras, rangeQuery, page }) {
            var _b, _c;
            try {
                const newRangeQueryLte = (0, date_1.formatDate)((_b = rangeQuery === null || rangeQuery === void 0 ? void 0 : rangeQuery.openingDate) === null || _b === void 0 ? void 0 : _b.lte);
                const newRangeQueryGte = (0, date_1.formatDate)((_c = rangeQuery === null || rangeQuery === void 0 ? void 0 : rangeQuery.openingDate) === null || _c === void 0 ? void 0 : _c.gte);
                const newRegistrationSituation = query["registrationSituation"] == "Active" ? "ATIVA" : query["registrationSituation"] == "Suspended" ? "SUSPENSA" : "INATIVA";
                const { data } = yield this.session.post(`search`, { query: Object.assign(Object.assign({}, query), { registrationSituation: newRegistrationSituation }), extras, rangeQuery: { lte: newRangeQueryLte, gte: newRangeQueryGte }, page });
                const pages = Math.ceil(data.count / 20);
                return { list: data.list, totalEnterpises: data.count, totalPages: pages, currentPage: page };
            }
            catch (e) {
                return this.exceptions.badRequest(e.message);
            }
        });
    }
    /**
     * @name getEnterpriseDetails
     * @description "Get enterprise details."
    */
    getEnterpriseDetails(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nameFantasy: name, cnpj }) {
            try {
                const { data } = yield this.session.get(`/search/${name}/${cnpj}`);
                return data;
            }
            catch (e) {
                return this.exceptions.badRequest(e.message);
            }
        });
    }
}
exports.Basi = Basi;
