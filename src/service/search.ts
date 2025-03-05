'use strict';

import axios, { Axios } from "axios";
import { IDetailsData, ISearchData } from "../interfaces/search";
import { Exceptions } from "../utils/exceptions";
import { formatDate } from "../utils/date";

export class Basi {
  private session: Axios;
  private exceptions: Exceptions;

  constructor () {
    this.session = axios.create({ 
      baseURL: "https://searchs.vmzt.wtf/",
      headers: { "Content-Type": "application/json" }
    });

   this.exceptions = new Exceptions();
  } 

  /**
   * @name GetEnterprises
   * @description "Get enterprises by terms/keywords."
  */
  public async getEnterpises({ query, extras, rangeQuery, page }: ISearchData) {
    try {
      const newRangeQueryLte = formatDate(rangeQuery?.openingDate?.lte);
      const newRangeQueryGte = formatDate(rangeQuery?.openingDate?.gte);
      const newRegistrationSituation = query["registrationSituation"] == "Active" ? "ATIVA" : query["registrationSituation"] == "Suspended" ? "SUSPENSA" : "INATIVA";

      const { data } = await this.session.post(`search`, { query: { ...query, registrationSituation: newRegistrationSituation }, extras, rangeQuery: { lte: newRangeQueryLte, gte: newRangeQueryGte }, page });
      const pages = Math.ceil(data.count / 20);

      return { list: data.list, totalEnterpises: data.count, totalPages: pages, currentPage: page };
    } catch (e: any) {
      return this.exceptions.badRequest(e.message);
    }
  } 

  /** 
   * @name getEnterpriseDetails
   * @description "Get enterprise details."
  */
  public async getEnterpriseDetails({ nameFantasy: name, cnpj }: IDetailsData) {
    try {
      const { data } = await this.session.get(`search/${name}/${cnpj}`);
      return data;
    } catch (e: any) {
      return this.exceptions.badRequest(e.message);
    }
  }
}