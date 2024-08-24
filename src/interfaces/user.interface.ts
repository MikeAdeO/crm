export type UserInterfaceRequest = {
    password:string,
    firstName: string,
    lastName: string,
    email:string,
    title:string,
    address:any
}

export type UserInterfaceResponse = {
    id: number,
    firstName?: string,
    lastName?: string,
    email:string,
    title?:string,
    phone?:string
}

export type UserAddressInterface = {
    userId: number,
    countryId: number,
    cityId:number,
    address:string
}

export interface CompanyData {
  id?: number;
    name: string;
    reference: string;
    email?: string;
    details?: {
      website?: string;
      industry?: string;
      foundingYear?: string;
      revenue?: number;
      grossProfit?: number;
      previousYearGrossProfit?: number;
      ebitda?: number;
      ebitdaPreviousYear?: number;
    };
    teams?: {
      fullName: string;
      roleId: number;
    }[];
  }
  
export interface RegisterationRequestData {
    user: {
        firstName :string;
        lastName: string;
        phone:string;
        email:string;
        title: string;
        password:string


        address: {
          countryId: number;
          cityId    :number;
          address :  String;
      }
    },

    company: {
      name: string;
      reference: string;
      email?: string;
      details?: {
        website?: string;
        industry?: string;
        foundingYear?: string;
        revenue?: number;
        grossProfit?: number;
        previousYearGrossProfit?: number;
        ebitda?: number;
        ebitdaPreviousYear?: number;
      };
      teams?: {
        fullName: string;
        roleId: number;
      }[];
    }


    
  }
  
