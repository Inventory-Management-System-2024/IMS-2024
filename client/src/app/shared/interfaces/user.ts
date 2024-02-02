interface Address {
    address_line_1: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  }
  
  export default interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    address: Address;
    phoneNo: string;
    error:string;
  }
  




