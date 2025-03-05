export interface ISearchData {
  query: {
    term: string[] | string;
    mainActivity?: string[] | string;
    legalNature?: string[] | string;
    uf?: ('AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO')[];
    municipality?: string[] | string;
    neighborhood?: string[] | string;
    registrationSituation: "Active" | "Low" | "Unfit" | "Suspended";
    postalCode?: string[] | string;
    ddd?: string[] | string;
  },
  rangeQuery?: {
    openingDate?: { lte?: { day: string, month: string, year: string }, gte?: { day: string, month: string, year: string } },
    shareCapital?: { lte?: number, gte?: number }
  };
  extras?: {
    onlyHeadquarters?: boolean;
    onlyBranch?: boolean;
    withEmail?: boolean;
    withTelephoneContact?: boolean;
    onlyLandline?: boolean;
    onlyCellNumber?: boolean;
    onlyMei?: boolean;
    deleteMei?: boolean;
    includeSecondaryActivity?: boolean;
  };
  page: number
}

export interface IDetailsData {
  nameFantasy: string;
  cnpj: string;
}